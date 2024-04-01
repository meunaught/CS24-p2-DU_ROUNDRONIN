'use client';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import Dashboard from "./Dashboard/page";

export default function admin() {

      const [allComponentsLoaded, setAllComponentsLoaded] = useState(false);
      const router = useRouter();

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
                              setAllComponentsLoaded(true);
                        }
                        else {

                        }

                  }
                  ).catch((error) => {
                        if (error.response.data.detail == "Insufficicent Permissions") {
                              router.push("/user")
                        }
                        else {
                              router.push("/Home")
                        }

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
            <>
                  <Dashboard />
            </>
      );
}
