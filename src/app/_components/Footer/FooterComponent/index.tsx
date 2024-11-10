'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Footer, Media } from '../../../../payload/payload-types'
import { inclusions, noHeaderFooterUrls } from '../../../constants'
import { Button } from '../../Button'
import { Gutter } from '../../Gutter'

import classes from './index.module.scss'

const FooterComponent = ({ footer }: { footer: Footer }) => {
  const pathname = usePathname()
  const navItems = footer?.navItems || []

  return (
    <footer className={noHeaderFooterUrls.includes(pathname) ? classes.hide : ''}>
      <Gutter>
        <ul className={classes.inclusions}>
          {inclusions.map(inclusion => (
            <li key={inclusion.title}>
              <Image
                src={inclusion.icon}
                alt={inclusion.title}
                width={36}
                height={36}
                className={classes.icon}
              />

              <h5 className={classes.title}>{inclusion.title}</h5>
              <p>{inclusion.description}</p>
            </li>
          ))}
        </ul>
      </Gutter>

      <div className={classes.footer}>
        <Gutter>
          <div className={classes.wrap}>
            <Link href="/">
              <Image src="/logo-white.svg" alt="logo" width={170} height={50} />
            </Link>

            {/* copyright varsa göster */}
            <p>{footer?.copyright || '© 2024 My Company'}</p>

            <div className={classes.socialLinks}>
              {navItems.map((item, index) => {
                const iconUrl = item?.link?.icon?.url

                return (
                  <Button
                    key={index}
                    el="link"
                    href={item?.link?.url || '#'}
                    newTab={true}
                    className={classes.socialLinkItem}
                  >
                    {iconUrl && (
                      <Image
                        src={iconUrl}
                        alt={item?.link?.label || 'Social link'}
                        width={24}
                        height={24}
                        className={classes.socialIcon}
                      />
                    )}
                  </Button>
                )
              })}
            </div>
          </div>
        </Gutter>
      </div>
    </footer>
  )
}

export default FooterComponent
