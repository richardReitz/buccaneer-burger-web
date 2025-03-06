import { getCookieServer } from "@/lib/cookieServer";
import Orders from "./components/Orders";
import { api } from "@/services/api";

async function getOrders() {
    try {
        const token = await getCookieServer()
        const { data } = await api.get("/orders", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return data || []
    } catch (err) {
        console.log(err)
        return []
    }
}

export default async function Dashboard() {
    const ordersList = await getOrders()
    return (
        <>
            <Orders ordersList={ordersList} />
        </>
    )
}
