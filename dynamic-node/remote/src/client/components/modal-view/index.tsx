import React, { useState } from 'react'
import c from './styles.modules.css'

import loadable from '@loadable/component'

const LazyNestedComponent = loadable(() => import('../nested/lazy'), {
  fallback: <div>loading content...</div>,
})

type Props = {}

const LazyComponent = ({}: Props) => {
  return (
    <div>
      <div className={c.container}>lazy green</div>
      <LazyNestedComponent />
    </div>
  )
}

export default LazyComponent
