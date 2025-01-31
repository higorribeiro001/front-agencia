import { RowDrawerInterface } from "@/data/types";

export const RowDrawer = ({keyRow, value}: RowDrawerInterface) => {
    return (
        <div className="flex flex-row gap-2">
            <h3 className="font-semibold">{ keyRow }:</h3>
            <p>{ String(value).replace('.', ',') }</p>
        </div>
    );
}