import React from 'react'

import { BrowserRouter, StaticRouter } from 'react-router-dom'

type Props = {
  children: any
}

const IS_SSR = typeof window === 'undefined'

export const AppMounter = ({ children }: Props) => {
  if (IS_SSR) {
    return <StaticRouter location={'/about/'}>{children}</StaticRouter>
  }
  return <BrowserRouter>{children}</BrowserRouter>
}
