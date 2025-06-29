export const Appbar = ({name}) => {
    return (
        <div className="font-semibold flex justify-between items-center rounded-md bg-zinc-300 w-full px-4 py-2">
            PayTM App
            <span className="flex items-center space-x-2">
                <p className="font-semibold">{name}</p>
                <div className="bg-slate-200 w-9 h-9 rounded-full leading-[36px] text-center">
                    U
                </div>
            </span>
        </div>
    )
}
