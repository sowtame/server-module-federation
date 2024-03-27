import { hydrateRoot } from 'react-dom/client'

import App from './root'
import { loadWmfComponent } from './utils/load-wmf-component'

const init = async () => {
  const RemoteApp = await loadWmfComponent('app2', './desktop')

  hydrateRoot(document.getElementById('root'), <App RemoteApp={RemoteApp.default} />)
}

init()

// window.addEventListener('load', init)

document.addEventListener('DOMContentLoaded', () => {
  console.log(1)
})
