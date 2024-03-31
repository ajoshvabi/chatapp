import io from "socket.io-client"
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector,useDispatch } from "react-redux";
import { setContactUpdateTerm } from "../Redux/updatecontact/updatecontact";
// import ScrollToBottom from "react-scroll-to-bottom"
import axios from "axios";
const socket = io.connect('/', {
  path: '/socket.io',
});

const Messages = () => {
  const receiverData = useSelector((state) => state.newchat.chatdata);
  const loginUserData = useSelector((state) => state.useridstore.userId);
  const [msg, setMsg] = useState({ senderid: loginUserData });
  const [newmsg, setnewMsg] = useState([]);
  const [oldmsg, setOldmsg] = useState([])
  const dispatch = useDispatch()

  const prevMsg = async () => {
    try {
      const preMsgData = { rid: receiverData.loginid }
      const response = await axios.post("/prevMsg", preMsgData);
      setOldmsg(response.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  // useEffect(()=>{},[loginUserData])


  useEffect(() => {
    //used to select old messages
    prevMsg();
    //! this emit funtion is used to add current logined user id and socket.id to an array 
    socket.emit("add-user", loginUserData);
    const receiveMsgHandler = (data) => { 
      setnewMsg((prevMessages) => [...prevMessages, data]);
    }; //! data from receive_msg is store to the setnewMsg state

    dispatch(setContactUpdateTerm(msg))//use to update contact side

    socket.on("receive_msg", receiveMsgHandler);

    return () => {
      socket.off("receive_msg", receiveMsgHandler);
    };
  }, [loginUserData, newmsg, receiverData]); 

  const handlemsgchange = (e) => {
    const { name, value } = e.target;
    setMsg((prevMsg) => ({
      ...prevMsg,
      [name]: value,
      receiver: receiverData.loginid,
    }));
  }

  const sendmsg = async (e) => {
    e.preventDefault();
    try {
      socket.emit('sendmsg', msg);//! send message
      setnewMsg((prevMessages) => [...prevMessages, msg]);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }



  return (
    <div className="mt-4 ">
      <p className=" text-light invisible d-none d-lg-block  ">.</p>
      <Container className="px-lg-4 mx-lg-1 mt-4">

        {/* send message */}

        {/* <div className="d-flex mt-2 ms-5 ">
            <div className="ms-2 ms-auto sendmsg   d-flex align-items-center ">
              <label className="msgtextcolor px-2 py-2 text-break">
                pppWhat is Your Name
              </label>
            </div>
          </div> */}
        {/*end of send message */}

        {/* receive message */}
        {/* <div className="d-flex mt-2 me-5">
            <div className=" me-auto receivemsg   d-flex align-items-center ">
              <label className="msgtextcolor px-2 py-2 text-break">
                I am Ajosh
              </label>
            </div>
          </div> */}
        {/*end of receive message */}

        {oldmsg.map((oldmsg, index) =>
          msg.receiver === oldmsg.receiver_id ? (
            <div className="d-flex mt-2 ms-5" key={index}>
              <div className="ms-2 ms-auto sendmsg d-flex align-items-center">
                <label className="msgtextcolor px-2 py-2 text-break">
                  {oldmsg.message}
                  {/* <sub className="ms-2"><small>{oldmsg.ctime}</small></sub> */}
                </label>
              </div>
            </div>
          ) : (
            <div className="d-flex mt-2 me-5" key={index}>
              <div className="me-auto receivemsg d-flex align-items-center">
                <label className="msgtextcolor px-2 py-2 text-break">
                  {oldmsg.message}
                  {/* <sub className="ms-2"><small>{oldmsg.ctime}</small></sub> */}
                </label>
              </div>
            </div>
          )
        )}
        {/* 
          {newmsg.map((msgof, index) =>
  receiverData.loginid==msgof.receiver &&
            (
              msg.receiver === msgof.receiver ? (
              <div className="d-flex mt-2 ms-5" key={index}>
                <div className="ms-2 ms-auto sendmsg d-flex align-items-center">
                  <label className="msgtextcolor px-2 py-2 text-break">
                    {msgof.message}
                    <sub className="ms-2"><small>{msgof.ctime}</small></sub>
                  </label>
                </div>
              </div>
            ) : (
              <div className="d-flex mt-2 me-5" key={index}>
                <div className="me-auto receivemsg d-flex align-items-center">
                <label className="msgtextcolor px-2 py-2 text-break">
                    {msgof.message}
                    <sub className="ms-2"><small>{msgof.ctime}</small></sub>
                  </label>
                </div>
              </div>
            )
            )
          )} */}
      </Container>

      <Container className="bg-info">
        <div className=" msginput">
          <Row>
            <Col lg={3} md className="invisible "></Col>
            <Col lg className="msgbgcolor">
              <form onSubmit={sendmsg}>
                <Row className="d-flex align-items-center py-3 ">
                  <Col xs={1} style={{ width: `5%` }}>
                    <i
                      className="fa-regular fa-face-grin-wide fa-xl  "
                      style={{ color: "#8696A0" }}
                    ></i>
                  </Col>
                  <Col
                    xs={1}
                    style={{ width: `4%` }}
                    className="d-none d-lg-block "
                  >
                    <i
                      className="fa-solid fa-plus fa-xl  "
                      style={{ color: "#8696A0" }}
                    ></i>
                  </Col>
                  {/* <form action=""> */}
                  <Col xs className="ms-2">
                    <input
                      type="text"
                      className="inputboxmessage py-2"
                      name="message"
                      onChange={handlemsgchange}
                    />
                  </Col>
                  <Col xs={1} className="me-4 ps-0 ps-lg-2">
                    {/* <i className="fa-regular fa-face-grin-wide fa-xl  " style={{ color: '#8696A0' }}></i> */}
                    <button
                      className=" bg-transparent border-0  "
                      type="submit"
                      style={{ color: "#8696A0" }}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        height="24"
                        width="24"
                        preserveAspectRatio="xMidYMid meet"
                        className=""
                        version="1.1"
                        x="0px"
                        y="0px"
                        enableBackground="new 0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"
                        ></path>
                      </svg>
                    </button>
                  </Col>
                  {/* </form> */}
                </Row>
              </form>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
export default Messages