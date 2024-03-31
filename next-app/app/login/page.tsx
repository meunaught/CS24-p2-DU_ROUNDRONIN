'use client';
import "./login.css";
import { Input } from "antd";
import ReactLoading from 'react-loading';
import { CiLock } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import Button from '@mui/material/Button';
import { CiUser } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useEffect, useState } from "react";
const SignUpCTA = () => {
      const handleForgotPasswordClick = () => { };
      return (
            <div className="flex mb-5 mt-2  flex-col justify-center w-[400px] items-center">
                  <div className="flex flex-row justify-between items-center gap-[70px] mt-5 mb-5 w-full">
                        <div
                              className="text-white text-[15px] font-semibold font-sans cursor-pointer whitespace-nowrap"
                              onClick={handleForgotPasswordClick}
                        >
                              Forgot password?
                        </div>

                  </div>
                  <div className="flex-row flex justify-center items-center mt-6 w-full gap-14">

                  </div>
            </div>
      );
};
const Oauth = () => {
      return (
            <Button
                  variant="outlined"
                  className="w-full border-shade-200 w-[400px] shadow-sm text-shade-700 mt-4 py-10"
            >
                  Login with google
            </Button>
      );
};
const Login = () => {

      const [allComponentsLoaded, setAllComponentsLoaded] = useState(false);

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
                        <ReactLoading type={"cylon"} height={100} width={100} />
                  </div>
            );
      }
      return (
            <div className="w-full min-h-screen flex flex-col justify-center items-center z-10 pt-[20%]">
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
                                    placeholder="Enter your username"
                                    className="custom-input mt-3"
                                    prefix={<CiUser />}

                              />
                              <div className="font-sans mt-3 text-[#fffefe99]  text-sm">Password</div>
                              <Input
                                    size="large"
                                    type="password"
                                    placeholder="Enter your email"
                                    className="custom-input  mt-3"
                                    prefix={<CiLock />}
                              />
                              <div className="w-full mt-5">
                                    <Button variant="contained" className="w-full ">
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
