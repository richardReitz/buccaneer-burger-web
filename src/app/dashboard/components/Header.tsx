"use client"

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import logoImage from '@/assets/buccaneerburger-logo.png'
import Link from "next/link";
import { LogOutIcon, MenuIcon, XIcon } from "lucide-react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function Header() {
    const router = useRouter()

    const dropdownRef = useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = React.useState(false)

    const closeMenu = () => setIsOpen(false)

    const handleLogout = () => {
        deleteCookie("session", { path: "/" })
        router.replace("/")
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                event.target instanceof Node &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false)
            }
        }
    
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const NavMenu = (): React.JSX.Element =>
        <nav ref={dropdownRef} className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <Link href="/dashboard/category" className="hover:text-gray-300 text-sm sm:text-base p-2 sm:p-0" onClick={closeMenu}>
                Categorias
            </Link>
            <Link href="/dashboard/product" className="hover:text-gray-300 text-sm sm:text-base p-2 sm:p-0" onClick={closeMenu}>
                Produtos
            </Link>
            <form action={handleLogout}>
                <button type="submit" className="flex gap-2 text-sm py-1 items-center bg-transparent text-white hover:text-gray-300">
                    <p className="sm:hidden">
                        Sair
                    </p>
                    <LogOutIcon size={22} />
                </button>
            </form>
        </nav>

    return (
        <header className="w-full">
            <div className="flex items-center justify-between max-w-3xl px-6 md:px-4 py-2 mx-auto" >
                <Link href="/dashboard">
                    <Image
                        src={logoImage}
                        alt="logo buccaneer burger"
                        className="w-[6rem] sm:w-[8rem] md:w-[8rem]"
                        priority
                    />
                </Link>

            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="sm:hidden bg-transparent pr-0"
            >
                {isOpen ? <XIcon size={22} /> : <MenuIcon size={22} />}
            </button>

                <div className="hidden sm:flex items-center gap-4">
                    <NavMenu />
                </div>
            </div>

            {/* Menu mobile dropdown */}
            {isOpen && (
                <div
                    className="absolute right-4 bg-gray-700 rounded shadow-lg p-2 z-50 animate-fade-in"
                >
                    <NavMenu />
                </div>
            )}
        </header>
    )
}