'use client';
import Button from '@mui/material/Button';
import { CiUser } from "react-icons/ci";
import { Input } from "antd";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import ReactLoading from 'react-loading';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Createuser = () => {
      const [allComponentsLoaded, setAllComponentsLoaded] = useState(false);
      const [email, setEmail] = useState("")
      const [name, setName] = useState("")
      const [phone, setPhone] = useState("")
      const router = useRouter();


      const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
      };
      const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
      };
      const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            setPhone(event.target.value);
      };
      return (
            <div className="w-full h-full flex flex-col justify-center items-center ml-[5%]">
                  <ToastContainer />
                  <div className="w-full  min-h-screen flex flex-col justify-center items-center z-10 pt-[20%] ">
                        <div className={`w-[45%]  h-full  bg-[#ffffff09] rounded-xl m-10  bottom-1 border-white min-w-[300px] backdrop-blur-lg  py[200px] flex flex-col justify-center items-center pt-[2%] `}>

                              <div className="text-white font-rocknroll text-[30px]  font-bold">
                                    Create a new user
                              </div>
                              <div className="w-[400px] mt-[30px] flex flex-col text-[#ffffff] font-bold text-[18px] justify-center items-start">
                                    <div className="font-sans text-[#fff9] text-sm">Name</div>
                                    <Input
                                          size="large"
                                          placeholder="Enter user's name"
                                          className="custom-input mt-3"
                                          prefix={<CiUser />}
                                          onChange={handleNameChange}
                                          value={name}

                                    />
                                    <div className="font-sans text-[#fff9] text-sm mt-3">Email</div>
                                    <Input
                                          size="large"
                                          placeholder="Enter user's Email"
                                          className="custom-input mt-3"
                                          prefix={<MdEmail />}
                                          onChange={handleEmailChange}
                                          value={email}

                                    />
                                    <div className="font-sans text-[#fff9] text-sm mt-3">Phone Number</div>
                                    <Input
                                          size="large"
                                          placeholder="Enter user's Phone Number"
                                          className="custom-input mt-3"
                                          prefix={<FaPhoneAlt />}
                                          onChange={handlePhoneChange}
                                    />


                                    <div className="w-full my-5">
                                          <Button variant="contained" className="w-full " onClick={handleSubmit}>
                                                <div className="text-lg font-sans tracking-tighter font-bold ">
                                                      Create User
                                                </div>
                                          </Button>
                                    </div>
                              </div>
                        </div>


                  </div>

            </div>
      )
}

export default Createuser;