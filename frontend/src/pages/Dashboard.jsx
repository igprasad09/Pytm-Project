import { useEffect } from "react";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [amount, setAmount] = useState();
  const navigate = useNavigate();
  useEffect(()=>{
       if(localStorage.getItem('token') == null){
          alert('First signin/signup');
          navigate('/signup');
       }
  })
  useEffect(()=>{
       axios.get("http://localhost:3000/api/v1/account/balance",{
          headers:{
              authorization: localStorage.getItem('token'),
          }
       }).then(res => {
            setAmount(res.data.balance);
       })
  })
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-7xl pt-15">
        <Appbar name={'hello'}/>
        <Balance amount={amount}/>
        <Users/>
      </div>
    </div>
  )
}