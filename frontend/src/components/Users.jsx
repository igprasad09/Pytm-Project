import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { useDebounce } from "./CostomHook"

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState('');
    const debouncedFilterValue = useDebounce(filter);
    useEffect(() => {
        axios.get("https://paytm-project-d2r3.onrender.com/api/v1/user/bulk?filter=" + filter, {
            headers: {
                authorization: localStorage.getItem('token'),
            }
        })
            .then(res => {
                setUsers(res.data.user);
            })
    }, [debouncedFilterValue])

    return (
        <div className="pl-5">
            <p className="font-bold">Users</p>
            <input
                type="text"
                onChange={(e) => {
                    setFilter(e.target.value);
                }}
                placeholder="Search users....."
                className=" border-1 w-full mb-2 h-8 rounded-sm pl-3 mt-2 border-neutral-300"
            />
            {users.map((user, index) => <User key={index} user={user} />)}
        </div>
    )
}

function User({ user }) {
    const navigate = useNavigate();
    function capitalizeName(name) {
        return name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }
    return (
        <div className="flex items-center justify-between pt-3">
            <span className=" flex items-center">
                <div className="bg-slate-200 w-9 h-9 font-semibold rounded-full leading-[36px] text-center">
                    {user.firstName[0].toUpperCase()}
                </div>
                <p className="pl-2 font-semibold text-neutral-800">{capitalizeName(user.firstName+' '+user.lastName)}</p>
            </span>
            <span className="">
                <button
                    className="bg-neutral-900 hover:bg-neutral-800 cursor-pointer text-white w-30 h-8 rounded-md font-semibold"
                    onClick={() => {
                        navigate('/send?id=' + user._id + '&name=' + user.firstName + '&lastname=' + user.lastName);
                    }}
                >Send Money</button>
            </span>
        </div>
    )
}

