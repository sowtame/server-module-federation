import loadable from '@loadable/component'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import c from '../../remote/styles.modules.css'

const LazyComponent = loadable(() => import('./components/modal-view'), {
  fallback: <div>loading content...</div>,
})

type Props = {
  content: string
}
export const HomePage = ({ content }: Props) => {
  const [open, setOpen] = useState(false)

  return (
    <div className={c.container} style={{ padding: '1rem', borderRadius: '0.25rem', border: '4px dashed #228b22' }}>
      <h2>App 2: home page 1</h2>
      <p>
        Custom text: <strong>{content}</strong>
      </p>
      <p>
        <Link to="/second">second page</Link>
      </p>

      <button onClick={() => setOpen(!open)}>toggle lazy</button>
      {open && <LazyComponent />}
    </div>
  )
}
