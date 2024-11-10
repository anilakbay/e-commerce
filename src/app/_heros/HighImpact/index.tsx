import React from 'react'

import { Page } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'
import { CMSLink } from '../../_components/Link'
import { Media } from '../../_components/Media'
import RichText from '../../_components/RichText'

import classes from './index.module.scss'

export const HighImpactHero: React.FC<Page['hero']> = ({ richText, media, links }) => {
  return (
    <Gutter className={classes.hero}>
      {/* Hero Content */}
      <div className={classes.content}>
        <RichText content={richText} />

        {/* Links List */}
        {Array.isArray(links) && links.length > 0 && (
          <ul className={classes.links}>
            {links.map(({ link }, index) => (
              <li key={index}>
                <CMSLink {...link} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Media Section */}
      <div className={classes.media}>
        {typeof media === 'object' && (
          <>
            <Media resource={media} imgClassName={classes.image} priority />
            {media.caption && <RichText content={media.caption} className={classes.caption} />}
          </>
        )}
      </div>
    </Gutter>
  )
}
