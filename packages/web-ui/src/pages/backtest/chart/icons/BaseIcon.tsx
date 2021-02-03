import { FC, DOMAttributes, useState } from "react";
import styled from "styled-components";
export interface BaseIconProps extends DOMAttributes<HTMLDivElement> {
    text: string;
}

export const BaseIcon: FC<BaseIconProps> = ({ children, text, ...props }) => {
    return (
        <div style={{ margin: "0px 5px" }} {...props}>
            {children}
        </div>
    );
};
