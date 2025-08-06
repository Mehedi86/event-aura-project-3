'use client'

import React, { useEffect, useState } from 'react'
import CategoryBox from '../shared/CategoryBox';

export default function EventCategory() {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch("/data/categories.json");
            const data = await res.json();
            setCategories(data);
        }
        fetchCategories();
    }, [])

    console.log(categories)
    return (
        <div className='w-11/12 lg:w-4/5 mx-auto my-20'>
            <h1 className='text-2xl font-semibold pl-6 border-l-4 border-red-600 my-12'>Event Category</h1>
            <div className='grid grid-cols-3 gap-4'>
                {categories.map(category => <CategoryBox
                    key={category.id}
                    category={category}
                />)}
            </div>
        </div>
    )
}
