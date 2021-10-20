import React, { Suspense } from "react";

export const withSuspense = (Component) => {
    const SuspenseComponent = (props) => {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <Component {...props}/>
            </Suspense>
        );
    }
    return <SuspenseComponent/>;
}
