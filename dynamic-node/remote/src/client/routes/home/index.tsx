import loadable from '@loadable/component'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SidePanel } from '@alfalab/core-components/side-panel'

import c from '../../remote/styles.modules.css'
import { siteMap } from '../../utils/sitemap'

const LazyComponent = loadable(() => import('./components/modal-view'), {
  fallback: <div>loading content...</div>,
})

type Props = {
  content: string
}
export const HomePage = ({ content }: Props) => {
  const [open, setOpen] = useState(false)
  const [sidePanelOpen, setSidePanelOpen] = useState(false)

  const toggleSidePanel = () => {
    setSidePanelOpen(!sidePanelOpen)
  }

  return (
    <div style={{ padding: '1rem', borderRadius: '0.25rem', border: '4px dashed #228b22' }}>
      <h2 className={c.container}>App 2: home page 1</h2>
      <p>
        Custom text: <strong>{content}</strong>
      </p>
      <p>
        <Link to={siteMap.second}>second page</Link>
      </p>
      <p>
        <Link to={siteMap.carousel}>carousel page</Link>
      </p>

      <button onClick={toggleSidePanel}>open side panel</button>
      <button onClick={() => setOpen(!open)}>toggle lazy</button>
      {open && <LazyComponent />}

      <SidePanel onBackdropClick={toggleSidePanel} open={sidePanelOpen}>
        <SidePanel.Content>SidePanel.Content</SidePanel.Content>
      </SidePanel>
    </div>
  )
}
