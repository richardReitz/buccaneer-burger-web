"use client"

import { RefreshCcw, SearchX } from "lucide-react";
import OrderItem from "./OrderItem";
import { Order } from "../types";
import OrderDetailModal from "./OrderDetailModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
    ordersList: Order[]
    getFinishedOrders: () => Promise<Order[]>
}

export default function Orders({ ordersList, getFinishedOrders }: Props) {
    const router = useRouter()

    const [listType, setListType] = useState<'opened' | 'finished'>('opened');
    const [showModalDetail, setShowModalDetail] = useState<boolean>(false)
    const [orderDetail, setOrderDetail] = useState<Order | null>(null)
    const [finishedOrders, setFinishedOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState<boolean>(false);

    const orders = listType === 'opened' ? ordersList : finishedOrders

    const onCloseModal = (): void => {
        setOrderDetail(null)
        setShowModalDetail(false)
    }

    const handleSeeOrder = (order: Order): void => {
        setOrderDetail(order)
        setShowModalDetail(true)
    }

    const handleSeeFinishOrders = async () => {
        setListType('finished')

        console.log('finishedOrders: ', finishedOrders);
        if (!!finishedOrders.length) return
        
        setLoading(true)
        
        const orders = await getFinishedOrders()
        setFinishedOrders(orders)

        setLoading(false)
    }

    const handleRefresh = (): void => {
        router.refresh()
        setListType('opened')
        setFinishedOrders([])
        toast.success("Pedidos atualizados com sucesso!")
    }

    return (
        <>
            <main className="mt-4 max-w-3xl mx-auto px-6 md:px-4">
                <div className="w-full">
                    <div className="flex items-center gap-1 mb-1">
                        <p className="text-xl font-bold">Últimos pedidos</p>
                        <button onClick={handleRefresh} type="button" className="bg-transparent text-orange-primary">
                            <RefreshCcw size={22} /> 
                        </button>
                    </div>

                    <div className="flex gap-3 items-center mb-6 text-xs">
                        <button
                            className={`${listType === 'finished' && 'bg-transparent border border-gray-300'}`}
                            onClick={() => setListType('opened')}    
                        >
                            Em aberto
                        </button>
                        <button
                            className={`${listType === 'opened' && 'bg-transparent border border-gray-300'}`}
                            onClick={handleSeeFinishOrders}    
                        >
                            Finalizados
                        </button>
                    </div>

                    <section className="flex flex-col gap-2">
                        {loading ?
                            <div
                                className="h-5 w-5 border-2 border-orange-primary border-t-transparent rounded-full animate-spin self-center mt-2"
                            ></div>
                        :
                            !!orders.length ? 
                                orders.map((item) => (
                                    <OrderItem key={item.id} order={item} onClick={() => handleSeeOrder(item)} />
                                ))
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