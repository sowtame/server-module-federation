import { hydrateRoot } from 'react-dom/client'

import App from './root'
// import { importRemote } from '@module-federation/utilities'
import { loadWmfComponent } from './utils/load-wmf-component'

const init = async () => {
  // await importRemote({
  //   url: 'http://localhost:8080/static',
  //   scope: 'app2',
  //   module: './desktop',
  //   bustRemoteEntryCache: false,
  // })

  await loadWmfComponent('app2', './desktop')

  hydrateRoot(document.getElementById('root'), <App />)
}

init()

// window.addEventListener('load', init)

document.addEventListener('DOMContentLoaded', () => {
  debugger
  console.log(1)
})
