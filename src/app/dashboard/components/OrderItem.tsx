"use client"

import dayjs from "dayjs";
import type { Order } from "../types";

export default function OrderItem({ order, onClick }: { order: Order; onClick: VoidFunction }) {
    const createdDate = dayjs(order.status ? order.updated_at : order.created_at).format('hh:mm')
    return (
        <div onClick={onClick} className="bg-gray-700 rounded-md cursor-pointer hover:opacity-85">
            <div className="flex items-center gap-4">
                <div className="w-2 h-12 bg-orange-primary rounded-md rounded-tr-none rounded-br-none" />
                <div className="flex items-center justify-between w-full pr-4">
                    <p className="font-semibold">Mesa {order.table}</p>
                    <p className="font-light text-sm text-gray-300">
                        {order.status ? 'Finalizado' : 'Retirado'} às: {createdDate}h
                    </p>
                </div>
            </div>
        </div>
    )
}