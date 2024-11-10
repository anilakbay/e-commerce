'use client'

import { useEffect, useMemo } from 'react'
import classNames from 'classnames'
import { useSearchParams } from 'next/navigation'

import { Message } from '../Message'

import classes from './index.module.scss'

export type Props = {
  params?: string[]
  message?: string
  className?: string
  onParams?: (paramValues: (string | null | undefined)[]) => void
}

export const RenderParamsComponent: React.FC<Props> = ({
  params = ['error', 'warning', 'success', 'message'],
  className,
  onParams,
}) => {
  const searchParams = useSearchParams()

  // `useMemo` ile `paramValues`'un hesaplanması
  const paramValues = useMemo(
    () => params.map(param => searchParams?.get(param)),
    [searchParams, params],
  )

  useEffect(() => {
    if (paramValues.length && onParams) {
      onParams(paramValues)
    }
  }, [paramValues, onParams])

  if (!paramValues.some(value => value)) return null

  return (
    <div className={classNames(className, classes.renderParamsContainer)}>
      {paramValues.map((paramValue, index) =>
        paramValue ? (
          <Message
            className={classes.renderParams}
            key={params[index]}
            {...{ [params[index]]: paramValue }}
          />
        ) : null,
      )}
    </div>
  )
}
