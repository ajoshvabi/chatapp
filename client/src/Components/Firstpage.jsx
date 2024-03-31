import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

import { Container, Row, Col } from "react-bootstrap";

export const Firstpage = () => {
    const [login, setLogin] = useState(true)
    const changeform = () => {
        setLogin(!login)
    }
    return (
        <>
            <Container fluid className="homecontainer messagebg">
                <Row className="messagebg1">
                    <Col lg={3} md className="homecontact overflow-y-auto text-break">
                        <Row>
                            <Col className="firstnav  d-flex   align-items-center text-white-50 p-0 ">
                                <h2 className=" mx-auto">Chat app</h2>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col xs className={login ? 'activelogin pointer mx-2 my-3 d-flex justify-content-center align-items-center' : 'pointer mx-2 my-3 d-flex justify-content-center align-items-center' } onClick={!login ? changeform : undefined}>
                                <label className="mx-auto py-2 text-white">Login</label>
                            </Col>
                            <Col xs className={login ? 'pointer mx-2 my-3 d-flex justify-content-center align-items-center' : 'pointer activelogin mx-2 my-3 d-flex justify-content-center align-items-center'}  onClick={login ? changeform : undefined}>
                                <label className="mx-auto py-2 text-white">Signup</label>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {login ? <Login /> : <Signup />}
                            </Col>
                        </Row>
                    </Col>
                    <Col lg className="chatbgscroll overflow-y-auto d-none d-lg-block    ">
                        <div className="frightcontent">
                            {/* <img src="../images/frontimg.png" height={250} alt="" /> */}
                            <svg width="360" height="189" viewBox="0 0 360 189" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M263.973 169.512C296.928 158.399 321.88 127.034 318.305 81.6873C312.874 12.7907 246.61 -4.29994 205.331 15.9952C149.334 43.5266 142.242 48.0401 102.134 48.0401C72.2614 48.0401 41.8454 62.4603 38.0434 101.448C35.2875 129.708 46.373 154.375 87.3951 166.97C162.054 189.892 232.127 180.251 263.973 169.512Z" fill="white" fill-opacity="0.1"></path><rect x="0.350314" y="0.491301" width="36.3309" height="71.7205" rx="6.39808" transform="matrix(0.986206 0.165525 -0.16491 0.986309 53.5536 83.2332)" fill="#42CBA5" stroke="#316474" stroke-width="0.853077"></rect><rect x="0.353963" y="0.496419" width="36.322" height="71.7116" rx="6.39363" transform="matrix(0.986206 0.165525 -0.16491 0.986309 53.9364 80.9482)" fill="white" stroke="#316474" stroke-width="0.861963"></rect><path d="M86.8525 93.0759L77.0574 151.659C76.699 153.803 74.671 155.249 72.5277 154.889L48.718 150.893C46.5747 150.533 45.1277 148.504 45.4861 146.36L55.2812 87.777C55.6396 85.6334 57.6676 84.1873 59.811 84.5471L63.6105 85.1848L79.8212 87.9056L83.6206 88.5433C85.764 88.903 87.2109 90.9323 86.8525 93.0759Z" fill="#EEFEFA" stroke="#316474" stroke-width="0.861963"></path><path d="M58.4721 88.822C58.3716 89.4244 58.7841 90.0017 59.3921 90.1058C60.0032 90.2105 60.5858 89.7985 60.6868 89.193C60.7873 88.5906 60.3749 88.0133 59.7669 87.9092C59.1557 87.8046 58.5731 88.2166 58.4721 88.822Z" fill="white" stroke="#316474" stroke-width="0.853077"></path><path d="M111.421 117.587C111.208 115.535 109.372 114.046 107.321 114.262L80.1959 117.113C78.1442 117.329 76.6535 119.167 76.8665 121.219L77.9482 131.641C78.1612 133.693 79.9971 135.182 82.0488 134.966L119.624 131.017C119.884 130.99 119.976 130.658 119.767 130.501L120.285 129.811L119.767 130.501L114.076 126.232C112.861 125.321 112.081 123.944 111.924 122.433L111.421 117.587Z" fill="#42CBA5" stroke="#316474" stroke-width="1.72407"></path><path d="M81.8036 122.275C81.3301 122.324 80.9861 122.749 81.0353 123.222C81.0844 123.696 81.5081 124.039 81.9816 123.99L81.8036 122.275ZM105.639 121.503C106.113 121.453 106.457 121.029 106.407 120.555C106.358 120.082 105.935 119.738 105.461 119.788L105.639 121.503ZM81.9816 123.99L105.639 121.503L105.461 119.788L81.8036 122.275L81.9816 123.99Z" fill="#33AF8D"></path><path d="M82.3837 127.866C81.9102 127.916 81.5662 128.34 81.6153 128.814C81.6645 129.287 82.0882 129.631 82.5616 129.581L82.3837 127.866ZM106.219 127.094C106.693 127.045 107.037 126.62 106.988 126.147C106.938 125.673 106.515 125.33 106.041 125.38L106.219 127.094ZM82.5616 129.581L106.219 127.094L106.041 125.38L82.3837 127.866L82.5616 129.581Z" fill="#33AF8D"></path><path d="M125.463 42.5442L286.19 25.6511L297.132 129.758L136.405 146.651L125.463 42.5442Z" fill="#EEFEFA"></path><path d="M295.927 130.484L138.654 147.015C135.404 147.356 132.479 144.995 132.138 141.751L121.536 40.8839C121.195 37.6393 123.564 34.7219 126.816 34.3801L284.089 17.85C287.343 17.508 290.264 19.8695 290.605 23.114L301.207 123.981C301.548 127.225 299.181 130.142 295.927 130.484Z" fill="white"></path><path d="M138.654 147.015C135.404 147.356 132.479 144.995 132.138 141.751L121.536 40.8839C121.195 37.6393 123.564 34.7219 126.816 34.3801L284.089 17.85C287.343 17.508 290.264 19.8695 290.605 23.114L301.207 123.981C301.548 127.225 299.181 130.142 295.927 130.484" stroke="#316474"></path><path d="M290.245 125.898L143.148 141.359C140.368 141.651 137.899 139.694 137.619 137.032L127.978 45.2989C127.698 42.6369 129.705 40.2098 132.486 39.9175L279.583 24.457C282.366 24.1645 284.832 26.1213 285.112 28.7834L294.754 120.517C295.033 123.179 293.028 125.606 290.245 125.898Z" fill="#EEFEFA" stroke="#316474"></path><path d="M235.259 137.428L312.949 129.263L313.671 136.134C313.765 137.031 313.618 137.844 313.33 138.429C313.038 139.021 312.643 139.314 312.259 139.354L125.358 158.998C124.974 159.039 124.527 158.835 124.118 158.316C123.714 157.803 123.401 157.039 123.307 156.142L122.585 149.271L200.276 141.105C200.601 142.008 201.075 142.789 201.654 143.357C202.316 144.008 203.148 144.405 204.048 144.31L232.236 141.347C233.135 141.253 233.866 140.692 234.379 139.919C234.827 139.243 235.129 138.38 235.259 137.428Z" fill="#42CBA5" stroke="#316474"></path><path d="M235.423 136.375L314.707 128.042L315.153 132.281C315.256 133.261 314.544 134.14 313.564 134.243L122.992 154.273C122.012 154.376 121.133 153.664 121.03 152.684L120.585 148.445L199.87 140.112C200.564 141.391 201.971 142.206 203.517 142.043L232.258 139.023C233.802 138.86 235.009 137.772 235.423 136.375Z" fill="white" stroke="#316474"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M210.617 68.8619C214.35 68.4875 218.105 69.5614 221.068 71.8378C224.102 74.1693 226.062 77.5173 226.599 81.2882C227.123 84.9707 226.203 88.7389 224.024 91.7717C221.635 95.0981 218.051 97.241 213.993 97.7845C213.854 97.8031 213.715 97.8197 213.576 97.8344C211.383 98.0649 209.159 97.8031 207.093 97.0715L199.622 99.5614C199.614 99.5636 199.607 99.565 199.6 99.5658C199.534 99.5727 199.474 99.5204 199.476 99.4512L199.962 91.6506C198.65 89.7697 197.798 87.5847 197.491 85.3032C196.973 81.4482 198 77.6213 200.384 74.5271C202.856 71.319 206.479 69.2968 210.544 68.8696L210.617 68.8619ZM210.799 71.3833C210.683 71.3955 210.566 71.4094 210.449 71.4252C203.813 72.314 199.133 78.3879 200.018 84.9648C200.288 86.9731 201.068 88.8902 202.274 90.5089L202.536 90.8598L202.126 96.1615L207.191 94.4007L207.604 94.5618C209.408 95.2644 211.374 95.5254 213.311 95.3218C213.426 95.3097 213.542 95.2959 213.656 95.2805C220.293 94.3917 224.972 88.3179 224.088 81.7409C223.219 75.28 217.299 70.7001 210.799 71.3833ZM206.255 76.8888L206.271 76.8876C206.516 76.8694 206.761 76.8505 206.976 76.8437C207.239 76.8348 207.53 76.8254 207.85 77.4125C208.231 78.1097 209.079 79.8609 209.184 80.0365C209.29 80.2121 209.367 80.4206 209.262 80.6734C209.157 80.9259 209.107 81.0825 208.94 81.3091C208.771 81.5359 208.588 81.8135 208.435 81.9892C208.264 82.1849 208.087 82.3967 208.329 82.7458C208.57 83.095 209.396 84.2344 210.561 85.1202C212.059 86.2585 213.196 86.5666 213.651 86.7216C213.815 86.7776 213.949 86.7983 214.062 86.7863C214.218 86.7699 214.336 86.6921 214.443 86.5598C214.647 86.3064 215.251 85.4395 215.502 85.0434C215.633 84.8363 215.763 84.7541 215.912 84.7384C216.031 84.7259 216.162 84.756 216.316 84.7989C216.662 84.8955 218.536 85.6437 218.917 85.7988C219.298 85.9538 219.55 86.0269 219.654 86.172C219.757 86.3178 219.81 87.0481 219.567 87.9227C219.323 88.7976 217.882 89.7311 217.213 89.8421C217.016 89.8745 216.825 89.9223 216.572 89.9489C215.962 90.0131 214.992 89.9537 212.731 89.2576C208.885 88.0733 206.243 84.4473 206.042 84.2178C205.84 83.9878 204.394 82.3511 204.261 80.5558C204.128 78.7607 205.013 77.8072 205.324 77.4171C205.621 77.0429 205.993 76.9162 206.24 76.8903C206.25 76.8892 206.261 76.8883 206.271 76.8876C206.264 76.8881 206.259 76.8885 206.255 76.8888Z" fill="#316474" fill-opacity="0.24"></path><path d="M118.423 64.686C118.641 62.6345 120.481 61.1463 122.533 61.3619L153.584 64.6255C155.636 64.8412 157.122 66.679 156.904 68.7305L155.569 81.2675C155.351 83.319 153.511 84.8072 151.459 84.5915L109.006 80.1295C108.746 80.1022 108.655 79.7704 108.864 79.6138L108.348 78.924L108.864 79.6138L115.614 74.5639C116.832 73.653 117.615 72.2766 117.776 70.7656L118.423 64.686Z" fill="#42CBA5" stroke="#316474" stroke-width="1.72407"></path><path d="M151.271 70.4778C151.744 70.5275 152.087 70.9517 152.037 71.4251C151.987 71.8985 151.562 72.2419 151.088 72.1922L151.271 70.4778ZM124.87 69.4365C124.397 69.3867 124.054 68.9626 124.104 68.4892C124.154 68.0158 124.579 67.6723 125.052 67.7221L124.87 69.4365ZM151.088 72.1922L124.87 69.4365L125.052 67.7221L151.271 70.4778L151.088 72.1922Z" fill="#33AF8D"></path><path d="M150.613 76.6727C151.086 76.7225 151.429 77.1466 151.379 77.62C151.328 78.0934 150.904 78.4369 150.43 78.3871L150.613 76.6727ZM124.212 75.6314C123.738 75.5817 123.395 75.1575 123.446 74.6841C123.496 74.2107 123.921 73.8673 124.394 73.917L124.212 75.6314ZM150.43 78.3871L124.212 75.6314L124.394 73.917L150.613 76.6727L150.43 78.3871Z" fill="#33AF8D"></path></svg>
                        </div>          
                    </Col>
                </Row>
            </Container>
        </>
    );
};