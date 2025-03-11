export default function RowInfo({title, info, color, success, approved}: RowInfo) {
    return (
        <div className="flex flex-row gap-1">
            <h4 className='font-semibold text-[14px] whitespace-nowrap'>{title}</h4>
            {color ? (
                <div className="rounded px-2" style={success ? {color: 'green', backgroundColor: '#98FB98'} : approved ? {color: 'orange', backgroundColor: '#F0E68C'} : {color: 'red', backgroundColor: '#FFC0CB'}}>
                    <p className="break-all text-justify text-[14px]">{info}</p>
                </div>
            ) : (
                <p className="break-all text-justify text-[14px]">{info}</p>
            )}
        </div>
    )
}