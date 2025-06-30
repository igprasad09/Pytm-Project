import { useNavigate } from "react-router-dom";

export const Appbar = ({name}) => {
    const navigate = useNavigate();
    function handle_signout(){
        const answer = confirm('You want to sign out?');
        if(answer){
            localStorage.removeItem('token');
            navigate('/signin');
        }
    }
    return (
        <div className="font-semibold flex justify-between items-center rounded-md bg-zinc-300 w-full px-4 py-2">
            PayTM App
            <span className="flex items-center space-x-2">
                <p className="font-semibold">{name}</p>
                <div className="bg-slate-200 w-9 h-9 rounded-full leading-[36px] text-center">
                    {name?name[0].toUpperCase():'U'}
                </div>
                <button onClick={()=>{
                     handle_signout()
                }} className="text-[10px] bg-black w-15 h-5 rounded-sm cursor-pointer hover:bg-neutral-600 text-white">Sign out</button>
            </span>
        </div>
    )
}
