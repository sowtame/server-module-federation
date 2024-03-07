import React from 'react'
import { hydrate } from 'react-dom'
import { loadableReady } from '@loadable/component'

import RootDev from './root'

loadableReady(() => {
  hydrate(<RootDev />, document.getElementById('root'))
})
