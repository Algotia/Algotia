import { FC, DOMAttributes, useState } from "react";
export interface BaseIconProps extends DOMAttributes<HTMLDivElement> {
    text: string;
    color: string;
}

export const BaseIcon: FC<BaseIconProps> = ({
    children,
    text,
    color,
    ...props
}) => {
    return (
        <div style={{ margin: "0px 5px" }} {...props}>
            <svg viewBox="0 0 30 30" height="28" width="30" fill={color}>
                {children}
            </svg>
        </div>
    );
};
