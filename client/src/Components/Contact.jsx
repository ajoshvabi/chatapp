import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setChat } from "../Redux/NewChat/Newchat";
import Chat from "./Chat";
import Messages from "./Messages";

const Contact = () => {
    const activechat = useSelector((state) => state.newchat.chatdata);
    const updatecontactdata = useSelector((state) => state.updatecontact.updatecontactdata);
    const dispatch = useDispatch();

    const [connectedUsers, setConnectedUsers] = useState([])
    let [logineduser, setlogineduser] = useState('')
    const connectedcontact = async () => {
        try {
            const response = await axios.get('/connectedcontact');
            setlogineduser(response.data.loginid1);
            setConnectedUsers(response.data.connections)
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }
    const openchat = (newuser) => {
        dispatch(setChat(newuser))
    }
    

    useEffect(() => {
        connectedcontact();
    }, [activechat,updatecontactdata])

    return (
        <>
            {/* ----------------------------for large device---------------------------------------- */}
            <div className="prevent-select d-none d-lg-block ">
                <p className="pt-3 mt-2 text-light invisible ">.</p>
                <p className=" text-light d-none d-lg-block invisible  ">.</p>
                {connectedUsers.map((user, index) => {
                    return (
                        logineduser == user.loginid ? null : (
                            <Row className="chatsection  " key={index} onClick={() => openchat(user)}>
                                <Col xs={12} className="py-2 ">
                                    <Row>
                                        <Col xs={2} md={1} lg={2} className="mt-2 mx-lg-2">
                                            <Image roundedCircle className="contactprofile"
                                                src={user.profile}>
                                            </Image>
                                        </Col>
                                        <Col xs className="mt-2 ps-2">
                                            <div className="d-flex">
                                                <span className="contactusername  ">{user.name}</span>
                                                <div className="ms-auto mt-1 ">
                                                    <label className="contacttime">{user.users[user.users.length - 1].ctime}</label>
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <span className="text contactmsg">
                                                    {user.users[user.users.length - 1].sender_id == logineduser ? <span>You: </span> : <span>{user.name}: </span>}
                                                    {user.users[user.users.length - 1].message}
                                                </span>
                                                <div className="ms-auto contactcountbg d-flex justify-content-center mt-1 ">
                                                    <small className=" contactmsgcount">10</small>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        )
                    )
                })}
            </div>

            {/* ----------------------------for small device---------------------------------------- */}

            <div className="prevent-select d-block d-lg-none ">
                <p className="pt-3 mt-2 text-light invisible ">.</p>
                <p className=" text-light d-none d-lg-block invisible  ">.</p>

                {activechat.loginid ?
                    <>

                        <Chat /><Messages />
                    </>
                    :
                    <>
                        {/* 
                        <Link className="linknon" to='/chat'>
                            <Row className="chatsection  ">
                                <Col xs={12} className="py-2">
                                    <Row>
                                        <Col xs={2} md={1} lg={2} className="mt-2 mx-lg-2">
                                            <Image roundedCircle className="contactprofile"
                                                src="https://media-tir3-2.cdn.whatsapp.net/v/t61.24694-24/370501513_1318708735703949_8851594961530675467_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdQHGTcxn-uszkbSyjNRIn579Qx6ml50DOOgkdbBk0F7Ag&oe=656208AA&_nc_sid=e6ed6c&_nc_cat=104">
                                            </Image>
                                        </Col>
                                        <Col xs className="mt-2 ps-2">
                                            <div className="d-flex">
                                                <span className="contactusername  ">Ajosh00000</span>
                                                <div className="ms-auto mt-1 ">
                                                    <label className="contacttime">10:40 Pm</label>
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                                <span className="text contactmsg">You:haii</span>
                                                <div className="ms-auto contactcountbg d-flex justify-content-center mt-1 ">
                                                    <small className=" contactmsgcount">10</small>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Link> 
                        */}



                        {connectedUsers.map((user, index) => {
                            return (
                                logineduser == user.loginid ? null : (
                                        <Row className="chatsection  " onClick={() => openchat(user)}>
                                            <Col xs={12} className="py-2">
                                                <Row>
                                                    <Col xs={2} md={1} lg={2} className="mt-2 mx-lg-2">
                                                        <Image roundedCircle className="contactprofile"
                                                            src={user.profile}>
                                                        </Image>
                                                    </Col>
                                                    <Col xs className="mt-2 ps-2">
                                                        <div className="d-flex">
                                                            <span className="contactusername  ">{user.name}</span>
                                                            <div className="ms-auto mt-1 ">
                                                                <label className="contacttime">{user.users[user.users.length - 1].ctime}</label>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex">
                                                            <span className="text contactmsg">
                                                                {user.users[user.users.length - 1].sender_id == logineduser ? <span>You: </span> : <span>{user.name}: </span>}
                                                                {user.users[user.users.length - 1].message}
                                                            </span>
                                                            <div className="ms-auto contactcountbg d-flex justify-content-center mt-1 ">
                                                                <small className=" contactmsgcount">10</small>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                )
                            )
                        })}
                    </>
                }











            </div>
        </>

    )
}
export default Contact
// #202C33