'use client'
import React from 'react'
import Link from 'next/link'

import { Category } from '../../../../payload/payload-types'
import { useFilter } from '../../../_providers/Filter' // '.ts' veya '.tsx' uzantısını ekleyin

import classes from './index.module.scss'

// Media tipini belirtiyoruz; eğer tanımlı değilse bunu projede tanımlamalıyız
type Media = {
  url: string
}

type CategoryCardProps = {
  category: Category & { media?: Media } // media alanının opsiyonel olduğunu belirttik
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const media = category.media as Media // `media` alanı mevcut değilse hata vermesini önlemek için
  const { setCategoryFilters } = useFilter()

  return (
    <Link
      href="/products"
      className={classes.card}
      style={{ backgroundImage: `url(${media?.url ?? ''})` }} // media alanının opsiyonel olduğunu göz önünde bulunduruyoruz
      onClick={() => setCategoryFilters([category.id])}
    >
      <p className={classes.title}>{category.title}</p>
    </Link>
  )
}

export default CategoryCard
