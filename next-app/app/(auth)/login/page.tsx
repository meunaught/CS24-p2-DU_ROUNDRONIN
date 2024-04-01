'use client';
import "./login.css";
import { Input } from "antd";
import ReactLoading from 'react-loading';
import { CiLock } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { CiUser } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


const SignUpCTA = () => {
      const router = useRouter();
      const handleForgotPasswordClick = () => { };
      return (
            <div className="flex mb-5 mt-2  flex-col justify-center w-[400px] items-center">
                  <div className="flex flex-row justify-between items-center gap-[70px] mt-5 mb-5 w-full">
                        <div
                              className="text-white text-[15px] font-semibold font-sans cursor-pointer whitespace-nowrap"
                              onClick={() => { router.push("/resetpassword") }}
                        >
                              Forgot password?
                        </div>

                  </div>
                  <div className="flex-row flex justify-center items-center mt-6 w-full gap-14">

                  </div>
            </div>
      );
};

const Login = () => {

      const [allComponentsLoaded, setAllComponentsLoaded] = useState(false);
      const router = useRouter();
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");


      useEffect(() => {
            const token = localStorage.getItem('access_token');
            console.log(token);
            Promise.all([
                  axios.get('http://localhost:5000/users', {
                        headers: {
                              Authorization: `Bearer ${token}`
                        }
                  })]).then((response) => {
                        console.log("sd");

                        if (response[0].status == 200) {
                              router.push("/admin")
                        }
                        else {

                        }

                  }
                  ).catch((error) => {
                        if (error.response.data.detail == "Insufficicent Permissions") {
                              router.push("/dashboard")
                        }
                        else {
                              setAllComponentsLoaded(true);
                        }

                  });
      }, []);


      const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
      };
      const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
      };
      const handleLogin = async () => {

            const params = new URLSearchParams();
            if (email === "" || password === "") {
                  toast.error("Enter all credentials !", {

                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined
                  });
                  return;
            }
            params.append('username', email);
            params.append('password', password);

            setAllComponentsLoaded(false)
            Promise.all([
                  axios.post('http://localhost:5000/auth/login', params.toString(), {
                        headers: {
                              'Content-Type': 'application/x-www-form-urlencoded',
                        },
                  })]).then((response) => {
                        const { access_token } = response[0].data;

                        localStorage.setItem('access_token', access_token);

                        console.log('Access Token stored:', localStorage.getItem('access_token'));

                        toast.success("Login Successful !", {
                              position: "bottom-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined
                        });
                        setAllComponentsLoaded(true);
                        Promise.all([
                              axios.get('http://localhost:5000/users', {
                                    headers: {
                                          Authorization: `Bearer ${access_token}`
                                    }
                              })]).then((response) => {
                                    console.log("sd");

                                    if (response[0].status == 200) {
                                          router.push("/admin")
                                    }
                                    else {

                                    }

                              }
                              ).catch((error) => {
                                    if (error.response.data.detail == "Insufficicent Permissions") {
                                          router.push("/dashboard")
                                    }
                                    else {
                                          setAllComponentsLoaded(true);
                                    }

                              });


                  }
                  ).catch((error) => {
                        setAllComponentsLoaded(true);
                        toast.error("Invalid Credentials!", {

                              position: "bottom-right",
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined
                        });
                  });

      };
      useEffect(() => {
            // Simulate loading of components or content
            Promise.all([
                  // Simulate async loading, e.g., fetching data or waiting for images to load
                  new Promise((resolve) => setTimeout(resolve, 1000)), // Placeholder for actual loading logic
                  new Promise((resolve) => setTimeout(resolve, 1500)), // Adjust times based on your needs
                  // Add more promises for other components or content
            ]).then(() => {
                  setAllComponentsLoaded(true);
            });
      }, []);

      if (!allComponentsLoaded) {
            return (
                  <div className="w-full h-screen flex flex-col justify-center items-center">
                        <ToastContainer />
                        <ReactLoading type={"cylon"} height={100} width={100} />
                  </div>
            );
      }
      return (
            <div className="w-full min-h-screen flex flex-col justify-center items-center z-10 pt-[20%]">
                  <ToastContainer />
                  <div className="w-[45%] h-full  bg-[#ffffff09] rounded-xl m-10  bottom-1 border-white min-w-[300px] backdrop-blur-lg  py[200px] flex flex-col justify-center items-center pt-[2%] ">
                        <img src="/Image/LogoEco.png" className="w-[280px] mt-[-30px]" alt="" />
                        <div className="text-white font-rocknroll text-[30px] mt-[-15%] font-bold">
                              Hey,it's good to see you again!
                        </div>
                        <div className="text-[20px] mt-3 font-normal font-sans text-white">
                              Please enter your credentials to continue
                        </div>
                        <div className="w-[400px] mt-[30px] flex flex-col text-[#ffffff] font-bold text-[18px] justify-center items-start">
                              <div className="font-sans text-[#fff9] text-sm">Username</div>
                              <Input
                                    size="large"
                                    placeholder="Enter your username or email"
                                    className="custom-input mt-3"
                                    prefix={<CiUser />}
                                    value={email}
                                    onChange={handleEmailChange}

                              />
                              <div className="font-sans mt-3 text-[#fffefe99]  text-sm">Password</div>
                              <Input
                                    size="large"
                                    type="password"
                                    placeholder="Enter your password"
                                    className="custom-input  mt-3"
                                    prefix={<CiLock />}
                                    value={password}
                                    onChange={handlePasswordChange}
                              />
                              <div className="w-full mt-5">
                                    <Button onClick={handleLogin} variant="contained" className="w-full " >
                                          <div className="text-lg font-sans tracking-tighter font-bold ">
                                                LOGIN
                                          </div>
                                    </Button>
                              </div>
                              <SignUpCTA />
                        </div>
                  </div>

            </div>
      );
}


export default Login;
