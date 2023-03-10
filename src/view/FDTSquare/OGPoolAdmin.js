import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {useConnect} from "../../api/contracts";
import {
    Button,
    message,
    Form,
    Input,
    Switch,
    Pagination,
} from 'antd';
import {getContractByName, getContractByContract} from "../../api/connectContract";
import {dealMethod, dealPayMethod, viewMethod} from "../../utils/contractUtil"
import develop from "../../env";
import judgeStatus from "../../utils/judgeStatus";

const OGPool = (props) => {
    const OGPool = styled.div`
      .assign-row{
        padding: 10px 0;
        border-bottom: 1px solid #666;
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
      .panel-container {
        width: 90%;
        margin: 10px auto;
        padding: 1em;

        .info {
          font-size: 20px;
          font-family: Roboto-Medium, Roboto;
          font-weight: 500;
          color: #AC8989;
          line-height: 34px;
        }
      }

      .part3 {
        .operate-btns {
          width: 100%;

          Button {
            width: 100%;
            height: 40px;
            margin-top: 1em;
          }
        }

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
              background: linear-gradient(90deg, rgba(#dd3642, 0.3) 0%, rgba(#FFC02C, 0.5) 100%);
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
            padding: 0 66px 0 40px;
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

      .og-nav-list {
        margin: 10px auto;
        display: flex;
        width: 90%;
        height: 80px;
        background: #3E2727;
        border-radius: 10px;
        border: 1px solid #333333;
        font-size: 20px;
        font-family: Roboto-Bold, Roboto;
        font-weight: bold;
        color: #999999;

        .nav-item {
          width: 33.3%;
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
    `
    const [form2] = Form.useForm();
    let {state, dispatch} = useConnect();
    const [activeNav, setActiveNav] = useState(1)
    const [form] = Form.useForm();
    const [secondAdmins, setSecondAmdin] = useState([])
    const [assignAmin, setAssignAdmin] = useState([])
    const [rateArr, setRateArr] = useState([])
    const [total, setTotal] = useState(0)
    const [curPage, setCurPage] = useState(1)
    const [pageCount, setPageCount] = useState(20)
    const [inviteRate, setInv] = useState([])
    const [FDTBalance, setFDTBalance] = useState(0)
    const [totalDonate, setTotalDonate] = useState(0)
    const [salePriceV, setSalePriceV] = useState(0)
    const [max, setMax] = useState(0)
    const [exchangeAmount, setExchangeAmount] = useState(0)
    const [inputValue, setInputValue] = useState(0)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isPause, setIsPause] = useState(false)
    const [whiteList, setAllWhiteList] = useState([])
    const [ethBalance, setEthBalance] = useState(0)
    const [fdtBalance, setFdtBalance] = useState(0)
    const [ownerAddress, setOwnerAddress] = useState("")

    const handleViewMethod = async (name, params) => {
        let contractTemp = await getContractByName("PrivateExchangePoolOG", state.api,)
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
    const getBalanceOfFDT = async () => {
        let balance = await handleViewMethod("getBalanceOfFDT", [])
        balance = parseInt(parseInt(balance) / 10 ** 18)
        if (balance > 0) {
            setFDTBalance(balance)
        }
    }
    const getOwner = async () => {
        let res = await handleViewMethod("owner", [])
        setOwnerAddress(res)
    }
    const getTotalDonate = async () => {
        let res = await handleViewMethod("totalDonate", [])
        setTotalDonate(res / 10 ** 18)
    }
    const getSalePrice = async () => {
        let res = await handleViewMethod("salePrice", [])
        setSalePriceV(res /1000)
    }
    const getMax = async () => {
        let res = await handleViewMethod("max", [])
        setMax(res )
    }
    const getfdtAmount = async (value) => {
        if (value > 0) {
            setInputValue(value)
            /* eslint-disable */
            let res = await handleViewMethod("getfdtAmount", [BigInt(value * 10 ** 18)])
            setExchangeAmount(res / 10 ** 18)
        }
    }

    const exchangeFdt = async () => {
        if (inputValue > 0) {
            let res = await handlePayDealMethod("exchangeFdt", [(BigInt(inputValue * 10 ** 18)).toString()], state.api.utils.toWei(inputValue.toString()))
            console.log(res)
            getData()
        }
    }
    const getShowWhiteList = async () => {
        let length = await handleViewMethod("getWhiteListLength", [])
        let arr = []
        for (let i = 0; i < length; i++) {
            let res = await handleViewMethod("ShowWhiteList", [i])
            arr.push(res)
        }
        setAllWhiteList(arr)
    }


    const getPause = async () => {
        let res = await handleViewMethod("paused", [])
        setIsPause(res)
    }
    const getRateAndAddress = async () => {
        let rate = await handleViewMethod("rate", [])
        let assignAddress = await handleViewMethod("assignAddress", [])
        setIsPause(rate, assignAddress)
    }
    const getSecondAdmins = async () => {
        let length = await handleViewMethod("getSecondAdminLength", [])
        let arr = []
        for (let i = 0; i < length; i++) {
            let res = await handleViewMethod("admins", [i])
            arr.push(res)
        }
        setSecondAmdin(arr)
    }
    const getRate = async () => {
        let length = await handleViewMethod("getRateLength", [])
        let arr = []
        for (let i = 0; i < length; i++) {
            let res = await handleViewMethod("rate", [i])
            arr.push(res)
        }
        setRateArr(arr)
    }
    const getInviteRate = async () => {
        let inviteRate = await handleViewMethod("inviteRate", [])
        setInv(inviteRate)

    }
    const getAssignAddress = async () => {
        let length = await handleViewMethod("getAssignAddresslength", [])
        let arr = []
        for (let i = 0; i < length; i++) {
            let res = await handleViewMethod("assignAddress", [i])
            arr.push(res)
        }
        setAssignAdmin(arr)
    }

    const setAssignAddress = async () => {
         await handleDealMethod("setAssignAddress", [form2.getFieldValue().assignId,form2.getFieldValue().address])
        getAssignAddress()
    }
    const addAssignAddress = async () => {
        await handleDealMethod("addAssignAddress", [[form2.getFieldValue().addAssignAddr]])
        getAssignAddress()
    }
    const removeAssiginAddress = async () => {
        await handleDealMethod("removeAssiginAddress", [form2.getFieldValue().addAssignAddr])
        getAssignAddress()
    }
    const addRate= async () => {
        let TotalRate =  form2.getFieldValue().addAssignRate
        rateArr.forEach(rate=>{
            TotalRate = parseInt(TotalRate) + parseInt(rate)
        })
        TotalRate = parseFloat(TotalRate)+ parseFloat(inviteRate)
        if(TotalRate>100){
            message.warn("需要把上面rate设置一下，使其总和不超过100")
            return
        }
        await handleDealMethod("addRate", [[form2.getFieldValue().addAssignRate]])
        getRate()
    }
    const removeRate = async () => {
        await handleDealMethod("removeRate  ", [form2.getFieldValue().assignId])
        getRate()
    }

    const setRate = async () => {
        await handleDealMethod("setRate", [form2.getFieldValue().assignId, form2.getFieldValue().assignRate])
        getRate()
    }

    const transferOwnership = async () => {
        await handleDealMethod("transferOwnership", [form.getFieldValue().address])
        getOwner()
    }
    const handlePause = async () => {
        console.log(isPause)
        if (form.getFieldValue().pause) {
            let res = await handleDealMethod("pause", [])
        } else {
            let res = await handleDealMethod("unpause", [])
        }
    }
    const setInviteRate = async () => {
        await handleDealMethod("setInviteRate", [form2.getFieldValue().inviteRate])
        getInviteRate()
    }
    const setAdmins = async () => {
        await handleDealMethod("setAdmin", [[form.getFieldValue().adminaddress]])
        getSecondAdmins()
    }
    const removeAdmin = async () => {
        await handleDealMethod("removeAdmin", [[form.getFieldValue().adminaddress]])
        getSecondAdmins()
    }
    const setWhiteListAmount = async () => {
        await handleDealMethod("setWhiteMax", [(form2.getFieldValue().max)])
    }
    const withdraw = async () => {
        await handleDealMethod("withdraw", [state.api.utils.toWei(form2.getFieldValue().withdrawNum)])
        this.getData()
    }
    const claim = async () => {
        await handleDealMethod("Claim", [form2.getFieldValue().tokenAddress, state.api.utils.toWei(form2.getFieldValue().tokenNumber)])
    }
    const setSalePrice = async () => {
        if((form2.getFieldValue().exchangeRate)*1000<1){
            message.warn("请输入 0到0.001")
                return
        }
        await handleDealMethod("setSalePrice", [(form2.getFieldValue().exchangeRate)*1000])
    }
    const getData = async () => {
        let judgeRes = await judgeStatus(state)
        if (!judgeRes) {
            return
        }
        getTotalDonate()
        getBalanceOfFDT()
        getShowWhiteList()
        getOwner()
        getSecondAdmins()
        getAssignAddress()
        getRate()
        getInviteRate()
        getSalePrice()
        getMax()
    }
    const onChangePage = async (page) => {
        getData(page)
        await setCurPage(page)
    }
    const handleShowSizeChange = async (page, count) => {
        setPageCount(count)
    }
    useEffect(() => {
        getData()
    }, [state.account]);
    const Row2 = (item, index) => {
        return <div className="list-item " key={index}>
            <div className="col id">
                {item.Pid}
            </div>
            <div className="col">
                {item.name}
            </div>


            <div className="col address">
                {item.user &&
                <a href={develop.ethScan + "address/" + item.user} target="_blank">
                    {item.user.substr(0, 6) + "..." + item.user.substr(item.user.length - 3, item.user.length)}
                </a>
                }

            </div>


        </div>
    }


    return (
        <OGPool>
            <div className="og-nav-list">
                <div className={"nav-item " + (activeNav == 1 ? "active" : "")} onClick={() => {
                    setActiveNav(1)
                }}>
                    Important Operation
                </div>
                <div className={"nav-item " + (activeNav == 2 ? "active" : "")} onClick={() => {
                    setActiveNav(2)
                }}>
                    OG Contract
                    Parameters
                </div>
                <div className={"nav-item " + (activeNav == 3 ? "active" : "")} onClick={() => {
                    setActiveNav(3)
                }}>
                    OG Donate Pool
                </div>
            </div>
            {activeNav == 1 && (
                <div className="part1">
                    <div className="panel-box">
                        <div className="panel-container">
                            <div className="panel-title">
                                Transfer Administrator
                            </div>
                            <Form form={form} name="control-hooks" className="form">
                                <Form.Item
                                    label="Administrator Address"
                                >
                                    {ownerAddress}
                                </Form.Item>
                                <Form.Item
                                    name="address"
                                    label="New Administrator"
                                    validateTrigger="onBlur"
                                    validateFirst={true}
                                >
                                    <Input/>
                                </Form.Item>
                                <Button type="primary" className="go-btn" onClick={() => {
                                    transferOwnership()
                                }}>
                                    Confirm
                                </Button>
                            </Form>
                        </div>
                    </div>
                    <div className="panel-box">
                        <div className="panel-container">
                            <div className="panel-title">
                                Contract Status
                            </div>
                            <Form form={form} name="control-hooks" className="form">
                                <Form.Item
                                    name="pause"
                                    label="IS Pause"
                                    validateTrigger="onBlur"
                                    validateFirst={true}
                                    rules={[
                                        {required: true, message: 'Please input Amount!'},
                                    ]}

                                >
                                    <Switch value={isPause} defaultChecked={isPause} onChange={(value) => {
                                    }}/>
                                </Form.Item>
                                <Button type="primary" onClick={handlePause}>Submit</Button>
                            </Form>
                            <div className="info">
                                This function is related to the running status of the contract, please use it with
                                caution.
                            </div>
                        </div>

                    </div>
                </div>
            )}
            {activeNav == 2 && (
                <div>
                    <div className="panel-box part2">
                        <div className="panel-container">
                            <div className="panel-title">
                                Set Level 2 Administrator
                            </div>
                            <div className="fire-list-box">
                                <div className="list-header flex-box">
                                    <div className="col">
                                        Address
                                    </div>
                                </div>
                                {
                                    secondAdmins.map((item, index) => (
                                        <div className="row">
                                            {item}
                                        </div>
                                    ))
                                }

                            </div>
                            <Form form={form} name="control-hooks" className="form">

                                <Form.Item
                                    name="adminaddress"
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
                                        setAdmins()
                                    }}>addAdmins</Button>
                                    <Button className="add-btn" type="primary" onClick={() => {
                                        removeAdmin()
                                    }}>removeAdmin</Button>
                                </div>
                            </Form>
                        </div>
                        <div className="panel-container">
                            <div className="panel-title">
                                Set Level 2 WhiteList Amount: {max}
                            </div>
                            <Form form={form2} name="control-hooks" className="form">

                                <Form.Item
                                    name="max"
                                    label="Max"
                                    validateTrigger="onBlur"
                                    validateFirst={true}
                                >
                                    <div className="input-box">
                                        <Input/>
                                    </div>
                                </Form.Item>

                                <div className="btns">
                                    <Button className="add-btn" type="primary" onClick={() => {
                                        setWhiteListAmount()
                                    }}>setWhiteListAmount</Button>
                                </div>
                            </Form>
                        </div>
                        <div className="panel-container">
                            <div className="panel-title">
                                Exchange Rate :{salePriceV}
                            </div>
                            <Form form={form2} name="control-hooks" className="form">

                                <Form.Item
                                    name="exchangeRate"
                                    label="Exchange Rate"
                                    validateTrigger="onBlur"
                                    validateFirst={true}
                                >
                                    <div className="input-box">
                                        <Input/>
                                    </div>
                                </Form.Item>

                                <div className="btns">
                                    <Button className="add-btn" type="primary" onClick={() => {
                                        setSalePrice()
                                    }}>setSalePrice</Button>
                                </div>
                            </Form>
                        </div>
                        <div className="panel-container">
                            <div className="panel-title">
                                 Invite Rate: {inviteRate}%
                            </div>
                            <Form form={form2} name="control-hooks" className="form">

                                <Form.Item
                                    name="inviteRate"
                                    label="Invite Rate"
                                    validateTrigger="onBlur"
                                    validateFirst={true}
                                >
                                    <div className="input-box">
                                        <Input/>
                                    </div>
                                </Form.Item>

                                <div className="btns">
                                    <Button className="add-btn" type="primary" onClick={() => {
                                        setInviteRate()
                                    }}>setInviteRate</Button>
                                </div>
                            </Form>
                        </div>
                        <div className="panel-container">
                            <div className="panel-title">
                                Fund Allocation
                            </div>
                            <div className="box">
                                <div className="assign-row flex-box">

                                    <div className="col">
                                        Address
                                    </div>

                                    <div className="col">
                                        Rate
                                    </div>

                                </div>

                                {
                                    assignAmin.map((item, index) => (
                                       <div className="assign-row">
                                           <div className="col">{item}
                                           </div>
                                           <div className="col">
                                               {rateArr[index]}
                                           </div>
                                       </div>
                                    ))
                                }

                            </div>
                            <Form form={form2} name="control-hooks" className="form">
                                <Form.Item
                                    name="assignId"
                                    label="assignId"
                                    validateTrigger="onBlur"
                                    validateFirst={true}
                                >
                                    <div className="input-box">
                                        <Input/>
                                    </div>
                                </Form.Item>
                                <Form.Item
                                    name="assignAddress"
                                    label="assignAddress"
                                    validateTrigger="onBlur"
                                    validateFirst={true}
                                >
                                    <div className="input-box">
                                        <Input/>
                                    </div>
                                </Form.Item>
                                <div className="btns">
                                    <Button className="add-btn" type="primary" onClick={() => {
                                        setAssignAddress()
                                    }}>setAssignAddress</Button>
                                </div>
                                <Form.Item
                                    name="assignRate"
                                    label="assignRate"
                                    validateTrigger="onBlur"
                                    validateFirst={true}
                                >
                                    <div className="input-box">
                                        <Input/>
                                    </div>
                                </Form.Item>

                                <div className="btns">
                                    <Button className="add-btn" type="primary" onClick={() => {
                                        setRate()
                                    }}>setRate</Button>
                                    <Button className="add-btn" type="primary" onClick={() => {
                                        removeRate()
                                    }}>removeRate</Button>

                                </div>
                                <Form.Item
                                    name="addAssignAddr"
                                    label="addAssignAddr"
                                    validateTrigger="onBlur"
                                    validateFirst={true}
                                >
                                    <div className="input-box">
                                        <Input/>
                                    </div>
                                </Form.Item>

                                <div className="btns">
                                    <Button className="add-btn" type="primary" onClick={() => {
                                        addAssignAddress()
                                    }}>addAssignAddress</Button>
                                    <Button className="add-btn" type="primary" onClick={() => {
                                        removeAssiginAddress()
                                    }}>removeAssiginAddress</Button>
                                </div>
                                <Form.Item
                                    name="addAssignRate"
                                    label="addAssignRate"
                                    validateTrigger="onBlur"
                                    validateFirst={true}
                                >
                                    <div className="input-box">
                                        <Input/>
                                    </div>
                                </Form.Item>

                                <div className="btns">
                                    <Button className="add-btn" type="primary" onClick={() => {
                                        addRate()
                                    }}>addRate</Button>

                                </div>
                            </Form>
                        </div>

                    </div>
                </div>
            )}
            {
                activeNav == 3 && (
                    <div className="part3">
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
                                                {FDTBalance * 0.01}
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
                                <div className="operate-btns">
                                    <Form form={form2} name="control-hooks" className="form">
                                        <Form.Item
                                            name="tokenAddress"
                                            label="tokenAddress"
                                            validateTrigger="onBlur"
                                            validateFirst={true}
                                        >
                                            <div className="input-box">
                                                <Input/>
                                            </div>
                                        </Form.Item>
                                        <Form.Item
                                            name="tokenNumber"
                                            label="tokenNumber"
                                            validateTrigger="onBlur"
                                            validateFirst={true}
                                        >
                                            <div className="input-box">
                                                <Input/>
                                            </div>
                                        </Form.Item>
                                    </Form>
                                    <Button onClick={claim} type="primary" className="operate-btn">
                                        Claim
                                    </Button>
                                    {/*<Button type="primary" className="operate-btn">*/}
                                    {/*    FDT-OG Deposit*/}
                                    {/*</Button>*/}
                                    <Form form={form2} name="control-hooks" className="form">
                                        <Form.Item
                                            name="withdrawNum"
                                            label="withdrawNum"
                                            validateTrigger="onBlur"
                                            validateFirst={true}
                                        >
                                            <div className="input-box">
                                                <Input/>
                                            </div>
                                        </Form.Item>
                                    </Form>
                                    <Button type="primary" className="operate-btn" onClick={withdraw}>
                                        FDT-OG Withdraw
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="panel-box part2">
                            <div className="panel-container">

                                <div className="fire-list-box">
                                    <div className="list-header flex-box">

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
                                            Row2(item, index)
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
                )
            }
        </OGPool>
    )
}
export default OGPool
