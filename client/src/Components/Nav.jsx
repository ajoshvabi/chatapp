import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Image, Offcanvas, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setChat } from "../Redux/NewChat/Newchat";
import { changetheme } from "../Redux/theme/Mystate";
// import Avatar from 'react-avatar-editor'
import axios from "axios";

const Nav = () => {
    const [show, setShow] = useState(false);
    const [showchat, setShowchat] = useState(false);
    const [user, setUser] = useState({});
    const [alluser, setalluser] = useState([]);
    const [puser, setpUser] = useState({});
    const [search, setSearch] = useState({});
    const [editname, setEditName] = useState(false);
    const [editabout, setEditAbout] = useState(false);
    const [editprofile, setEditProfile] = useState(false);
    const [reload, setReload] = useState(false);
    const inputref = useRef(null);
    // const [src, selectFile] = useState(null)


    const dispatch = useDispatch();
    const handleClose = () => {
        setShow(false)
        setEditName(false);
        setEditAbout(false);
        setEditProfile(false)

    };
    const handleClosechat = () => {
        setShowchat(false)
    };
    const handleShow = () => setShow(true);

    const handleShowchat = async () => {
        try {
            const response = await axios.get("/alluserdata");
            if (response.data) {
                setalluser(response.data.allUserData)
            } else {
                console.log("No data found.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setShowchat(true);
    }
    const userdata = async () => {
        try {
            const response = await axios.get("/userdata");
            if (response.data) {
                setUser(response.data.userData);
                setpUser(response.data.userData)
            } else {
                console.log("No data found.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profile') {
            const reader = new FileReader();

            reader.onload = () => {
                const base64Image = reader.result;

                // Update state with the base64 image data
                setUser({
                    ...user,
                    [name]: base64Image,
                });
                setEditProfile(true)

            };

            // Read the selected file as data URL (base64)
            reader.readAsDataURL(files[0]);


        } else {
            setUser({
                ...user,
                [name]: value,
            });
            console.log(user);
        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/profileupdate', user);
            if (response.status === 201) {
                console.log('Profile update successfully.');
                setEditProfile(false)

                setReload(!reload)
            } else {
                console.error('Profile update failed.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
    useEffect(() => {
        userdata();

    }, [reload, dispatch]);

    const inputrefclick = () => {
        inputref.current.click()
    }


    const searchuser = async (e) => {
        try {
            const { name, value } = e.target;
            setSearch({
                ...search,
                [name]: value,
            });
            console.log(search);

            const response = await axios.post("/searchuser", search);
            if (response.data.allUserData) {
                console.log("get resp");
                setalluser(response.data.allUserData)
            } else {
                console.log("No data found.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const openchat = (newuser) => {
        dispatch(setChat(newuser))
        handleClosechat();
    }

    return (
        <>

            <Container fluid className="position-fixed navindex ">
                <Row>
                    <Col lg={3} className="navnav d-flex align-items-center  ">
                        <Image
                            roundedCircle
                            className="navprofile mx-1 "
                            onClick={handleShow}
                            src={puser?.profile}
                        ></Image>
                        <div className="naviconcolor ms-lg-auto mx-auto ">
                            <div className="ms-4">
                                <span
                                    className="mx-2 px-1"
                                    data-placement="bottom"
                                    title="Communities"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        height="24"
                                        width="24"
                                        preserveAspectRatio="xMidYMid meet"
                                        className=""
                                        fill="none"
                                    >
                                        <g clipPath="url(#clip0_20095_12594)">
                                            <path
                                                d="M4.7595 14.0357C4.65644 14.0313 4.55139 14.029 4.44446 14.029C3.65152 14.029 2.96238 14.1558 2.41872 14.3088C1.95159 14.4403 1.42115 14.656 0.975466 14.9996C0.521192 15.3498 0.107939 15.8739 0.0263682 16.5959C-0.0117388 16.9332 2.95136e-05 17.6554 0.00922726 18.0644C0.0256195 18.7935 0.623061 19.3623 1.33916 19.3623H4.31303C4.13562 18.9875 4.03074 18.5698 4.01771 18.1256C4.00494 17.6905 3.97075 16.5163 4.05525 15.893C4.09928 15.5682 4.17628 15.2639 4.27738 14.982C4.40496 14.6263 4.57082 14.3123 4.7595 14.0357Z"
                                                fill="currentColor"
                                            ></path>
                                            <path
                                                d="M19.6869 19.3623H22.6608C23.3769 19.3623 23.9744 18.7935 23.9908 18.0644C24 17.6554 24.0117 16.9332 23.9736 16.5959C23.8921 15.8739 23.4788 15.3498 23.0245 14.9996C22.5788 14.656 22.0484 14.4403 21.5813 14.3088C21.0376 14.1558 20.3485 14.029 19.5555 14.029C19.4486 14.029 19.3435 14.0313 19.2405 14.0357C19.4291 14.3123 19.595 14.6263 19.7226 14.982C19.8237 15.2639 19.9007 15.5682 19.9447 15.893C20.0292 16.5163 19.995 17.6905 19.9822 18.1256C19.9692 18.5698 19.8643 18.9875 19.6869 19.3623Z"
                                                fill="currentColor"
                                            ></path>
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M8.52831 13.6265C9.36687 13.3837 10.5649 13.1401 12 13.1401C13.4351 13.1401 14.6331 13.3837 15.4716 13.6265C15.9039 13.7517 16.4206 13.9288 16.8826 14.2131C17.352 14.5019 17.8167 14.934 18.0492 15.5821C18.1097 15.751 18.1563 15.9344 18.183 16.1318C18.243 16.5742 18.22 17.5691 18.2052 18.0735C18.184 18.7987 17.5884 19.3623 16.8756 19.3623H7.12434C6.41155 19.3623 5.81599 18.7987 5.79472 18.0735C5.77992 17.5691 5.75694 16.5742 5.81691 16.1318C5.84367 15.9344 5.89021 15.751 5.95079 15.5821C6.18324 14.934 6.64793 14.5019 7.11736 14.2131C7.57933 13.9288 8.09602 13.7517 8.52831 13.6265Z"
                                                fill="currentColor"
                                            ></path>
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M16.8889 9.97001C16.8889 8.49726 18.0828 7.31001 19.5555 7.31001C21.0283 7.31001 22.2222 8.49726 22.2222 9.97001C22.2222 11.4428 21.0283 12.64 19.5555 12.64C18.0828 12.64 16.8889 11.4428 16.8889 9.97001Z"
                                                fill="currentColor"
                                            ></path>
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M8.44443 8.20001C8.44443 6.23634 10.0363 4.64001 12 4.64001C13.9636 4.64001 15.5555 6.23634 15.5555 8.20001C15.5555 10.1637 13.9636 11.75 12 11.75C10.0363 11.75 8.44443 10.1637 8.44443 8.20001Z"
                                                fill="currentColor"
                                            ></path>
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M1.77777 9.97001C1.77777 8.49726 2.97168 7.31001 4.44444 7.31001C5.91719 7.31001 7.1111 8.49726 7.1111 9.97001C7.1111 11.4428 5.91719 12.64 4.44444 12.64C2.97168 12.64 1.77777 11.4428 1.77777 9.97001Z"
                                                fill="currentColor"
                                            ></path>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_20095_12594">
                                                <rect width="24" height="24" fill="10101"></rect>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </span>

                                <span
                                    className="mx-2 px-1"
                                    data-placement="bottom"
                                    title="Status"
                                >
                                    <span data-icon="status-v3-unread" className="">
                                        <svg
                                            viewBox="0 0 24 24"
                                            height="24"
                                            width="24"
                                            preserveAspectRatio="xMidYMid meet"
                                            className=""
                                            fill="none"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M3.71672 8.34119C3.23926 8.06362 3.07722 7.45154 3.35479 6.97407C4.33646 5.28548 5.79114 3.92134 7.53925 3.05006C9.28736 2.17878 11.2524 1.83851 13.1916 2.07126C13.74 2.13707 14.1312 2.63494 14.0654 3.18329C13.9995 3.73164 13.5017 4.12282 12.9533 4.05701C11.4019 3.87081 9.82989 4.14303 8.43141 4.84005C7.03292 5.53708 5.86917 6.62839 5.08384 7.97926C4.80626 8.45672 4.19419 8.61876 3.71672 8.34119Z"
                                                fill="currentColor"
                                            ></path>
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68628 15.3137 5.99999 12 5.99999C8.68629 5.99999 6 8.68628 6 12C6 15.3137 8.68629 18 12 18Z"
                                                fill="currentColor"
                                            ></path>
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M20.8569 10.115C21.4065 10.0604 21.8963 10.4616 21.9509 11.0112C22.144 12.9548 21.7638 14.9125 20.857 16.6424C19.9503 18.3724 18.5567 19.799 16.8485 20.746C16.3655 21.0138 15.7568 20.8393 15.489 20.3563C15.2213 19.8732 15.3957 19.2646 15.8788 18.9968C17.2454 18.2392 18.3602 17.0979 19.0856 15.714C19.811 14.33 20.1152 12.7639 19.9607 11.209C19.9061 10.6594 20.3073 10.1696 20.8569 10.115Z"
                                                fill="currentColor"
                                            ></path>
                                            <path
                                                d="M6.34315 17.6568C7.89977 19.2135 9.93829 19.9945 11.9785 20C12.4928 20.0013 12.9654 20.3306 13.0791 20.8322C13.2105 21.4123 12.8147 21.9846 12.22 21.9976C9.58797 22.0552 6.93751 21.0796 4.92893 19.0711C2.90126 17.0434 1.92639 14.3616 2.00433 11.7049C2.02177 11.1104 2.59704 10.7188 3.17612 10.8546C3.67682 10.9721 4.00256 11.4471 4.00009 11.9614C3.99021 14.0216 4.77123 16.0849 6.34315 17.6568Z"
                                                fill="currentColor"
                                            ></path>
                                            <circle
                                                cx="19.95"
                                                cy="4.05005"
                                                r="3"
                                                fill="#009588"
                                            ></circle>
                                        </svg>
                                    </span>
                                </span>

                                <span
                                    onClick={handleShowchat}
                                    className="mx-2 px-1 pointer"
                                    data-placement="bottom"
                                    title="Channels"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        height="24"
                                        width="24"
                                        preserveAspectRatio="xMidYMid meet"
                                        className=""
                                        fill="none"
                                    >
                                        <path
                                            d="M21.9218 10.6469C21.321 6.08949 17.5557 2.45561 12.9894 2.04404C7.06124 1.50197 2.16447 6.05937 2.05432 11.982C2.01426 14.1101 2.82538 15.9371 3.23595 16.7201L2.0443 20.6651C1.81398 21.4281 2.52497 22.1408 3.28602 21.9099L7.17139 20.7455C8.65344 21.5686 10.3157 22.0002 12.0181 22.0002C17.9663 22.0002 22.7129 16.7602 21.9118 10.6469H21.9218ZM8.06262 14.6823C8.333 15.0838 8.30296 15.6259 7.96249 15.9672C7.51186 16.429 6.76082 16.3386 6.40033 15.7966C5.66931 14.7124 5.23872 13.3974 5.23872 11.992C5.23872 10.5867 5.69936 9.17125 6.49045 8.057C6.84093 7.56512 7.57195 7.53501 8.00254 7.96665C8.35302 8.318 8.38307 8.86007 8.10268 9.2616C7.56193 10.0346 7.2515 10.9782 7.2515 11.992C7.2515 13.0059 7.56193 13.9093 8.08265 14.6723L8.06262 14.6823ZM12.0682 13.4978C11.237 13.4978 10.5661 12.8252 10.5661 11.992C10.5661 11.1588 11.237 10.4863 12.0682 10.4863C12.8993 10.4863 13.5702 11.1588 13.5702 11.992C13.5702 12.8252 12.8993 13.4978 12.0682 13.4978ZM17.5257 15.9471C17.1752 16.439 16.4442 16.4691 16.0236 16.0375C15.6731 15.6861 15.6431 15.1441 15.9235 14.7425C16.4642 13.9696 16.7847 13.0159 16.7847 12.0021C16.7847 10.9882 16.4542 10.0145 15.9035 9.24152C15.6131 8.82995 15.6331 8.27784 15.9836 7.91646C16.4042 7.49485 17.1252 7.51493 17.4857 8.00681C18.3068 9.1311 18.7875 10.5064 18.7875 12.0121C18.7875 13.5179 18.3168 14.8429 17.5257 15.9572V15.9471Z"
                                            fill="currentColor"
                                        ></path>
                                    </svg>
                                </span>

                                <span
                                    className="mx-2 px-1 pointer"
                                    data-placement="bottom"
                                    title="New Chat"
                                    onClick={() => dispatch(changetheme())}
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        height="24"
                                        width="24"
                                        preserveAspectRatio="xMidYMid meet"
                                        className=""
                                        version="1.1"
                                    >
                                        <path
                                            d="M12,1 L15.219275,4.21927498 L19.780725,4.21927498 L19.780725,8.78072502 L23,12 L19.780725,15.219275 L19.780725,19.780725 L15.219275,19.780725 L12,23 L8.78072502,19.780725 L4.21927498,19.780725 L4.21927498,15.219275 L1,12 L4.21927498,8.78072502 L4.21927498,4.21927498 L8.78072502,4.21927498 L12,1 Z M12,6 L12,18 C15.31,18 18,15.31 18,12 C18,8.76522727 15.4308833,6.12259298 12.2246968,6.00414409 L12,6 Z"
                                            fill="currentColor"
                                            fillRule="nonzero"
                                        ></path>
                                    </svg>
                                </span>

                            </div>
                        </div>
                        <div className="naviconcolor ms-auto  ">
                            {/* <div className=""> */}
                            <span
                                className="mx-2 px-1 d-flex align-item-end  "
                                data-placement="bottom"
                                title="Menu"
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
                                        d="M12,7c1.104,0,2-0.896,2-2c0-1.105-0.895-2-2-2c-1.104,0-2,0.894-2,2 C10,6.105,10.895,7,12,7z M12,9c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,9.895,13.104,9,12,9z M12,15 c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,15.894,13.104,15,12,15z"
                                    ></path>
                                </svg>
                            </span>
                            {/* </div> */}
                        </div>
                    </Col>
                </Row>
                {/* Visible only in large device */}
                <Row className="d-none d-lg-block ">
                    {/* <Col lg={3} style={{ width: `calc(25% + 60px)` }}> */}
                    <Col lg={3}>
                        <Row className="searchstyle d-flex align-items-lg-center">
                            <Col xs>
                                <input
                                    className="navsearch w-100 px-4"
                                    type="text"
                                    placeholder="Search Or Start New Chat"
                                />
                            </Col>
                            <Col xs={2}>
                                <span className="naviconcolor">
                                    <svg
                                        viewBox="0 0 24 24"
                                        height="20"
                                        width="20"
                                        preserveAspectRatio="xMidYMid meet"
                                        className=""
                                        version="1.1"
                                        x="0px"
                                        y="0px"
                                        enableBackground="new 0 0 24 24"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M10,18.1h4v-2h-4V18.1z M3,6.1v2h18v-2H3z M6,13.1h12v-2H6V13.1z"
                                        ></path>
                                    </svg>
                                </span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

            {/*------------ profile--------- */}

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton className="offcanvashead px-4">
                    <Offcanvas.Title>Profile Info</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="offcanvasbg">
                    <div className=" d-flex justify-content-center d-grid  ">
                        <Image
                            onClick={inputrefclick}
                            title="Change Profile"
                            roundedCircle
                            className="profileimg no-select"
                            src={puser?.profile}
                        ></Image>

                    </div>
                    <input type="file" name="profile" className=" invisible " onChange={handleInputChange} ref={inputref} />
                    <div className="d-flex justify-content-center d-grid pt-2 fw-semibold ">
                        <h3>{puser?.name}</h3>
                    </div>
                    <div className="d-flex justify-content-center d-grid">
                        <p>+91 {user?.contact}</p>
                    </div>
                    <div className="mx-4 ">
                        <small className="fw fw-lighter ">User Name</small>
                        <Row>
                            <Col>
                                {
                                    editname ?
                                        <p className="mt-1">
                                            <input type="text" name="name" value={user?.name} onChange={handleInputChange} className="w-100 profileeditinput" />
                                        </p>
                                        :
                                        <p className="mt-2">{puser?.name}</p>
                                }
                            </Col>
                            <Col xs={1} className="text-end d-flex align-items-center justify-content-end pointer" onClick={() => { setEditName(!editname) }}>
                                {editname ? <i className="fa-solid fa-check profileicon" ></i> : <i className="fa-solid fa-pen profileicon"></i>}

                            </Col>
                        </Row>
                    </div>
                    <div className="mx-4 ">
                        <small className="fw fw-lighter ">About</small>
                        <Row>
                            <Col>
                                {
                                    editabout ?
                                        <p className="mt-1">
                                            <input type="text" name="about" value={user?.about} onChange={handleInputChange} className="w-100 profileeditinput" />
                                        </p>
                                        :
                                        <p className="mt-2">{puser?.about}</p>
                                }
                            </Col>
                            <Col xs={1} className="text-end d-flex align-items-center justify-content-end pointer" onClick={() => { setEditAbout(!editabout) }}>
                                {editabout ? <i className="fa-solid fa-check profileicon"></i> : <i className="fa-solid fa-pen profileicon"></i>}

                            </Col>
                        </Row>
                    </div>
                    <div className="mx-4 mt-3   d-flex justify-content-end ">
                        {editabout || editname || editprofile ? <button className="rounded-2 py-1 px-2 border-0 editbtn " onClick={handleSubmit}>Update Profile</button> : null}
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

            {/*------------ new chat--------- */}

            <Offcanvas show={showchat} onHide={handleClosechat}>
                <Offcanvas.Header closeButton className="offcanvashead px-4">
                    <Offcanvas.Title>New Chat</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="offcanvasbg">
                    <p>Start a new Chat</p>
                    <Col xs className="mb-3">
                        <input
                            className="navsearch w-100 px-4"
                            type="text"
                            name="search"
                            placeholder="Search Or Start New Chat"
                            onChange={searchuser}
                        />
                    </Col>
                    {alluser.map((newuser, index) => (
                        <Row className="chatsection  " key={index} onClick={() => openchat(newuser)}>
                            <Col xs={12} className="py-2 " >
                                <Row>
                                    <Col xs={2} md={1} lg={2} className="mt-2 mx-lg-2">
                                        <Image roundedCircle className="contactprofile"
                                            src={newuser.profile}            >
                                        </Image>
                                    </Col>
                                    <Col xs className="mt-2 ps-2">
                                        <div className="d-flex">
                                            <span className="contactusername  ">{newuser.name}</span>
                                        </div>
                                        <div className="d-flex ">
                                            <span className="text contactmsg newabt overflowbt ">{newuser.about} </span>

                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    ))}
                </Offcanvas.Body>
            </Offcanvas>

        </>
    );
};
export default Nav;

