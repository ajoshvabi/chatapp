import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setChat } from "../Redux/NewChat/Newchat";
import { Link } from "react-router-dom";


import { Row, Col, Image, Offcanvas } from "react-bootstrap";

const Chat = () => {
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const reciverData = useSelector((state) => state.newchat.chatdata);
    // console.log("chat data",userData);
    return (
        <div className="chatprofilefixed prevent-select">

            <Row>
                <Col lg={3} md className="invisible invisiblechat ">
                </Col>
                <Col lg className="">
                    <Row>
                        <Col className="   ">
                            {/* <p className=" text-light mt-lg-4 d-block d-lg-none invisible ">.</p> */}
                            <Row className="chatnav d-flex align-items-center  " onClick={function noRefCheck() { }}>

                                {/* forlarge device */}
                                <Col lg={1} md={1} className="d-none d-lg-block " style={{ width: `6%` }}>
                                    <Image roundedCircle className="navprofile no-select ms-lg-2"
                                        src={reciverData.profile}>
                                    </Image>
                                </Col>

                                {/* For mobile */}
                                <Col xs={1} className=" d-block d-lg-none" style={{ width: `4%` }} onClick={() => dispatch(setChat({}))}>
                                    <Link to='/home'>
                                    {/* <i className="fa-solid fa-arrow-left fa-sm naviconcolor"></i> */}
                                    <i className="fa-solid fa-arrow-left-long fa-lg naviconcolor"></i>
                                    </Link>
                                </Col>
                                <Col xs={2} md={1} lg={1} className=" d-block d-lg-none" style={{ width: `13.5%` }} onClick={() => dispatch(setChat({}))}>
                                    <Link to='/home'>
                                    <Image roundedCircle className="navprofile no-select"
                                        src={reciverData.profile}>
                                    </Image>
                                    </Link>
                                </Col>

                                <Col xs md={9} lg={10} className="ms-0 pointer" onClick={handleShow}>
                                    <div>
                                        <span className="contactusername  ">{reciverData.name}</span>
                                    </div>
                                    <div>
                                        <span className="contactmgnoactive  ">last seen today at 10:54 am </span>
                                    </div>
                                </Col>
                                <Col xs={2} md lg={1} className="text-light d-flex justify-content-center ">
                                    <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" className="pointer naviconcolor" version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24"><path fill="currentColor" d="M12,7c1.104,0,2-0.896,2-2c0-1.105-0.895-2-2-2c-1.104,0-2,0.894-2,2 C10,6.105,10.895,7,12,7z M12,9c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,9.895,13.104,9,12,9z M12,15 c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,15.894,13.104,15,12,15z"></path></svg>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>


            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton className="offcanvashead px-4" >
                    <Offcanvas.Title >Contact Info</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="offcanvasbg" >
                    <div className=" d-flex justify-content-center d-grid  " >
                        <Image roundedCircle className="profileimg no-select"
                            src={reciverData.profile}>
                        </Image>
                    </div>
                    <div className="d-flex justify-content-center d-grid pt-2 fw-semibold ">
                        <h3>{reciverData.name}</h3>
                    </div>
                    <div className="d-flex justify-content-center d-grid">
                        <p>+91 {reciverData.contact}</p>
                    </div>
                    <div className="mx-4 ">
                        <small className="fw fw-lighter fw-light   ">About</small>
                        <p className="mt-2">{reciverData.about}</p>
                    </div>
                    <div className="mx-4 offcanvasred pointer">
                        <Row className="py-3">
                            <Col xs={2}>
                                <i className="fa-solid fa-ban fa-lg px-2"></i>
                            </Col>
                            <Col>
                                <h5>Block {reciverData.name}</h5>
                            </Col>
                        </Row>
                    </div>
                    <div className="mx-4 offcanvasred pointer">
                        <Row className="py-3">
                            <Col xs={2}>
                                <i className="fa-solid fa-trash px-2"></i>
                            </Col>
                            <Col>
                                <h5>Delete Chat</h5>
                            </Col>
                        </Row>

                    </div>
                </Offcanvas.Body>
            </Offcanvas>


        </div>
    )
}
export default Chat;