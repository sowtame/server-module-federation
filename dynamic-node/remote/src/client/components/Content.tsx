import React, { useState } from 'react'
import c from './styles.modules.css'
import loadable from '@loadable/component'

export interface ContentProps {
  content?: string
}

const LazyComponent = loadable(() => import('./modal-view'), {
  fallback: <div>loading content...</div>,
})

const Content: React.FC<ContentProps> = (props: ContentProps) => {
  console.log('🚀 ~ file: Content.tsx:8 ~ props', props)
  // const [open, setOpen] = useState(false)
  return (
    <div className={c.container} style={{ padding: '1rem', borderRadius: '0.25rem', border: '4px dashed #228b22' }}>
      <h2>App 2: Content</h2>
      <p>This is the content from app2.</p>
      <p>
        Custom text: <strong>{props.content}</strong>
      </p>

      {/* <button onClick={() => setOpen(!open)} /> */}
      <LazyComponent />
    </div>
  )
}

export default Content
