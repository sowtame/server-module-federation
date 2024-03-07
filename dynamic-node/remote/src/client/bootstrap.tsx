import { hydrateRoot } from 'react-dom/client'

import RootDev from './root'

const init = () => {
  hydrateRoot(document.getElementById('root'), <RootDev />)
}

init()
