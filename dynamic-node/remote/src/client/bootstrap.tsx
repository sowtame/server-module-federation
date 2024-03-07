import { hydrate } from 'react-dom'

import RootDev from './root'

const init = () => {
  hydrate(<RootDev />, document.getElementById('root'))
}

init()
