export default function RowInfo({title, info}: RowInfo) {
    return (
        <div className="flex flex-row gap-1">
            <h4 className='font-semibold text-[14px] whitespace-nowrap'>{title}</h4>
            <p className="break-all text-justify text-[14px]">{info}</p>
        </div>
    )
}