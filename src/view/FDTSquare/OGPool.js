import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {useConnect} from "../../api/contracts";
import BigNumber from "bignumber.js"
import moment from "moment";
import {
    Card,
    Button,
    Modal,
    message,
    AutoComplete,
    Form,
    List,
    Input,
    notification,
    InputNumber,
    Switch,
    Pagination
} from 'antd';
import {getContractByName, getContractByContract} from "../../api/connectContract";
import {dealMethod, dealPayMethod, viewMethod} from "../../utils/contractUtil"
import ethIcon from "../../imgs/eth_icon.webp";
import downIcon from "../../imgs/down_icon.webp";
import listIcon from "../../imgs/list-icon.webp";
import develop from "../../env";
import {useNavigate} from "react-router-dom";
import {getIpfs} from "../../utils/ipfsApi";
import judgeStatus from "../../utils/judgeStatus";
import {getDonateRecord} from "../../graph/donate";

const OGPool = (props) => {
    const OGPool = styled.div`
      .panel-container {
        padding: 2em;
        width: 90%;
        margin: 10px auto;
        .model-dialog{
          h3{
            color: #796B6B;
          }
          .value{
            margin-top: 10px;
          }
        }
        .isInW {
          display: flex;
          width: 100%;
          justify-content: space-between;
          font-size: 18px;
          padding-bottom: 10px;
        }

        .info {
          font-size: 20px;
          font-family: Roboto-Medium, Roboto;
          font-weight: 500;
          color: #AC8989;
          line-height: 34px;
        }
      }

      .part1 {
        .donate-info {
          margin-top: 2em;

          .flex-box {
            justify-content: space-between;

            .info-item {

              .value {
                line-height: 50px !important;
                font-size: 24px !important;
              }
            }
          }

          .info-item {

            .name {
              font-size: 20px;
              font-family: Roboto-Bold, Roboto;
              font-weight: bold;
              color: #796B6B;
              line-height: 30px;
            }

            .value {
              font-size: 32px;
              font-family: Roboto-Bold, Roboto;
              font-weight: bold;
              color: #FFA756;
              line-height: 70px;
              background: linear-gradient(320deg, #DD3642 0%, #FFC02C 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
          }
        }

        .donate-pid {
          .panel-title { {
            margin-top: 1.5em;
          }
          }

          .flex-box {
            margin: 1.5em 0;
            justify-content: space-between;
            align-items: center;

            .pid {
              padding: 6px 10px;
              border-radius: 10px;
     
              border: 1px solid #DD3642;
              font-size: 18px;
              font-family: Roboto-Bold, Roboto;
              font-weight: bold;
              color: #FFA756;
              background: linear-gradient(320deg, #DD3642 0%, #FFC02C 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }

            .value {
              font-size: 18px;
              font-family: Roboto-Bold, Roboto;
              font-weight: bold;
              color: #796B6B;
              line-height: 28px;
            }
          }
        }

        .input-box {
          position: relative;

          .exchangeAmount {
            height: 50px;
            display: flex;
            align-items: center;
            font-size: 18px;
            padding: 0 20px;
          }

          .ant-input-number, .ant-select {
            height: 50px;
            padding: 0 90px 0 40px;
            width: 100% !important;

            .ant-input-number-input-wrap, .ant-select-selector, input {
              height: 100%;
              width: 100% !important;

              &:focus-visible {
                outline: none;
              }
            }

            .ant-select-clear {
              margin-right: 66px;
            }
          }

          .max-btn {
            width: 60px;
            position: absolute;
            right: 10px;
            top: 10px;
          }

          .coin-icon {
            position: absolute;
            top: 10px;
            left: 10px;
            width: 30px;
            height: 30px;
          }

          .coin-name {
            position: absolute;
            right: 10px;
            top: 10px;
            font-size: 20px;
          }
        }

        .balance-box {
          display: flex;
          justify-content: space-between;
          font-size: 20px;
          font-family: Roboto-Bold, Roboto;

          .name {
            font-weight: bold;
            color: #796B6B;
            line-height: 30px;
          }

          .value {
            font-weight: bold;
            color: #FFFFFF;
            line-height: 30px;
          }
        }

        .down-icon {
          width: 40px;
          height: 40px;
          margin: 0.5em 0 1em calc(50% - 20px);

        }

        .donate {
          margin-top: 1em;
          width: 100%;
          height: 50px;
          font-size: 20px;
          font-family: Helvetica-Bold, Helvetica;
          font-weight: bold;
        }

        .tip {
          margin-top: 2em;
          font-size: 16px;
          font-family: Roboto-Bold, Roboto;
          font-weight: bold;
          color: #FFFFFF;
        }
      }

      .part2 {
        .og-nav-list {
          margin-top: 1em;
          width: 100%;
          height: 50px;
        }
      }

      .part3 {
        .btns {
          display: flex;
          justify-content: space-between;
        }
        .tip{
          strong{
            color: #d84a1b;
          }
        }
        .add-btn {
          margin: 1em 0;
        }
      }

      .og-nav-list {
        margin: 10px auto;
        display: flex;
        width: 90%;
        height: 60px;
        background: #3E2727;
        border-radius: 10px;
        border: 1px solid #333333;
        font-size: 24px;
        font-family: Roboto-Bold, Roboto;
        font-weight: bold;
        color: #999999;

        .nav-item {
          width: 50%;
          display: flex;
          align-items: center;
          text-align: center;
          justify-content: center;
          padding: 0 10px;

          &.active {
            font-weight: bold;
            color: #FFFFFF;
            background: linear-gradient(320deg, #DD3642 0%, #FFC02C 100%);
            box-shadow: 0px 3px 6px 0px rgba(128, 4, 149, 0.3);
            border-radius: 10px;
          }
        }
      }

      .fire-list-box {
        .list-item, .list-header {
          justify-content: space-between;
          text-align: center;

        }
        .list-header3{
          text-align: center;
          .col {
            text-align: center;
            &:nth-child(1) {
              width: 10% !important;
            }
            &:nth-child(2) {
              width: 16% !important;
            }

            &:nth-child(3) {
              width: 20% !important;
            }

            &:nth-child(4) {
              width: 40% !important;
            }
            &:nth-child(5) {
              width: 10% !important;
            }
          }
        }
        .list-header2 {
          display: flex;
          justify-content: space-between;
          font-weight: bold;

          .col {
            width: 33% !important;
            text-align: center;
            &:nth-child(1) {
              width: 10% !important;
            }
            &:nth-child(2) {
              width: 10% !important;
            }

            &:nth-child(3) {
              width: 20% !important;
            }

            &:nth-child(4) {
              width: 60% !important;
            }
          }

        }

        .col {
          text-align: left;

          &:nth-child(1) {
            min-width: 30px;
          }

          &:nth-child(2) {
            min-width: 50px;
          }

          &:nth-child(3) {
            width: 80px;
          }

          &:nth-child(4) {
            width: 80px;
          }

          &:nth-child(5) {
            width: 60px;
            padding-right: 5px;
          }

          &:nth-child(6) {
            width: 80px;
          }

          &:nth-child(7) {
            width: 80px;
            text-align: center;
          }

          &:nth-child(8) {
            width: 86px;
          }

          &:nth-child(9) {
            width: 220px;
            text-align: center;

          }

        }

        .list-item {
          .col {
            overflow: hidden;
            padding-left: 0.5%;
            //text-overflow: ellipsis;

          }

          .address {
            a {
              color: #FF9260;
            }
          }
        }
      }

      /* mobile style */
      @media screen and (max-width: 1000px) {
        .fire-list-box {
          width: 100%;
          overflow-x: scroll;
          min-width: 100%;

          .list-item {
            background: none;
          }
        }
      }
      .row2-list-item {
        padding: 6px 0;

        .col {
          width: 30% !important;
          text-align: center;


          &:nth-child(1) {
            width: 10% !important;
          }
          &:nth-child(2) {
            width: 10% !important;
          }

          &:nth-child(3) {
            width: 20% !important;
          }

          &:nth-child(4) {
            width: 60% !important;
          }
         
        }
      }

      .pagination {
        text-align: center;
      }
      .row3-list-item{
        padding: 6px;
        .col {
          &:nth-child(1) {
            width: 10% !important;
          }
          &:nth-child(2) {
            width: 10% !important;
          }

          &:nth-child(3) {
            width: 16% !important;
          }

          &:nth-child(4) {
            width: 40% !important;
          }
          &:nth-child(4) {
            width: 20% !important;
          }
        }
      }

    `
    let {state, dispatch} = useConnect();
    const [isDelMolOpen, setDelOpen] = useState(false)
    const [curWhiteUser, setCurWhiteUser] = useState(false)
    const [activeNav, setActiveNav] = useState(1)
    const [MYPIDARR, setMYPIDARR] = useState([])
    const [total, setTotal] = useState(0)
    const [total2, setTotal2] = useState(0)
    const [recordNav, setRecordNav] = useState(1)
    const [curPage, setCurPage] = useState(1)
    const [pageCount, setPageCount] = useState(20)
    const [pageCount2, setPageCount2] = useState(20)
    const [curPage2, setCurPage2] = useState(1)
    const [FDTBalance, setFDTBalance] = useState(0)
    const [totalDonate, setTotalDonate] = useState(0)
    const [exchangeAmount, setExchangeAmount] = useState(0)
    const [inputValue, setInputValue] = useState(0)
    const [isAdmin, setIsAdmin] = useState(false)
    const [ethBalance, setEthBalance] = useState(0)
    const [fdtBalance, setFdtBalance] = useState(0)
    const [allRecords, setAllRecords] = useState([])
    const [myRecords, seMyRecords] = useState([])
    const [max, setMax] = useState(0)
    const [whiteList, setAllWhiteList] = useState([])
    const [isInWhiteList, setIsInWhiteList] = useState(false)
    const [adminWhiteList, setAdminWhiteList] = useState([])
    const [salePrice, setSalePriceV] = useState(0.01)

    const history = useNavigate();
    const [form] = Form.useForm();
    const [form2] = Form.useForm();

    const handleUserViewMethod = async (name, params) => {
        let contractTemp = await getContractByName("user", state.api,)
        if (!contractTemp) {
            message.warn("Please connect", 5)
        }
        return await viewMethod(contractTemp, state.account, name, params)
    }
    const handleDealMethod = async (name, params) => {
        let contractTemp = await getContractByName("PrivateExchangePoolOG", state.api,)
        if (!contractTemp) {
            message.warn("Please connect", 5)
        }
        await dealMethod(contractTemp, state.account, name, params)
    }
    const handlePayDealMethod = async (name, params, value) => {
        let contractTemp = await getContractByName("PrivateExchangePoolOG", state.api,)
        if (!contractTemp) {
            message.warn("Please connect", 5)
        }
        await dealPayMethod(contractTemp, state.account, name, params, value)
    }
    const handleViewMethod = async (name, params) => {
        let contractTemp = await getContractByName("PrivateExchangePoolOG", state.api,)
        if (!contractTemp) {
            message.warn("Please connect", 5)
        }
        return await viewMethod(contractTemp, state.account, name, params)
    }
    const getUserInfo = async () => {
        if (!state.pid) {
            const userInfo = await handleUserViewMethod("userInfo", [state.account])
            dispatch({type: "SET_PID", payload: userInfo.PID})
        }
    }
    const handleDealCoinMethod = async (name, coinName, params) => {
        let contractTemp = await getContractByName(coinName, coinName, state.api,)
        if (!contractTemp) {
            message.warn("Please connect", 5)
        }
        return dealMethod(contractTemp, state.account, name, params)
    }
    const handleCoinViewMethod = async (name, coinName, params) => {
        let contractTemp = await getContractByName(coinName, state.api,)
        if (!contractTemp) {
            message.warn("Please connect", 5)
        }
        return await viewMethod(contractTemp, state.account, name, params)
    }

    const Row = (item, index) => {
        return <div className="list-item " key={index}>
            <div className="col id">
                {item.no}
            </div>
            <div className="col">
                {item.pid}
            </div>
            <div className="col">
                {item.name}
            </div>

            <div className="col address">
                {item.addr&&(
                    <a href={develop.ethScan + "address/" + item.addr} target="_blank">
                        {item.addr.substr(0, 6) + "..." + item.addr.substr(item.addr.length - 3, item.addr.length)}
                    </a>
                )}
            </div>
            <div className="col ">
                {item.ethAmount / 10 ** 18}
            </div>
            <div className="col ">
                {BigNumber(item.fdtAmount / 10 ** 18).toFixed(2)}
            </div>

            <div className="col">
                {item.rate}%
            </div>
            <div className="col">
                {BigNumber(item.usdtAmount / 10 ** 18).toFixed(2)}
            </div>
            <div className="col">
                {item.time}
            </div>

        </div>
    }
    const Row2 = (item, index) => {
        return <div className="list-item row2-list-item" key={index}>
            <div className="col no">
                {index+1}
            </div>
            <div className="col id">
                {item.Pid}
            </div>
            <div className="col">
                {item.name}
            </div>


            <div className="col address">
                <a href={develop.ethScan + "address/" + item.user} target="_blank">
                    {item.user.substr(0, 6) + "..." + item.user.substr(item.user.length - 6, item.user.length)}
                </a>
            </div>


        </div>
    }
    const getBalanceOfFDT = async () => {
        let balance = await handleViewMethod("getBalanceOfFDT", [])
        balance = parseInt(parseInt(balance) / 10 ** 18)
        if (balance > 0) {
            setFDTBalance(balance)
        }
    }
    const getMax = async () => {
        let res = await handleViewMethod("max", [])
        setMax(res )
    }
    const getTotalDonate = async () => {
        let res = await handleViewMethod("totalDonate", [])
        setTotalDonate(res / 10 ** 18)
    }
    const getfdtAmount = async (value) => {
        if (value > 0) {
            setInputValue(value)
            /* eslint-disable */
            let res = await handleViewMethod("getfdtAmount", [BigInt(value * 10 ** 18)])
            setExchangeAmount(BigNumber(res/10**18).toFixed(2))
        }
    }

    const exchangeFdt = async () => {
        if (inputValue > 0) {
            await handlePayDealMethod("exchangeFdt", [(BigInt(inputValue * 10 ** 18)).toString()], state.api.utils.toWei(inputValue.toString()))
            getData()
        }
    }
    const getShowWhiteList = async () => {
        let length = await handleViewMethod("getWhiteListLength", [])
        let arr = []
        for (let i = 0; i < length; i++) {
            let res = await handleViewMethod("ShowWhiteList", [i])
            arr.push(res)
            if (res.user.toString().toLowerCase() == state.account.toLowerCase()) {
                setIsInWhiteList(true)
            }
        }
        setTotal2(arr.length)
        setAllWhiteList(arr)
    }

    const getIsAdmin = async () => {
        let res = await handleViewMethod("admin", [state.account])
        console.log(res)
        setIsAdmin(res)
        if (res) {
            getAdminWhiteList()
        }
    }
    const getSalePrice = async () => {
        let res = await handleViewMethod("salePrice", [])
        setSalePriceV(res /1000)
    }
    const getAdminWhiteList = async () => {
        try {
            let length = await handleViewMethod("getAdminWhiteListLength", [])
            let adminWhiteList = []
            for (let i = 0; i < length; i++) {
                let res = await handleViewMethod("adminInviter", [state.account, i])
                adminWhiteList.push(res)
            }
            setAdminWhiteList(adminWhiteList)
        } catch (e) {

        }
    }
    const CoinBalance = async () => {
        let res = await handleCoinViewMethod("balanceOf", "WETH", [state.account])
        let res2 = await handleCoinViewMethod("balanceOf", "FDT", [state.account])
        setEthBalance(res / 10 ** 18)
        setFdtBalance(res2 / 10 ** 18)
    }
    const addWhiteList = async () => {
        await handleDealMethod("addWhiteList", [[form2.getFieldValue().address]])
        getAdminWhiteList()
    }
    const removeWhiteList = async () => {
        await handleDealMethod("removeWhiteList", [form2.getFieldValue().address])
        getAdminWhiteList()
    }
    const removeWhiteListUser = async () => {
        await handleDealMethod("removeWhiteList", [curWhiteUser.user])
        setDelOpen(false)
        getAdminWhiteList()
    }
    const getData = async () => {
        try{
            let judgeRes = await judgeStatus(state)
            if (!judgeRes) {
                return
            }
            getIsAdmin()
            getTotalDonate()
            getBalanceOfFDT()
            CoinBalance()
            getShowWhiteList()
            getUserInfo()
            getMax()
            getSalePrice()
            let res = await getDonateRecord()
            if (res.data) {

                let arr = []
                res.data.allRecords.forEach(item=>{
                    if(item.time){
                        item.time = new Date(item.time*1000).toUTCString()
                    }
                    if(item.addr.toString()==state.account.toLowerCase()){
                        arr.push(item)
                    }
                })
                console.log(arr,res.data)

                if(res.data.allRecords&&res.data.allRecords.length>0){
                    setAllRecords(res.data.allRecords)
                    setTotal(arr.length)
                    seMyRecords(arr)
                }

            }
        }catch (e) {

        }
        // dispatch({type: "SET_PidArr", payload: tempArr})
    }
    const onChangePage = async (page) => {
        await setCurPage(page)
    }
    const onChangePage2 = async (page) => {
        await setCurPage2(page)
    }
    const deleteWhite = async (user) => {
        setCurWhiteUser(user)

        setDelOpen(true)
    }
    const handleShowSizeChange = async (page, count) => {
        setPageCount(count)
    }
    const handleShowSizeChange2 = async (page, count) => {
        setPageCount2(count)
    }
    useEffect(() => {
        getData()
    }, [state.account]);
    const coinOptions = [
        {
            label: "0.1ETH",
            value: '0.1',
        },
        {
            label: "0.2ETH",
            value: '0.2',
        },
        {
            label: "0.3ETH",
            value: '0.3',
        },
        {
            label: "0.4ETH",
            value: '0.4',
        },
        {
            label: "0.5ETH",
            value: '0.5',
        },
        {
            label: "0.6ETH",
            value: '0.6',
        },
        {
            label: "0.7ETH",
            value: '0.7',
        },
        {
            label: "0.8ETH",
            value: '0.8',
        },
        {
            label: "0.9ETH",
            value: '0.9',
        },
        {
            label: "1ETH",
            value: '1',
        },
    ];

    return (
        <OGPool>
            <Modal className="model-dialog" title="Delete WhiteList User" open={isDelMolOpen} onOk={removeWhiteListUser} onCancel={()=>{setDelOpen(false)}}>
                <h3>
                    PID
                </h3>
                <div className="value">
                    {curWhiteUser.Pid}
                </div>
                <h3>
                    UserName
                </h3>
                <div className="value">
                    {curWhiteUser.name}
                </div>
                <h3>
                    Wallet Address
                </h3>
                <div className="value">
                    {curWhiteUser.user}
                </div>
            </Modal>
            <div className="og-nav-list">
                <div className={"nav-item " + (activeNav == 1 ? "active" : "")} onClick={() => {
                    setActiveNav(1)
                }}>
                    OG Donate Pool
                </div>
                <div className={"nav-item " + (activeNav == 2 ? "active" : "")} onClick={() => {
                    setActiveNav(2)
                }}>
                    WhiteList
                </div>
                {
                    isAdmin && (
                        <div className={"nav-item " + (activeNav == 3 ? "active" : "")} onClick={() => {
                            setActiveNav(3)
                        }}>
                            Set WhiteList
                        </div>
                    )
                }
            </div>
            {activeNav == 1 && (
                <div className="part1">
                    <div className="panel-box">
                        <div className="panel-container">
                            <div className="panel-title">
                                OG Donate 1
                            </div>
                            <div className="donate-info">
                                <div className="info-item">
                                    <div className="name">
                                        FDT-OG Donate Pool Amount
                                    </div>
                                    <div className="value">
                                        {FDTBalance}
                                    </div>
                                </div>
                                <div className="flex-box">
                                    <div className="info-item">
                                        <div className="name">
                                            Value
                                        </div>
                                        <div className="value">
                                            {(FDTBalance * 0.01).toFixed(1)}
                                        </div>
                                    </div>
                                    <div className="info-item">
                                        <div className="name">
                                            Total Donate
                                        </div>
                                        <div className="value">
                                            {totalDonate} ETH
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="donate-pid">
                                <div className="panel-title">
                                    Donate
                                </div>
                                <div className="flex-box">
                                    <div className="pid">
                                        PID：{state.pid}
                                    </div>
                                    <div className="value">
                                        {isInWhiteList == false && "Not a whitelist user"}
                                        {isInWhiteList == true && "Whitelist user"}
                                    </div>
                                </div>
                            </div>
                            <Form form={form} name="control-hooks" className="form">
                                <div className="balance-box">
                                    <div className="name">
                                        Balance
                                    </div>
                                    <div className="value">
                                        {state.ethBalance} <span>ETH</span>
                                    </div>
                                </div>
                                <Form.Item
                                    name="amount"
                                    validateTrigger="onBlur"
                                    validateFirst={true}
                                >
                                    <div className="input-box">
                                        <img className="coin-icon" src={ethIcon} alt=""/>
                                        <AutoComplete
                                            allowClear
                                            value={inputValue}
                                            onChange={(e) => {
                                                getfdtAmount(e)
                                            }}
                                            style={{width: 200}}
                                            options={coinOptions}
                                            placeholder=""
                                            filterOption={(inputValue, option) =>
                                                option.value.indexOf(inputValue) !== -1 &&
                                                /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/.test(inputValue)
                                            }
                                        />
                                        <Button type="primary" className="max-btn" onClick={() => {
                                        }}>
                                            Max
                                        </Button>
                                    </div>
                                </Form.Item>
                                <img className="down-icon" src={downIcon} alt=""/>
                                <Form.Item
                                    name="pid"
                                    validateTrigger="onBlur"
                                    validateFirst={true}

                                >
                                    <div className="input-box">
                                        <div className="exchangeAmount">
                                            {exchangeAmount}
                                        </div>
                                        <div className="coin-name">
                                            FDT-OG
                                        </div>
                                    </div>
                                </Form.Item>
                                <div className="balance-box">
                                    <div className="name">
                                        Balance
                                    </div>
                                    <div className="value">
                                        {fdtBalance} <span>FDT</span>
                                    </div>
                                </div>
                                <Button type="primary" className="donate" onClick={() => {
                                    exchangeFdt()
                                }}>
                                    Donate
                                </Button>
                                <div className="tip">
                                    1FDT-OG = {salePrice} USD ，Donate up to 2ETH
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className="panel-box part2">
                        <div className="panel-container">
                            <div className="panel-title">
                                Donate Records
                            </div>
                            <div className="og-nav-list">
                                <div className={"nav-item " + (recordNav == 1 ? "active" : "")} onClick={() => {
                                    setRecordNav(1)
                                }}>
                                    All Records
                                </div>
                                <div className={"nav-item " + (recordNav == 2 ? "active" : "")} onClick={() => {
                                    setRecordNav(2)
                                }}>
                                    My Records
                                </div>

                            </div>
                            <div className="fire-list-box">
                                <div className="list-header flex-box">
                                    <div className="col">
                                        No.
                                    </div>
                                    <div className="col">
                                        PID<img src={listIcon} alt="" className="list-icon"/>
                                    </div>
                                    <div className="col">
                                        Username
                                    </div>
                                    <div className="col">
                                        Address
                                    </div>
                                    <div className="col">
                                        ETH
                                    </div>
                                    <div className="col">
                                        Amount
                                    </div>
                                    <div className="col">
                                        Rate
                                    </div>
                                    <div className="col">
                                        USDT Cost
                                    </div>
                                    <div className="col">
                                        Time(UTC)
                                    </div>
                                </div>

                                {
                                    recordNav==1&&allRecords.map((item, index) => (
                                        index >= pageCount * (curPage - 1) && index < pageCount * curPage &&
                                        Row(item, index)
                                    ))
                                }
                                {
                                    recordNav==2&&myRecords.map((item, index) => (
                                        index >= pageCount * (curPage - 1) && index < pageCount * curPage &&
                                        Row(item, index)
                                    ))
                                }
                            </div>
                            <div className="pagination">
                                {
                                    activeNav == 1 && <Pagination current={curPage} showSizeChanger
                                                                  onShowSizeChange={handleShowSizeChange}
                                                                  onChange={onChangePage} total={total}
                                                                  defaultPageSize={pageCount}/>
                                }
                            </div>
                        </div>

                    </div>
                </div>
            )}
            {activeNav == 2 && (
                <div className="white-list">
                    <div className="panel-box">
                        <div className="panel-container">
                            <div className="isInW">
                                <span>
                                    My Pid:{state.pid}
                                </span>
                                <span>
                                    Whiterlist:{isInWhiteList ? "Yes" : "False"}
                                </span>
                            </div>
                            <div className="fire-list-box">
                                <div className=" list-header2 flex-box">
                                    <div className="col">
                                        No.
                                    </div>
                                    <div className="col">
                                        PID
                                    </div>
                                    <div className="col">
                                        Username
                                    </div>
                                    <div className="col">
                                        Address
                                    </div>

                                </div>
                                {
                                    whiteList.map((item, index) => (
                                        index >= pageCount2 * (curPage2 - 1) && index < pageCount2 * curPage2 &&
                                        Row2(item, index)
                                    ))
                                }
                                <div className="pagination">
                                    {
                                       <Pagination current={curPage2} showSizeChanger
                                          onShowSizeChange={handleShowSizeChange2}
                                          onChange={onChangePage2} total={total2}
                                          defaultPageSize={pageCount2}/>
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
            {activeNav == 3 && (
                <div className="part3">
                    <div className="panel-box">
                        <div className="panel-container">
                            <h3 className="tip">
                                I can have <strong>{max}</strong> whitelists, I've got <strong>{adminWhiteList.length}</strong> whitelists, I can have <strong>{max-adminWhiteList.length}</strong> whitelists.

                            </h3>
                            <div className="fire-list-box">
                                <div className="list-header3 flex-box">
                                    <div className="col">
                                        No.
                                    </div>
                                    <div className="col">
                                        PID
                                    </div>
                                    <div className="col">
                                        Username
                                    </div>
                                    <div className="col">
                                        Address
                                    </div>
                                    <div className="col">
                                        Del
                                    </div>

                                </div>

                                {
                                    adminWhiteList.map((item, index) => (
                                        <div className="list-item row3-list-item" key={index}>
                                            <div className="col no">
                                                {index+1}
                                            </div>
                                            <div className="col id">
                                                {item.Pid}
                                            </div>
                                            <div className="col">
                                                {item.name}
                                            </div>
                                            <div className="col address">
                                                <a href={develop.ethScan + "address/" + item.user} target="_blank">
                                                    {item.user.substr(0, 6) + "..." + item.user.substr(item.user.length - 6, item.user.length)}
                                                </a>
                                            </div>
                                            <Button className="col" onClick={()=>{deleteWhite(item)}}>
                                                Delete
                                            </Button>

                                        </div>)
                                    )
                                }

                            </div>

                            <Form form={form2} name="control-hooks" className="form">

                                <Form.Item
                                    name="address"
                                    validateTrigger="onBlur"
                                    label="Address"
                                    validateFirst={true}
                                >
                                    <div className="input-box">
                                        <Input/>
                                    </div>
                                </Form.Item>

                                <div className="btns">
                                    <Button className="add-btn" type="primary" onClick={() => {
                                        addWhiteList()
                                    }}>Add</Button>
                                    <Button className="add-btn" type="primary" onClick={() => {
                                        removeWhiteList()
                                    }}>Remove</Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            )}


        </OGPool>
    )
}
export default OGPool
