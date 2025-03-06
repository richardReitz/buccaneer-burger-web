"use client"

import { useFormStatus } from "react-dom"

export type ButtonProps = {
    loading?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button: React.FC<ButtonProps> = ({ loading, children, ...rest }) => {
    const { pending } = useFormStatus()

    return (
      <button
        {...rest}
        disabled={loading || pending}
        className="relative px-4 py-2 rounded-md flex items-center justify-center h-10"
      >
        {loading || pending ? (
          <div className="h-5 w-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
        ) : (
          children
        )}
      </button>
    )
}