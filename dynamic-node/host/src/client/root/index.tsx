import { useState } from 'react'
import loadable from '@loadable/component'
import { Typography } from '@alfalab/core-components/typography'

const LazyLoadable = loadable(() => import('../components/lazy'))

import { useDidMount, useToggle } from 'rooks'

const App = ({ RemoteApp, url }) => {
  const [state, setState] = useState<string>('11')

  const [open, toggle] = useToggle(true)

  useDidMount(() => {
    console.log('useDidMount root')
  })

  return (
    <div
      style={{
        padding: '1rem',
        borderRadius: '0.25rem',
        border: '4px dashed #fc451e',
      }}
    >
      <div style={{ padding: '1rem' }}>
        <Typography.Title tag="h1">Module Federation Example: Server Side Rendering</Typography.Title>

        <h2>This is the App 1 application.</h2>

        <p>You can try to disable JavaScript and reload the page.</p>
      </div>

      <div style={{ padding: '1rem' }}>
        <h3>Type something into this input</h3>
        <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="Luke, I am your father..." />
      </div>

      <div style={{ padding: '1rem' }}>{RemoteApp && <RemoteApp content={state} url={url} />}</div>

      <Typography.Text>Hello world</Typography.Text>
      <Typography.Text onClick={() => toggle()}>Hello world</Typography.Text>

      {open && <LazyLoadable />}
    </div>
  )
}

export default App
