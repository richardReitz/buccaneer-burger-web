import { PlusCircleIcon } from "lucide-react";
import CreateProductForm from "./components/CreateProductForm";
import { api } from "@/services/api";
import { getCookieServer } from "@/lib/cookieServer";

export default async function Product() {
    const token = await getCookieServer()
    const response = await api.get("/categories", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return (
        <main className="mt-4">
            <div className="max-w-3xl mx-auto px-4">
                <div className="flex items-center gap-2 mb-2">
                    <p className="text-xl font-bold">Novo produto</p>
                    <PlusCircleIcon size={22} className="text-orange-primary" /> 
                </div>

                <CreateProductForm categories={response.data} />
            </div>
        </main>
    )
}