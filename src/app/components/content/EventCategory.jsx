'use client'

import React, { useEffect, useState } from 'react'
import CategoryBox from '../shared/CategoryBox'

export default function EventCategory() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('/data/categories.json')
      const data = await res.json()
      setCategories(data)
    }
    fetchCategories()
  }, [])

  return (
    <div className="w-11/12 lg:w-4/5 mx-auto my-10 sm:my-16 md:my-20">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="w-1 h-5 bg-orange-500 inline-block"></span>
        EVENT CATEGORIES
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {categories.map((category) => (
          <CategoryBox key={category.id} category={category} />
        ))}
      </div>
    </div>
  )
}
