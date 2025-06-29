export const Button = ({Label, onClick}) => {
     return (
        <button onClick={onClick} className="bg-black text-white ml-5 w-88 rounded-md h-10 mt-3 font-semibold hover:bg-neutral-800">{Label}</button>
     )
}