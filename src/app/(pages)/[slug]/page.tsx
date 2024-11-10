import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

// Sayfa tipi için PageType adını kullanalım
import type { Page as PageType } from '../../../payload/payload-types'
import { Category } from '../../../payload/payload-types'
import { staticHome } from '../../../payload/seed/home-static'
import { fetchDoc } from '../../_api/fetchDoc'
import { fetchDocs } from '../../_api/fetchDocs'
import { Blocks } from '../../_components/Blocks'
import Categories from '../../_components/Categories'
import { Gutter } from '../../_components/Gutter'
import { Hero } from '../../_components/Hero'
import Promotion from '../../_components/Promotion'
import { generateMeta } from '../../_utilities/generateMeta'

import classes from './index.module.scss'

export const dynamic = 'force-dynamic' // Payload Cloud CDN için dinamik önbellekleme

// Sayfa verilerini sunucu tarafında yükle
async function loadPageData(slug: string, isDraftMode: boolean): Promise<PageType | null> {
  try {
    const page = await fetchDoc<PageType>({ collection: 'pages', slug, draft: isDraftMode })
    return page || (slug === 'home' ? staticHome : null)
  } catch (error) {
    console.error('Sayfa verileri alınırken hata oluştu:', error)
    return slug === 'home' ? staticHome : null
  }
}

// Kategori verilerini sunucu tarafında yükle
async function loadCategories(): Promise<Category[]> {
  try {
    return await fetchDocs<Category>('categories')
  } catch (error) {
    console.error('Kategori verileri alınırken hata oluştu:', error)
    return []
  }
}

// Ana sayfa içeriği
function HomeContent({ hero, categories }: { hero: any; categories: Category[] }) {
  return (
    <section>
      <Hero {...hero} />
      <Gutter className={classes.home}>
        <Categories categories={categories} />
        <Promotion />
      </Gutter>
    </section>
  )
}

// Sayfa içeriği
function PageContent({ hero, layout }: { hero: any; layout: any }) {
  return (
    <>
      <Hero {...hero} />
      <Blocks
        blocks={layout}
        disableTopPadding={!hero || hero?.type === 'none' || hero?.type === 'lowImpact'}
      />
    </>
  )
}

// Sayfa bileşeni (sunucu tarafında veri çekme)
export default async function PageComponent({ params: { slug = 'home' } }) {
  const isDraftMode = draftMode().isEnabled
  const page = await loadPageData(slug, isDraftMode)
  const categories = await loadCategories()

  if (!page) return notFound()

  return slug === 'home' ? (
    <HomeContent hero={page.hero} categories={categories} />
  ) : (
    <PageContent hero={page.hero} layout={page.layout} />
  )
}

// Statik parametreler
export async function generateStaticParams() {
  try {
    const pages = await fetchDocs<PageType>('pages')
    return pages.map(({ slug }) => slug)
  } catch {
    return []
  }
}

// Metadata oluşturma
export async function generateMetadata({ params: { slug = 'home' } }): Promise<Metadata> {
  const page = await loadPageData(slug, draftMode().isEnabled)
  return generateMeta({ doc: page })
}
