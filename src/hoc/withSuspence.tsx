import React, { ComponentType, Suspense } from "react";

type InjectedPropsType = any

export function withSuspense<PropsType>(Component: ComponentType<PropsType>) {
    function SuspenseComponent(props: InjectedPropsType) {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <Component {...props as PropsType}/>
            </Suspense>
        );
    }
    return <SuspenseComponent />;
}
