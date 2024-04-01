'use client';
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import Dashboard from "./Dashboard/page";

export default function admin() {

      const [allComponentsLoaded, setAllComponentsLoaded] = useState(false);
      const router = useRouter();





      return (
            <>
                  <Dashboard />
            </>
      );
}
