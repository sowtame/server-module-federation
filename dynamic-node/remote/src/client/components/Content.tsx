import React from 'react'
import c from './styles.modules.css'

export interface ContentProps {
  content?: string
}

const Content: React.FC<ContentProps> = (props: ContentProps) => {
  console.log('🚀 ~ file: Content.tsx:8 ~ props', props)
  return (
    <div
      className={c.container}
      style={{ padding: '1rem', borderRadius: '0.25rem', border: '4px dashed #228b22' }}
      data-e2e="APP_2_CONTENT_BLOCK"
    >
      <h2>App 2: Content</h2>
      <p>This is the content from app2.</p>
      <p>
        Custom text: <strong>{props.content}</strong>
      </p>
    </div>
  )
}

export default Content
