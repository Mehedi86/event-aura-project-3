'use client'
import React, { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function ScrollTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true)
            }
            else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-full shadow-2xl hover:shadow-red-500/50 transition-all duration-300 hover:scale-110 active:scale-95 group border-2 backdrop-blur-sm cursor-pointer"
            aria-label="Scroll to top"
        >
            <div className="relative">
                <ArrowUp className="h-5 w-5 group-hover:-translate-y-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300 blur-md" />
            </div>
        </button>
    )
}