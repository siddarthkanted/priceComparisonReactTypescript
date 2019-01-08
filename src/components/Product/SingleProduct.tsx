import * as React from "react";

interface ISingleProductProps {
    // tslint:disable:react-unused-props-and-state
    data: any;
}

export const SingleProduct: React.SFC<ISingleProductProps> = (props: ISingleProductProps) => {
    const { data } = props;
    return (
        <div>
            {data}
        </div>
    );
};