"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import ReactLoading from "react-loading";
const Logout = () => {

      const [allComponentsLoaded, setAllComponentsLoaded] = useState(false);


      return (
            <div className="w-screen min-h-screen left-0 top-0 bg-[#14193284] flex flex-col justify-center items-center z-10 ">
                  <div className="w-[45%] h-full  bg-[#0c188209]  rounded-xl m-10  bottom-1 border-white min-w-[300px] backdrop-blur-lg  py[200px] flex flex-col justify-center items-center  ">
                        <div className="text-white font-rocknroll text-[30px]  font-bold">
                              Are you sure you want to logout?
                        </div>
                  </div>

            </div>
      );

}

const Usernavbar = () => {
      const router = useRouter();
      return (
            <div className="h-[18vh] w-[100vw] top-0 border-b-[1px] bg-[#0f1521b6] border-[#ffffff35] z-[1000] fixed z-[1000]">
                  <div className="w-full h-full flex flex-row justify-center items-center">

                        <div className="w-[90%] pl-[10%]  max-xl:w-[80%] h-full align-middle flex flex-col gap-1 justify-start mt-[2%] items-center">
                              <div className=" font-rocknroll text-center text-white whitespace-nowrap  text-[35px] max-xl:text-[30px] max-lg:text-[25px]">Waste Management System</div>
                              <div className="  font-rocknroll text-center text-white whitespace-nowrap text-[25px] max-xl:text-[20px] max-lg:text-[18px]">Dhaka North City Corporation</div>
                        </div>
                        <div className="w-[10%] h-full flex flex-col justify-center items-center mr-[5%]">
                              <Link href="/">
                                    <Button onClick={() => {
                                          localStorage.removeItem("access_token");
                                          router.refresh();
                                    }} variant="outlined">Logout</Button>
                              </Link>
                        </div>
                  </div>
            </div>
      );
};

export default Usernavbar;