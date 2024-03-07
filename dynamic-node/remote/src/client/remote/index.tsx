import c from './styles.modules.css'
import loadable from '@loadable/component'

import { Switch, Route } from 'react-router-dom'
import { AppMounter } from '../components/mounter'

export interface ContentProps {
  content?: string
  url: string
}

const LazyComponent = loadable(() => import('../components/modal-view'), {
  fallback: <div>loading content...</div>,
})

const Remote: React.FC<ContentProps> = (props: ContentProps) => {
  console.log('🚀 ~ file: Content.tsx:8 ~ props', props)
  // const [open, setOpen] = useState(false)
  return (
    <AppMounter url={props.url}>
      <Switch>
        <Route path="/1">
          <div className={c.container} style={{ padding: '1rem', borderRadius: '0.25rem', border: '4px dashed #228b22' }}>
            <h2>App 2: 1 page</h2>
            <p>
              Custom text: <strong>{props.content}</strong>
            </p>

            {/* <button onClick={() => setOpen(!open)} /> */}
            <LazyComponent />
          </div>
        </Route>
        <Route path="/2">
          <div className={c.container} style={{ padding: '1rem', borderRadius: '0.25rem', border: '4px dashed #228b22' }}>
            <h2>App 2: 2 page</h2>
          </div>
        </Route>
      </Switch>
    </AppMounter>
  )
}

export default Remote
