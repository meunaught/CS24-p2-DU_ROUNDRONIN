'use client';
import "./resetpassword.css";
import { Input } from "antd";
import ReactLoading from 'react-loading';
import { CiLock } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CiUser } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


const Newpassword = () => {



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
                  <ToastContainer />
                  <div className={`w-[45%]  h-full  bg-[#ffffff09] rounded-xl m-10  bottom-1 border-white min-w-[300px] backdrop-blur-lg  py[200px] flex flex-col justify-center items-center pt-[2%] `}>
                        <div className="text-white font-rocknroll text-[30px]  font-bold">
                              New Password
                        </div>
                        <div className="w-[400px] mt-[30px] flex flex-col text-[#ffffff] font-bold text-[18px] justify-center items-start">
                              <div className="font-sans text-[#fff9] text-sm">Enter new password</div>
                              <Input
                                    size="large"
                                    type="password"
                                    placeholder="Enter your password"
                                    className="custom-input mt-2"
                                    prefix={<CiLock />}

                              />

                              <div className="font-sans mt-3 text-[#fff9] text-sm">Confirm Password</div>
                              <Input
                                    size="large"
                                    type="password"
                                    placeholder="Enter your password again"
                                    className="custom-input mt-2"
                                    prefix={<CiLock />}

                              />

                              <div className="w-full my-5">
                                    <Button onClick={() => {
                                          toast.success("Success Notification !", {

                                                position: "bottom-right",
                                                autoClose: 5000,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined
                                          });
                                    }} variant="contained" className="w-full ">
                                          <div className="text-lg font-sans tracking-tighter font-bold ">
                                                Update
                                          </div>
                                    </Button>
                              </div>
                        </div>
                  </div>


            </div >
      );
}

export default Newpassword;
