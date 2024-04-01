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
//............



import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
//............

const role = ['Unassigned', 'Admin', 'STS Manager', 'Landfill Manager'

];

interface User {
      id: number;
      name: string;
      email: string;
      phone_number: string;
      role_id: number;
}
const UserList = (props: { users: User[] }) => {
      return (


            <div className="w-full h-full px-[1%] mt-[30px] flex flex-col text-[#ffffff]  font-rocknroll font-bold text-[18px] justify-center items-start gap-3 mb-5 ">
                  {props.users.map((user) => {
                        return (
                              <div key={user.id} className="w-full bg-[#110a2bd8] shadow-md  border-[#ffffff09] p-[3%] py-4 rounded-sm  border-2 flex flex-row justify-between items-center py-[10px] cursor-pointer">
                                    <div className="text-[#ffffff] text-justify w-full">{user.name}</div>
                                    <div className="text-[#ffffff] text-justify w-full">{user.email}</div>
                                    <div className="text-[#ffffff] w-full text-right">{role[user.role_id - 1000]}</div>
                              </div>
                        )
                  })}
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
            <div className="w-full h-fit flex flex-col justify-center items-center ml-[5%]">
                  <ToastContainer />
                  <div className=" w-full h-fit flex flex-col justify-center items-center z-10 pt-[20%] ">

                        <div className="w-[70%] h-fit ml-[10%]  h-full  bg-[#ffffff09] rounded-xl m-10  border-white min-w-[300px] backdrop-blur-lg   flex flex-col justify-start items-center pt-[2%] mt-[10%] ">

                              <div className="text-white font-rocknroll text-[30px] mt-5  font-bold">
                                    Users
                              </div>
                              <div className="w-full h-full mt-[30px] flex flex-col text-[#ffffff] font-bold text-[18px] justify-center items-start  mb-[5%]">
                                    <UserList users={users} />
                              </div>
                        </div>


                  </div>

            </div>
      )
}

export default Usermanage;