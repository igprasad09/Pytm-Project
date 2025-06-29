export const InputBox = ({Label, placeholder, onChange}) => {
    return (
        <>
            <p className="font-semibold pt-3 text-neutral-900 pl-5">{Label}</p>
            <input
                type="text"
                required
                onChange={onChange}
                placeholder={placeholder}
                className="border-1 ml-5 w-88 pl-3 h-9 rounded-sm mt-2 border-zinc-300"
            />
        </>
    )
}