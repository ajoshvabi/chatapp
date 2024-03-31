import React,{useState} from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { setUserId } from '../Redux/auth/authtoken';

const Login = () => {
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [show,setshow]=useState(false)
  const showpassword=()=>{
    setshow(!show)
  }
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("/auth/login", data);
      console.log(response.data.accessToken);
      const token=response.data.accessToken;
      // (response.status==200)?console.log("login"):console.log("not logined");
      if (response.status === 200) {
        console.log("login response",response.data.userId);
        dispatch(setUserId(response.data.userId))
        console.log("login ");
        navigate("/home");
      } else {
        console.log("Unexpected status code:", response.status);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Invalid password");
        navigate("/");
      } else {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <>
    
      {/* <h2>login</h2> */}
      <Form className="px-3 text-white mt-4 " onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          {/* <Form.Label></Form.Label> */}
          <input
            className="py-2 w-100 my-3 rounded-3 logininput"
            type="text"
            name="contact"
            size="lg"
            placeholder="Contact"
            {...register("contact")}
          />
        </Form.Group>
        <Form.Group>
          {/* <Form.Label></Form.Label> */}
          <input
            className="py-2 w-100 my-3 rounded-3 logininput"
            type={show?"text":"password"}
            name="password"
            size="lg"
            placeholder="Password"
            {...register("password")}
          />
        </Form.Group>
        {/* <Form.Label></Form.Label> */}
<div className="mt-3">
<input
          className="form-check-input logininput"
          type="checkbox"
          name="showpassword"
          value="showpassword"
          onClick={showpassword}
        />
        <label className="form-check-label ms-2" >
          Show Password
        </label>
</div>

        <button
          type="submit"
          className="px-md-4 rounded-4 py-2 border-0 mt-4  w-100  "
        >
          <b>Login</b>
        </button>
      </Form>
    </>
  );
};

export default Login;
