'use client'

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'

// Context veri yapısını tanımlıyoruz
interface FilterContextType {
  categoryFilters: string[]
  setCategoryFilters: Dispatch<SetStateAction<string[]>>
  sort: string
  setSort: Dispatch<SetStateAction<string>>
}

// Başlangıç verileri
const defaultFilterValues: FilterContextType = {
  categoryFilters: [],
  setCategoryFilters: () => {},
  sort: '-createdAt',
  setSort: () => {},
}

// Context'i oluşturuyoruz
const FilterContext = createContext<FilterContextType>(defaultFilterValues)

// Provider, context verilerini uygulama geneline sunar
export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [categoryFilters, setCategoryFilters] = useState<string[]>([])
  const [sort, setSort] = useState<string>('-createdAt')

  return (
    <FilterContext.Provider value={{ categoryFilters, setCategoryFilters, sort, setSort }}>
      {children}
    </FilterContext.Provider>
  )
}

// Context verilerine erişim için hook
export const useFilter = () => useContext(FilterContext)
