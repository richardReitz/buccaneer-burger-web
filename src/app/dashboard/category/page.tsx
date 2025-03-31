import { Button } from "@/components/Button";
import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/api";
import { PlusCircleIcon } from "lucide-react";

export default function Category() {
    const handleCreateCategory = async (formData: FormData) => {
        "use server"

        const category = formData.get("category")

        if (!category) return

        const token = await getCookieServer()

        try {
            await api.post(
                "/category",
                {
                    name: category
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <main className="mt-4">
            <div className="max-w-3xl mx-auto px-4">
                <div className="flex items-center gap-2 mb-2">
                    <p className="text-xl font-bold">Nova categoria</p>
                    <PlusCircleIcon size={22} className="text-orange-primary" /> 
                </div>

                <form action={handleCreateCategory} className="flex flex-col gap-2">
                    <input
                        required
                        type="text"
                        name="category"
                        placeholder="Digite seu nome"
                    />

                    <Button>
                        Criar
                    </Button>
                </form>
            </div>
        </main>
    )
}