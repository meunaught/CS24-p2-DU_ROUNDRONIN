import Link from "next/link";
import React from "react";
import Button from "@mui/material/Button";


const NavBar = () => {
      return (
            <div className="h-[18vh] w-[100vw] top-0 border-b-[1px] bg-[#0f1521b6] border-[#ffffff35] z-[1000] fixed z-[1000]">
                  <div className="w-full h-full flex flex-row justify-center items-center">
                        <div className="w-[20%] pl-[2%] h-full flex flex-col justify-center items-center">
                              <img className="h-[80%] " src="/Image/logofigma.png" alt="logo" />
                        </div>
                        <div className="w-[40%]  max-xl:w-[38%] h-full align-middle flex flex-col gap-1 justify-start mt-[2%] items-center">
                              <div className=" font-rocknroll text-center text-white whitespace-nowrap  text-[35px] max-xl:text-[30px] max-lg:text-[25px]">Waste Management System</div>
                              <div className="  font-rocknroll text-center text-white whitespace-nowrap text-[25px] max-xl:text-[20px] max-lg:text-[18px]">Dhaka North City Corporation</div>
                        </div>
                        <div className="w-[40%] h-full flex flex-col justify-center items-center mr-5">
                              <ul className="w-full flex flex-row justify-around  text-white font-semibold text-[18px] items-center mr-[2%] text-[#ffffff89] no-underline">
                                    <li>
                                          <Link href="/#" className="text-[#ffffff89] no-underline">Home</Link>
                                    </li>
                                    <li>
                                          <Link href="/#" className="text-[#ffffff89] no-underline">About</Link>
                                    </li>
                                    <li>
                                          <Link href="/#" className="text-[#ffffff89] no-underline">Feature</Link>
                                    </li>
                                    <li>
                                          <Link href="/#" className="text-[#ffffff89] no-underline">Contact</Link>
                                    </li>
                                    <li>
                                          <Link href="/login">
                                                <Button variant="outlined">Login</Button>
                                          </Link>
                                    </li>
                              </ul>
                        </div>
                  </div>
            </div>
      );
};

export default NavBar;