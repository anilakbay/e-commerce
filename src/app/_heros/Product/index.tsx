import React from 'react'

import { Category, Product } from '../../../payload/payload-types'
import { AddToCartButton } from '../../_components/AddToCartButton'
import { Gutter } from '../../_components/Gutter'
import { Media } from '../../_components/Media'
import { Price } from '../../_components/Price'

import classes from './index.module.scss'

export const ProductHero: React.FC<{ product: Product }> = ({ product }) => {
  const { title, categories, meta: { image: metaImage, description } = {} } = product

  return (
    <Gutter className={classes.productHero}>
      <div className={classes.mediaWrapper}>
        {metaImage ? (
          typeof metaImage !== 'string' && (
            <Media imgClassName={classes.image} resource={metaImage} fill />
          )
        ) : (
          <div className={classes.placeholder}>No image</div>
        )}
      </div>

      <div className={classes.details}>
        <h3 className={classes.title}>{title}</h3>

        <div className={classes.categoryWrapper}>
          <div className={classes.categories}>
            {categories?.map((category, index) => {
              // category, string veya Category türünde olabilir, buna göre kontrol yapıyoruz
              const categoryTitle =
                typeof category === 'string' ? category : category?.title || 'Generic'
              return (
                <span key={index} className={classes.category}>
                  {categoryTitle}
                  {index < categories.length - 1 && ', '}
                </span>
              )
            })}
          </div>
          <p className={classes.stock}>In stock</p>
        </div>

        <Price product={product} button={false} />

        {description && (
          <div className={classes.description}>
            <h6>Description</h6>
            <p>{description}</p>
          </div>
        )}

        <AddToCartButton product={product} className={classes.addToCartButton} />
      </div>
    </Gutter>
  )
}
