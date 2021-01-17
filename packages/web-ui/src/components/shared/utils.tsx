import { Skeleton as OSkeleton, SkeletonProps } from "@material-ui/lab";
import { FC } from "react";
import styled from "styled-components";

const Row = styled.div`
    display: flex;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
`;

interface BaseProps extends SkeletonProps {
    show?: any;
}

const Skeleton: FC<BaseProps> = (props) => {
    const { show = false, children, ...skeletonProps } = props;
    return (
        <>
            {show ? (
                <>{children}</>
            ) : children ? (
                <OSkeleton animation={false} {...skeletonProps}>
                    {children}
                </OSkeleton>
            ) : (
                <OSkeleton animation={false} {...skeletonProps} />
            )}
        </>
    );
};

export { Row, Column, Skeleton };
