export const RowDrawer = ({keyRow, value, color, success, approved}: RowDrawerInterface) => {
    return (
        <div className="flex flex-row gap-2">
            <h3 className="font-semibold">{ keyRow }:</h3>
            {color ? (
                <div className="rounded px-2" style={success ? {color: 'green', backgroundColor: '#98FB98'} : approved ? {color: 'orange', backgroundColor: '#F0E68C'} : {color: 'red', backgroundColor: '#FFC0CB'}}>
                    <p>{ value }</p>
                </div>
            ) : (
                <p>{ value }</p>
            )}
        </div>
    );
}