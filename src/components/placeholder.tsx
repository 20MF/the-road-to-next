import React, {cloneElement} from "react";
import {LucideMessageSquareWarning} from "lucide-react";

type labelProps = {
    label: string,
    icon?: React.ReactElement,
    button?: React.ReactElement
}
const Placeholder = ({
                         label,
                         icon = <LucideMessageSquareWarning/>,
                         button = <div/>,
                     }: labelProps) => {
    return (
        <div className="flex-1 self-center flex flex-col items-center justify-center gap-y-2">
            {icon}
            {/*cloneElement用来覆盖原元素的尺寸*/}
            {/*{cloneElement(icon, {*/}
            {/*    className: "w-16 h-16",*/}
            {/*})}*/}
            <h2 className="text-lg text-center">{label}</h2>
            {/*{cloneElement(button, {*/}
            {/*    className: 'h-10',*/}
            {/*})}*/}
        </div>
    )
}

export {Placeholder}