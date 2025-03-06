"use client"

import Image from "next/image";
import logoImage from '@/assets/buccaneerburger-logo.png'
import Link from "next/link";
import { LogOutIcon } from "lucide-react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter()

    const handleLogout = () => {
        deleteCookie("session", { path: "/" })
        router.replace("/")
    }

    return (
        <header className="w-full">
            <div className="flex items-center justify-between max-w-[1280px] px-4 py-2 mx-auto">
                <Link href="/dashboard">
                    <Image
                        src={logoImage}
                        alt="logo buccaneer burger"
                        className="w-[8rem] sm:w-[10rem] md:w-[12rem]"
                        priority
                    />
                </Link>
                <nav className="flex items-center gap-4">
                    <Link href="/dashboard/category" className="hover:text-gray-300">
                        Categorias
                    </Link>
                    <Link href="/dashboard/product" className="hover:text-gray-300">
                        Produtos
                    </Link>

                    <form action={handleLogout}>
                        <button type="submit" className="bg-transparent text-white hover:text-gray-300">
                            <LogOutIcon size={22} />
                        </button>
                    </form>
                </nav>
            </div>
        </header>
    )
}