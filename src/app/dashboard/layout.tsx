import { ReactNode } from "react";
import Header from "./components/Header";


export default function LayoutDashboard({ children }: { children: ReactNode }) {

    return (
        <>
            <Header />
            {children}
        </>
    )
}