import axios from "axios"
import { useEffect, useState } from "react"
import {useNavigate} from 'react-router-dom'

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('');
    useEffect(()=>{
         axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter,{
            headers:{
                authorization: localStorage.getItem('token'),
            }
         })
         .then(res => {
              setUsers(res.data.user);
         })
    },[filter])

    return (
        <div className="pl-5">
            <p className="font-bold">Users</p>
            <input
                type="text"
                onChange={(e)=>{
                     setFilter(e.target.value);
                }}
                placeholder="Search users....."
                className=" border-1 w-full mb-2 h-8 rounded-sm pl-3 mt-2 border-neutral-300"
            />
            {users.map((user, index )=> <User key={index} user={user}/>)}
        </div>
    )
}

function User({ user }) {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-between pt-3">
            <span className=" flex items-center">
                <div className="bg-slate-200 w-9 h-9 font-semibold rounded-full leading-[36px] text-center">
                    H
                </div>
                <p className="pl-2 font-semibold text-neutral-800">{user.firstName} {user.lastName}</p>
            </span>
            <span className="">
                 <button 
                 className="bg-neutral-900 hover:bg-neutral-800 cursor-pointer text-white w-30 h-8 rounded-md font-semibold"
                 onClick={()=>{
                     navigate('/send?id='+user._id+'&name='+user.firstName+'&lastname='+user.lastName);
                 }}
                 >Send Money</button>
            </span>
        </div>
    )
}