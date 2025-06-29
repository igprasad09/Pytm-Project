import { Link } from "react-router-dom"

export const ButtonWarning = ({Label, ButtonLabel, to}) => {
     return (
        <p className="text-center mb-5 font-semibold pt-4 text-neutral-700">{Label}<Link to={to} className=" underline text-neutral-900">{ButtonLabel}</Link></p>
     )
}