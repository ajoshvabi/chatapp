import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Signup = () => {
  const [otp, setOtp] = useState("");
  const [userdata, setUserData] = useState({});
  const [tryed, setTryed] = useState(0);
  const { register, handleSubmit } = useForm();
  const [show, setshow] = useState(false);
  const showpassword = () => {
    setshow(!show);
  };

  const otpverification = (otp, userdata) => {
    Swal.fire({
      title: "Verify your Chatapp ",
      input: "number",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Verify",
      showLoaderOnConfirm: true,
      preConfirm: async (login) => {
        if (tryed < 5) {
          try {
            setTryed((prevTryed) => prevTryed + 1);
            if (login == otp) {
              try {
                const response = await axios.post("/auth/adduser", userdata);
                if (response) {
                  Swal.fire({
                    icon: "success",
                    title: "Welcome to Chatapp",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              } catch (error) {
                console.error("Error fetching data:", error);
              }
            } else {
              Swal.showValidationMessage(
                `Request failed: Enter your correct OTP`
              );
            }
          } catch (error) {
            Swal.showValidationMessage(`
                  Request failed: ${error}
                `);
          }
        } else {
          Swal.fire({
            title: "Too many attempts?",
            text: "Try after some time!",
            icon: "warning",
          });
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  useEffect(() => {
    if (otp) {
      console.log(otp);
      otpverification(otp, userdata);
    }
  }, [otp]);
  // , [otp, tryed])

  const onSubmit = async (data) => {
    try {
      setUserData(data);
      const response = await axios.post("/auth/signup", data);
      setOtp(response.data.otpno);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Form className="px-3 text-white mt-4" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          {/* <Form.Label></Form.Label> */}
          <input
            className="py-2 w-100 my-3 rounded-3 logininput"
            type="text"
            name="name"
            size="lg"
            placeholder="User Name"
            {...register("name")}
          />
        </Form.Group>
        <Form.Group>
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
            type={show ? "text" : "password"}
            name="password"
            size="lg"
            placeholder="Password"
            {...register("password")}
          />
        </Form.Group>
        <div className="mt-3">
          <input
            className="form-check-input logininput"
            type="checkbox"
            name="showpassword"
            value="showpassword"
            onClick={showpassword}
          />
          
          <label className="form-check-label ms-2  ">Show Password</label>
        </div>
        <button
          type="submit"
          className="px-md-4 rounded-4 py-2 border-0 mt-4 w-100 "
        >
          <b>SignUp</b>
        </button>
      </Form>
    </>
  );
};

export default Signup;
