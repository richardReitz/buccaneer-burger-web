export type Order = {
    id: string
    table: number
    draft: boolean
    status: boolean
    name?: string
    created_at: string
    updated_at: string
}

export type ProductOrder = {
    id: string
    name: string
    price: string
    description: string
    category_id: string
    banner?: string
    created_at: string
    quantity?: number
}

export type OrderItem = {
    id: string
    amount: number
    created_at: string
    order: Order
    product: ProductOrder
}

