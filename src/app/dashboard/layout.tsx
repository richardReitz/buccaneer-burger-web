import { ReactNode } from "react";
import Header from "./components/Headers";


export default function LayoutDashboard({ children }: { children: ReactNode }) {

    return (
        <>
            <Header />
            {children}
        </>
    )
}