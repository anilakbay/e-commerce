import React from 'react'

import { Page } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'
import { CMSLink } from '../../_components/Link'
import { Media } from '../../_components/Media'
import RichText from '../../_components/RichText'

import classes from './index.module.scss'

export const MediumImpactHero: React.FC<Page['hero']> = ({ richText, media, links }) => {
  return (
    <Gutter className={classes.hero}>
      <div className={classes.background}>
        <RichText className={classes.richText} content={richText} />

        {Array.isArray(links) && links.length > 0 && (
          <ul className={classes.links}>
            {links.map(({ link }, index) => (
              <li key={index}>
                <CMSLink className={classes.link} {...link} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {media && (
        <div className={classes.media}>
          {typeof media === 'object' ? (
            <Media className={classes.mediaContent} resource={media} />
          ) : (
            <div className={classes.mediaPlaceholder}>No media available</div>
          )}
        </div>
      )}
    </Gutter>
  )
}
