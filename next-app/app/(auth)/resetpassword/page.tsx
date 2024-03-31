'use client';
import "./resetpassword.css";
import { Input } from "antd";
import ReactLoading from 'react-loading';
import { CiLock } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import Button from '@mui/material/Button';
import { CiUser } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Router } from "next/router";


const SignUpCTA = () => {
      const router = useRouter();
      const handleForgotPasswordClick = () => {

      };
      return (
            <div className="flex mb-5 mt-2  flex-col justify-center w-[400px] items-center">
                  <div className="flex flex-row justify-between items-center gap-[70px] mt-5 mb-5 w-full">
                        <div
                              className="text-white text-[15px] font-semibold font-sans cursor-pointer whitespace-nowrap"
                              onClick={() => { router.push("/login") }}
                        >
                              <span className="text-indigo-500">Login</span>
                        </div>

                  </div>
                  <div className="flex-row flex justify-center items-center mt-6 w-full gap-14">

                  </div>
            </div>
      );
};
const Resetpassword = () => {
      const [otp, setOtp] = useState(false);
      const router = useRouter();
      const SignUpOTP = () => {
            const handleForgotPasswordClick = () => {

            };
            return (
                  <div className="flex mb-5 mt-2  flex-col justify-center w-[400px] items-center">
                        <div className="flex flex-row justify-between items-center gap-[70px] mt-5 mb-5 w-full">
                              <div
                                    className="text-white text-[15px] font-semibold font-sans cursor-pointer whitespace-nowrap"
                                    onClick={() => { setOtp(false) }}
                              >
                                    <span className="text-indigo-500">Back</span>
                              </div>

                        </div>
                        <div className="flex-row flex justify-center items-center mt-6 w-full gap-14">

                        </div>
                  </div>
            );
      };

      const OTP = () => {

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
                  <div className="w-screen min-h-screen left-0 top-0 bg-[#14193284] flex flex-col justify-center items-center z-10 ">
                        <div className="w-[45%] h-full  bg-[#0c188209]  rounded-xl m-10  bottom-1 border-white min-w-[300px] backdrop-blur-lg  py[200px] flex flex-col justify-center items-center  ">
                              <div className="text-white font-rocknroll text-[30px]  font-bold">
                                    OTP Verification
                              </div>
                              <div className="w-[400px] mt-[30px] flex flex-col text-[#ffffff] font-bold text-[18px] justify-center items-start">
                                    <div className="font-sans text-[#fff9] text-sm">OTP</div>
                                    <Input
                                          size="large"
                                          placeholder="Enter OTP"
                                          className="custom-input mt-3"
                                          prefix={<CiLock />}

                                    />

                                    <div className="w-full mt-5">
                                          <Button onClick={() => { router.push('/newpassword') }} variant="contained" className="w-full ">
                                                <div className="text-lg font-sans tracking-tighter font-bold ">
                                                      Verify OTP
                                                </div>
                                          </Button>
                                    </div>
                                    <SignUpOTP />
                              </div>
                        </div>

                  </div>
            );

      }

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
            <div className="w-full  min-h-screen flex flex-col justify-center items-center z-10 pt-[20%] ">
                  <div className={`w-[45%]  h-full  bg-[#ffffff09] rounded-xl m-10  bottom-1 border-white min-w-[300px] backdrop-blur-lg  py[200px] flex flex-col justify-center items-center pt-[2%] ${otp ? 'blur-2xl' : ''}`}>
                        <div className="text-white font-rocknroll text-[30px]  font-bold">
                              Reset Password
                        </div>
                        <div className="w-[400px] mt-[30px] flex flex-col text-[#ffffff] font-bold text-[18px] justify-center items-start">
                              <div className="font-sans text-[#fff9] text-sm">Email</div>
                              <Input
                                    size="large"
                                    placeholder="Enter your Email"
                                    className="custom-input mt-3"
                                    prefix={<CiUser />}

                              />

                              <div className="w-full mt-5">
                                    <Button onClick={() => { setOtp(true) }} variant="contained" className="w-full ">
                                          <div className="text-lg font-sans tracking-tighter font-bold ">
                                                Reset Password
                                          </div>
                                    </Button>
                              </div>
                              <SignUpCTA />
                        </div>
                  </div>

                  {otp ? <div className={` absolute w-screen  h-screen `}>
                        <OTP />
                  </div> : null}
            </div>
      );
}

export default Resetpassword;
