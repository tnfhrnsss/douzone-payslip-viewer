import React from "react"
import { useMediaQuery } from "react-responsive"

export const Mobile = (props: { children: React.ReactNode }): JSX.Element => {
    const isMobile = useMediaQuery({
        query: "(max-width: 767px)"
    });
    return <>{isMobile && props.children}</>
};

export const Pc = (props: { children: React.ReactNode }): JSX.Element => {
    const isPc = useMediaQuery({
        query: "(min-width: 1024px) and (max-width: 1279px)"
    });
    return <>{isPc && props.children}</>
}

export default function useWindowSize() {
    if (typeof window !== "undefined") {
        return { width: 1200, height: 800 };
    }
}