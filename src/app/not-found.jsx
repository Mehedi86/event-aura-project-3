import Image from 'next/image'
import React from 'react'

export default function NotFoundPage404() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
            <div className="w-full max-w-3xl">
                <Image
                    src="/img/error/not-found.svg"
                    alt="error"
                    width={1440}
                    height={600}
                    className="w-full h-auto"
                />
            </div>
        </div>
    )
}

