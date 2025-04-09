"use client"

import { Check, FileWarning, X } from "lucide-react";
import { Order, OrderItem, ProductOrder } from "../types";
import { useEffect, useRef, useState } from "react";
import { getCookieClient } from "@/lib/cookieCliente";
import { api } from "@/services/api";
import { toast } from "sonner";
import { Button } from "@/components/Button";

type ModalOrderProps = {
    order: Order
    onClose: VoidFunction
}

export default function OrderDetailModal({ order, onClose }: ModalOrderProps) {
    const initialized = useRef<boolean>(false)
    const [orderDetail, setOrderDetail] = useState<OrderItem[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const handleFinishOrder = async () => {
        try {
            const token = await getCookieClient()

            await api.put(
                "/order/finish",
                {
                    order_id: order.id
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            toast.success("Pedido finalizado com sucesso!")
            onClose()
        } catch (err) {
            console.error(err)
            toast.warning("Erro ao finalizar pedido!")
        }
    }

    const getOrderDetail = async () => {
        setLoading(true)
        try {
            const token = await getCookieClient()

            const response = await api.get(
                "/order/detail",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    params: {
                        order_id: order.id
                    }
                },
            )
            setOrderDetail(response.data)
        } catch (err) {
            console.error(err)
            onClose()
            toast.warning("Erro ao visualizar pedido!")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true
            getOrderDetail()
        }
    },[initialized])

    const ProductItem = ({ product }: { product: ProductOrder, index: number }) => 
        <section key={product.id} className="flex flex-col mb-2 border rounded-lg p-2 gap-1">
            <div className="flex items-center justify-between">
                <span className="text-white text-base">
                   {product.quantity}x - <b>{product.name}</b>
                </span>
                <span className="text-white text-sm">
                    R$ {Number(product.price).toFixed(2).replace('.', ',')}
                </span>
            </div>
        </section>

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
            <div className="bg-gray-700 rounded-lg w-[600px] p-4 relative">
                <button
                    className="text-white absolute top-2 right-2 bg-transparent"
                    onClick={onClose}
                >
                    <X />
                </button>
                <section className="">
                    <div className="mb-6 text-gray-800">
                        <p className="text-lg font-bold mb-6 text-white">Detalhes do pedido</p>
                        <span className="border p-2 rounded-md text-sm font-semibold text-white">
                            Mesa {order.table}
                        </span>
                    </div>
                </section>

                {!!orderDetail.length ?
                    <>
                        {orderDetail.map(({ product, amount }, index) => 
                            <ProductItem key={product.id} index={index} product={{ ...product, quantity: amount } } />
                        )}
                        <form onSubmit={handleFinishOrder} className="mt-6">
                            {order.status ?
                                <div className="flex items-center gap-2">
                                    <p>
                                        Pedido finalizado
                                    </p>
                                    <Check size={18} />
                                </div>
                            :
                                <Button type="submit">
                                    <div className="flex items-center gap-1 text-xs p-2">
                                        Concluir pedido
                                        <Check size={18} />
                                    </div>
                                </Button>
                            }
                        </form>
                    </>
                :
                    loading ? 
                        <div className="mx-auto my-4 h-6 w-6 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"/>
                    :    
                        <div className="flex items-center gap-2 justify-center py-12 text-gray-600">
                            <FileWarning />
                            <span className="">Detalhe da ordem não encontrada!</span>
                        </div>
                }

            </div>
        </div>
    )
}