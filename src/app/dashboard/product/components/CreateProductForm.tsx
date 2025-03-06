"use client"

import Image from "next/image";
import { Button } from "@/components/Button";
import { getCookieClient } from "@/lib/cookieCliente";
import { api } from "@/services/api";
import { ImageDown } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

type CategoryType = {
    id: string
    name: string
}

export default function CreateProductForm({ categories }: { categories: CategoryType[] }){
    const [imagePreview, setImagePreview] = useState<string>('')
    const [image, setImage] = useState<File>()

    const handleCreateCategory = async (formData: FormData) => {
        const categoryIndex = formData.get("category")
        const name = formData.get("name")
        const price = formData.get("price")
        const description = formData.get("description")

        if (!categoryIndex || !name || !price || !image) {
            toast.warning("Preencha todos os campos!")
            return 
        }

        const data = new FormData()

        data.append("name", name)
        data.append("price", price)
        data.append("description", description ?? '')
        data.append("category_id", categories[Number(categoryIndex)].id)
        data.append("file", image)

        const token = await getCookieClient()

        await api.post("/product", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .catch((err) => {
            console.error(err)
            toast.warning("Erro ao criar produto")
        })
        .then(() => {
            toast.success("Produto criado com sucesso")
            setImagePreview('')
        })
    }
  
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0]

        if (!["image/png", "image/jpeg"].includes(file.type)) {
            toast.warning("Formato de imagem não compatível!")
            setImagePreview('')
            return
        }
  
        const reader = new FileReader()
        reader.onloadend = () => {
            setImagePreview(reader.result as string)
            setImage(file)
        }
        reader.readAsDataURL(file)
      }
    }

    return (
        <form action={handleCreateCategory} className="flex flex-col gap-3">
            <label className="w-full h-64 relative border border-gray-600 rounded-md flex items-center justify-center cursor-pointer">
                <ImageDown />
                <input
                    type="file"
                    accept="image/png, image/jpg"
                    name="image"
                    onChange={handleImageChange}
                    className="hidden"
                />
                {!!imagePreview &&
                    <Image
                        alt="image preview"
                        src={imagePreview}
                        fill
                        priority
                        quality={100}
                    />
                }
            </label>

            <select name="category">
                {(categories ?? []).map((item, index) =>
                    <option key={item.id} value={index}>
                        {item.name}
                    </option>
                )}
            </select>

            <input
                type="text"
                name="name"
                placeholder="Digite o nome do produto..."
            />

            <input
                type="text"
                name="price"
                placeholder="Digite o preço do produto..."
            />

            <textarea
                name="description"
                placeholder="Digite a descrição do produto..."
            />

            <Button type="submit">
                Criar produto
            </Button>
        </form>
    )
}