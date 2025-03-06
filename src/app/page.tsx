import Image from "next/image";
import Link from "next/link";
import logoImage from '@/assets/buccaneerburger-logo.png'
import { api, ApiError } from "@/services/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Button } from "@/components/Button";

export default function Home() {
	const handleLogin = async (formData: FormData) => {
		"use server"
		
		const email = formData.get("email")
		const password = formData.get("password")
		
		if (!password || !email) return
		
		try {
			const response = await api.post("/session", {
				email,
				password
			})
			
			if (!response.data.token) return
			
			const expressTime = 60 * 60 * 24 * 30 * 1000
			const cookieStore = await cookies()
			
			cookieStore.set("session", response.data.token, {
				maxAge: expressTime,
				httpOnly: false,
				path: "/",
				secure: process.env.NODE_ENV === 'production'
			})
		} catch (err) {
			const error = err as ApiError
			return console.error(error.response)
		}
		
		redirect("/dashboard")
	}
	
	return (
		<div className="flex flex-col gap-2 items-center justify-center min-h-[100vh]">
			<Image
				src={logoImage}
				alt="logo buccaneer burger"
                className="w-[19rem] sm:w-[24rem] md:w-[28rem]"
			/>
		
			<section className="w-[260px] sm:w-[320px] md:w-[400px]">
				<form action={handleLogin} className="flex flex-col gap-4">
					<input
						required
						type="email"
						name="email"
						placeholder="Digite seu email"
					/>
					<input 
						required
						type="password"
						name="password"
						placeholder="Digite sua senha"
					/>
					
					<Button type="submit">
						Entrar
					</Button>
				</form>
			
				<div className="text-center mt-4">
					<Link href="/signup">
						Não possui uma conta? <span className="font-semibold">Cadastre-se</span>
					</Link>
				</div>
			</section>
		</div>
	)
}
