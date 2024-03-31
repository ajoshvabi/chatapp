import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import './style.css';


import About from "./About";
import Chat from "./Chat";
import Contact from "./Contact";
import Messages from "./Messages";
import Nav from "./Nav";
// import { Profile } from "./Profile";

function HomePage() {
    const activechat = useSelector((state) => state.newchat.chatdata);

    return (
        <>
        
        <div className=" d-none d-lg-block ">
            <Nav/>
        </div>
            <Container fluid className="homecontainer messagebg">
                <Row className="messagebg1">
                    <Col lg={3} md className="homecontact overflow-y-auto text-break">
                    {activechat.loginid?null:
                    <div className="d-block d-lg-none responsivenav">
<Nav/>
                    </div>
                         }
                        <Contact />
                    </Col>
                   
                    <Col lg className="chatbgscroll overflow-y-auto d-none d-lg-block ">
                    {activechat.loginid?
                    <>
                    <Chat  />
                        <Messages />
                    </>
                    :
                      
                    // <About/>
                    <About/>
                    }
                        
                    </Col>
                </Row>
            </Container>
        </>

    )
}
export default HomePage