"use client"

import { RefreshCcw, SearchX } from "lucide-react";
import OrderItem from "./OrderItem";
import { Order } from "../types";
import OrderDetailModal from "./OrderDetailModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Orders({ ordersList }: { ordersList: Order[] }) {
    const router = useRouter()

    const [showModalDetail, setShowModalDetail] = useState<boolean>(false)
    const [orderDetail, setOrderDetail] = useState<Order | null>(null)

    const onCloseModal = (): void => {
        setOrderDetail(null)
        setShowModalDetail(false)
    }

    const handleSeeOrder = (order: Order): void => {
        setOrderDetail(order)
        setShowModalDetail(true)
    }

    const handleRefresh = (): void => {
        router.refresh()
        toast.success("Pedidos atualizados com sucesso!")
    }

    return (
        <>
            <main className="mt-4 max-w-3xl mx-auto px-4">
                <div className="w-full">
                    <div className="flex items-center gap-1 mb-2">
                        <p className="text-xl font-bold">Últimos pedidos</p>
                        <button onClick={handleRefresh} type="button" className="bg-transparent text-green-primary">
                            <RefreshCcw size={22} /> 
                        </button>
                    </div>

                    <section className="flex flex-col gap-2">
                        {!!ordersList.length ? 
                            ordersList.map((item) => 
                                <OrderItem key={item.id} order={item} onClick={() => handleSeeOrder(item)} />
                            )
                        :
                        <div className="mt-2 flex items-center gap-2 text-gray-400 font-light">
                            <SearchX size={20}/>
                            <p className="text-sm">Nenhum pedido em aberto no momento...</p>
                        </div>
                    }
                    </section>
                </div>
            </main>
                
            {orderDetail && showModalDetail && 
                <OrderDetailModal order={orderDetail} onClose={onCloseModal} />
            }
        </>
    )
}