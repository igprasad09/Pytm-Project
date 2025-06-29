import { useState } from "react";
import { SendMoney } from "../components/SendMoney";
import {useSearchParams} from 'react-router-dom'

export default function Send() {
  const [searchParams] = useSearchParams();
  const [userData, setuserData] = useState({
      firstname: searchParams.get('name'),
      lastname: searchParams.get('lastname'),
      id: searchParams.get('id')
  });
  return (
    <div className="bg-gray-100 h-screen w-full grid justify-center items-center">
         <SendMoney firstname={userData.firstname} lastname={userData.lastname} />
    </div>
  )
}
