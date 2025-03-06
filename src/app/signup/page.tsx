import Image from "next/image";
import Link from "next/link";
import logoImage from '@/assets/buccaneerburger-logo.png'
import { api, ApiError } from "@/services/api";
import { redirect } from "next/navigation";
import { Button } from "@/components/Button";

export default function Home() {
    const handleRegisterUser = async (formData: FormData) => {
        "use server"

        const name = formData.get("name")
        const email = formData.get("email")
        const password = formData.get("password")

        if (!name || !password || !email) return

        try {
            await api.post("/users", {
                name,
                email,
                password
            })

        } catch (err) {
            return console.error('err: ', (err as never as ApiError).response.data)
        }
        
        redirect("/")
    }
  
    return (
        <div className="flex flex-col gap-2 items-center justify-center min-h-[100vh]">
            <Image
                src={logoImage}
                alt="logo buccaneer burger"
                className="w-[19rem] sm:w-[24rem] md:w-[28rem]"
            />

            <section className="w-[260px] sm:w-[320px] md:w-[400px]">
                <form action={handleRegisterUser} className="flex flex-col gap-4">
                    <input
                        required
                        type="email"
                        name="email"
                        placeholder="Digite seu email"
                    />
                    <input
                        required
                        type="text"
                        name="name"
                        placeholder="Digite seu nome"
                    />
                    <input 
                        required
                        type="password"
                        name="password"
                        placeholder="Digite sua senha"
                    />

                    <Button type="submit">
                        Cadastrar-se
                    </Button>
                </form>

                <div className="text-center mt-4">
                    <Link href="/">
                        Já possui conta? <span className="font-semibold">Entrar</span>
                    </Link>
                </div>
            </section>
        </div>
    );
}
