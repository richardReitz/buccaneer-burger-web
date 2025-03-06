"use client"

import type { Order } from "../types";

export default function OrderItem({ order, onClick }: { order: Order; onClick: VoidFunction }) {
    return (
        <div onClick={onClick} className="bg-gray-600 rounded-md cursor-pointer hover:opacity-85">
            <div className="flex items-center gap-4">
                <div className="w-2 h-12 bg-green-primary rounded-md rounded-tr-none rounded-br-none" />
                <p className="font-semibold">Mesa {order.table}</p>
            </div>
        </div>
    )
}