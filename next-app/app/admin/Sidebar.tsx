'use client';
import { MdDashboard } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { GiNuclearWaste } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import "./admin.css"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const Sidebar = () => {
      const router = useRouter()
      const [open, setOpen] = useState(false)
      const handlebackclick = () => {
            setOpen(!open)
      }

      useEffect(() => {
            const Drawer = document.getElementById("drawer")
            if (open) {
                  Drawer?.classList.remove("close-drawer")
                  Drawer?.classList.add("open-drawer")
            } else {
                  Drawer?.classList.remove("open-drawer")
                  Drawer?.classList.add("close-drawer")
            }
      }
            , [open])
      return (
            <div id="drawer" className="h-[100vh] w-[20vw] bg-[#091223] fixed z-[10000]">
                  <div className="w-full h-full flex flex-col justify-start items-start  pt-[10%]">
                        <div className="w-[80%] pl-[5%] cursor-pointer" onClick={() => { router.push("/") }}>
                              <img src="/Image/adminlogo.png" alt="" />

                        </div>
                        <div className="absolute text-white left-[80%] top-[5%] cursor-pointer" onClick={handlebackclick}>
                              {!open ? <FaChevronLeft /> : <FaChevronRight />}
                        </div>
                        <div className="text-[23px] max-xl:text-[20px] max-lg:text-[19px] text-white mt-[15%] font-rocknroll pl-[10%] whitespace-nowrap" >
                              Galib Mahmud Jim
                              <div className="w-full flex flex-col  text-[20px] justify-center items-center">
                                    <div className="text-[20px] text-white mt-[3%] font-rocknroll " >
                                          Admin
                                    </div>
                              </div>
                        </div>

                        <div className="w-full justify-start items-center flex-col  ">
                              <div className="w-full border-t-[1px] border-[#f7f5f531] pl-[10%] mt-[25%] ">
                                    <div className="text-[18px] text-white pt-2  font-rocknroll w-full justify-start items-center flex-row flex gap-3 hoverdraw  " >
                                          <MdDashboard />
                                          <div>Dashboard</div>
                                    </div>
                              </div>
                              <div className="w-full border-t-[1px] border-[#f7f5f531] pl-[10%] ">
                                    <div className="text-[18px] text-white pt-2  font-rocknroll w-full justify-start items-center flex-row flex gap-3 hoverdraw  " onClick={() => {
                                          router.push("/admin/create-user")
                                    }}>
                                          <FaRegUser />
                                          <div>Create User</div>
                                    </div>
                              </div>
                              <div className="w-full border-t-[1px] border-[#f7f5f531] pl-[10%] " onClick={() => {
                                    router.push("/admin/Usermanagement")
                              }}>
                                    <div className="text-[18px] text-white pt-2  font-rocknroll w-full justify-start items-center flex-row flex gap-3 hoverdraw  " >
                                          <FaUsers />
                                          <div>User Management</div>
                                    </div>
                              </div>
                              <div className="w-full border-t-[1px] border-[#f7f5f531] pl-[10%] ">
                                    <div className="text-[18px] text-white pt-2  font-rocknroll w-full justify-start items-center flex-row flex gap-3 hoverdraw   " >
                                          <GiNuclearWaste />
                                          <div>STS</div>
                                    </div>
                              </div>
                              <div className="w-full border-t-[1px] border-[#f7f5f531] pl-[10%] ">
                                    <div className="text-[18px] text-white pt-2  font-rocknroll w-full justify-start items-center flex-row flex gap-3 hoverdraw  " >
                                          <FaTruck />
                                          <div>Vehicle</div>
                                    </div>
                              </div>

                        </div>



                  </div>
            </div >
      )
}

export default Sidebar