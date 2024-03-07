import React from 'react'
import { Helmet } from 'react-helmet'

import Remote from '../remote'

const RootDev = () => {
  const [state, setState] = React.useState<string>('')

  return (
    <div
      style={{
        padding: '1rem',
        borderRadius: '0.25rem',
        border: '4px dashed #fc451e',
      }}
    >
      <Helmet>
        <title>SSR MF Example</title>
      </Helmet>
      <div style={{ padding: '1rem' }}>
        <h1>Module Federation Example: Server Side Rendering</h1>

        <h2>This is the App 2 application.</h2>

        <p>You can try to disable JavaScript and reload the page.</p>
      </div>

      <div style={{ padding: '1rem' }}>
        <h3>Type something into this input</h3>
        <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="Luke, I am your father..." />
      </div>

      <div style={{ padding: '1rem' }}>
        <Remote content={state} />
      </div>
    </div>
  )
}

export default RootDev
