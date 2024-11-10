'use client'

import React from 'react'
import Link from 'next/link'

import { Header as HeaderType } from '../../../../payload/payload-types' // HeaderType olarak tip import edildi
import { useAuth } from '../../../_providers/Auth' // useAuth hook'u import edildi
import { Button } from '../../Button' // Button bileşeni import edildi
import { CartLink } from '../../CartLink' // CartLink bileşeni import edildi
import { CMSLink } from '../../Link' // CMSLink bileşeni import edildi

import classes from './index.module.scss' // CSS modülü import edildi

// HeaderNav bileşeni tanımlandı, props olarak HeaderType tipi olan header alınır.
export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  // header'dan navItems alınır, varsa boş bir dizi atanır.
  const navItems = header?.navItems || []

  // useAuth hook'u ile kullanıcı bilgisi alınır
  const { user } = useAuth()

  return (
    // Navigasyon menüsü başlatılır. Eğer kullanıcı yoksa navigasyon gizlenir.
    <nav className={[classes.nav, user === undefined && classes.hide].filter(Boolean).join(' ')}>
      {/* navigation item'ları döngü ile oluşturuluyor */}
      {navItems.map(({ link }, i) => {
        // CMSLink bileşeni her bir navItem için render edilir.
        return <CMSLink key={i} {...link} appearance="none" />
      })}
      {/* Sepet linki her zaman render edilir */}
      <CartLink />
      {/* Eğer kullanıcı varsa 'Account' linki gösterilir */}
      {user && <Link href="/account">Account</Link>}
      {/* Eğer kullanıcı yoksa 'Login' butonu gösterilir */}
      {!user && (
        <Button
          el="link"
          href="/login"
          label="Login"
          appearance="primary"
          onClick={() => (window.location.href = '/login')}
        />
      )}
      {/* Eğer kullanıcı varsa CartLink tekrar gösterilir */}
      {user && <CartLink />}
    </nav>
  )
}
