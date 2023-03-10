import {Routes, Route, Link, useNavigate, useLocation} from "react-router-dom";
import Register from "./view/HolyFireAltar/Register";
import Home from "./view/Home"
import AdminPage from "./view/passportAdmin"
import MyPassport from "./view/HolyFireAltar/myPassport"
import GlobalStyle from "./style/style";
import AntdOverride from "./style/antdOverride";
import React from "react";
import {ConnectProvider, useConnect} from "./api/contracts";
import FireDAOHeader from "./component/FireDAOHeader";
import FireDAOFooter from "./component/FireDAOFooter";
import OnBuilding from "./view/OnBuilding";
import Passport from "./view/HolyFireAltar/Passport";

import PidList from "./view/HolyFireAltar/PidList";
import ChangeUserInfo from "./view/HolyFireAltar/ChangeUserInfo";
import firebg from "./imgs/firebg.mp4"
import NavList from "./component/NavList";
//Treasury
import IncomeDistribution from "./view/Treasury/IncomeDistribution";
import IncomeSource from "./view/Treasury/IncomeSource";
import PidAirdrop from "./view/HolyFireAltar/PidAirdrop";

//FDTSquare
import OGPool from "./view/FDTSquare/OGPool";
import OGPoolAdmin from "./view/FDTSquare/OGPoolAdmin";
import "animate.css";
function App() {
    const history = useNavigate();
    const location = useLocation()

    return (

        <ConnectProvider>
            <GlobalStyle/>
            <AntdOverride/>

            {
                location.pathname==="/"&&<Home/>
            }
            {location.pathname !== "/"&&

                <div className="content">
                    <video webkit-playsinline="true"  playsInline={true}  x5-video-orientation="portraint"   x5-playsinline="true" className="firebg" width="100%" autoPlay="autoplay" loop="loop" muted="muted">
                        <source src={firebg} type="video/mp4"/>
                    </video>
                    <FireDAOHeader/>
                    <NavList className="app-nav"/>
                    <div className="App" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        paddingTop:"6em"
                    }}>

                        <div className="flex-container" style={{
                            width:"100%",
                            flexGrow:"1"
                        }}>
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/OnBuilding" element={<OnBuilding/>}/>
                                <Route path="/MintPassport" element={<Register/>}/>
                                <Route path="/MyPassport" element={<MyPassport/>}/>
                                <Route path="/PIDList" element={<PidList/>}/>
                                <Route path="/ChangeUserInfo" element={<ChangeUserInfo/>}/>
                                <Route path="/Passport" element={<Passport/>}/>
                                <Route path="/OGPoolkk" element={<OGPool/>}/>
                                <Route path="/OGPoolAdmin" element={<OGPoolAdmin/>}/>
                                <Route path="/PassportAdmin" element={<AdminPage/>}/>

                                {/*OnBuilding*/}
                                <Route path="/PidAirdrop" element={<OnBuilding/>}/>

                                <Route path="/UserInfo" element={<OnBuilding/>}/>
                                <Route path="/CreateLock" element={<OnBuilding/>}/>
                                <Route path="/LockList" element={<OnBuilding/>}/>
                                <Route path="/MintFireSeed" element={<OnBuilding/>}/>
                                <Route path="/MintFireSoul" element={<OnBuilding/>}/>
                                <Route path="/PassFireSeed" element={<OnBuilding/>}/>
                                <Route path="/SbtAdmin" element={<OnBuilding/>}/>
                                <Route path="/FIDList" element={<OnBuilding/>}/>
                                <Route path="/SBTList" element={<OnBuilding/>}/>
                                <Route path="/Reputation" element={<OnBuilding/>}/>
                                <Route path="/IncomeDistribution" element={<OnBuilding/>}/>
                                <Route path="/IncomeSource" element={<OnBuilding/>}/>

                                <Route path="/General" element={<OnBuilding/>}/>
                                <Route path="/DeFi" element={<OnBuilding/>}/>
                                <Route path="/DAOs" element={<OnBuilding/>}/>
                                <Route path="/NFT" element={<OnBuilding/>}/>
                                <Route path="/Metaverse" element={<OnBuilding/>}/>
                                <Route path="/SocilFi" element={<OnBuilding/>}/>
                                <Route path="/GameFi" element={<OnBuilding/>}/>
                                <Route path="/ConsensusPool" element={<OnBuilding/>}/>
                                <Route path="/FLMPool" element={<OnBuilding/>}/>
                                <Route path="/UniswapPool" element={<OnBuilding/>}/>
                                <Route path="/FDTRelease" element={<OnBuilding/>}/>
                                <Route path="/FLMRelease" element={<OnBuilding/>}/>
                                <Route path="/FDTHolder" element={<OnBuilding/>}/>

                            </Routes>
                        </div>
                    </div>
                    <FireDAOFooter/>
                </div>
            }
        </ConnectProvider>

    )
}

export default App;
