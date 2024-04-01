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
import "./user.css"

interface User {
      id: number;
      name: string;
      email: string;
      phone: string;
}
const UserList = (props: { users: User[] }) => {
      return (
            <div className="w-full  min-h-screen flex flex-col justify-center items-center z-10 pt-[20%] ">
                  <div className={`w-full  h-full  m-10  bottom-1  min-w-[300px]  py[200px] flex flex-col justify-center items-center pt-[2%] `}>

                        <div className="text-white font-rocknroll text-[30px]  font-bold">
                              Users
                        </div>
                        <div className="w-[400px] mt-[30px] flex flex-col text-[#ffffff] font-bold text-[18px] justify-center items-start">
                              {props.users.map((user) => {
                                    return (
                                          <div key={user.id} className="w-full border-[#ffffff09] border-b-[1px] flex flex-row justify-between items-center py-[10px]">
                                                <div className="text-[#ffffff]">{user.name}</div>
                                                <div className="text-[#ffffff]">{user.email}</div>
                                                <div className="text-[#ffffff]">{user.phone}</div>
                                          </div>
                                    )
                              })}
                        </div>
                  </div>
            </div>
      )

}

const Usermanage = () => {
      const [allComponentsLoaded, setAllComponentsLoaded] = useState(false);
      const router = useRouter();
      const [users, setUsers] = useState([]);

      useEffect(() => {
            const token = localStorage.getItem('access_token');
            console.log(token);
            Promise.all([
                  axios.get('http://localhost:5000/users', {
                        headers: {
                              Authorization: `Bearer ${token}`
                        }
                  })]).then((response) => {

                        if (response[0].status == 200) {
                              setUsers(response[0].data);
                              console.log(response[0].data);

                              setAllComponentsLoaded(true);
                        }
                        else {

                        }

                  }
                  ).catch((error) => {
                        if (error.response.data.detail == "Insufficicent Permissions") {
                              router.push("/dashboard")
                        }
                        else {
                              router.push("/Home")
                        }

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
            <div className="w-full h-full flex flex-col justify-center items-center ml-[5%]">
                  <ToastContainer />
                  <div className="w-full  min-h-screen flex flex-col justify-center items-center z-10 pt-[20%] ">
                        <div className={`w-[60%]  h-full  bg-[#ffffff09] rounded-xl m-10  bottom-1 border-white min-w-[300px] backdrop-blur-lg  py[200px] flex flex-col justify-center items-center pt-[2%] `}>

                              <div className="text-white font-rocknroll text-[30px]  font-bold">
                                    Users
                              </div>
                              <div className="w-[400px] mt-[30px] flex flex-col text-[#ffffff] font-bold text-[18px] justify-center items-start">
                                    <UserList users={users} />
                              </div>
                        </div>


                  </div>

            </div>
      )
}

export default Usermanage;