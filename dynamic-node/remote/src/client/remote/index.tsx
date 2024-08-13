import styles from './styles.module.css'

import { Switch, Route, Link } from 'react-router-dom'
import { AppMounter } from '../components/mounter'
import { HomePage } from '../routes/home'
import { CarouselPage } from '../routes/carousel'
import { siteMap } from '../utils/sitemap'

import { Button } from '@alfalab/core-components/button'
export interface ContentProps {
  content?: string
  url: string
}

const Remote: React.FC<ContentProps> = (props: ContentProps) => {
  return (
    <AppMounter url={props.url}>
      <Button>test123</Button>
      <Switch>
        <Route exact path={siteMap.home}>
          <HomePage content={props.content} />
        </Route>
        <Route exact path={siteMap.carousel}>
          <CarouselPage />
        </Route>
        <Route exact path={siteMap.second}>
          <div className={styles.container} style={{ padding: '1rem', borderRadius: '0.25rem', border: '4px dashed #228b22' }}>
            <h2>App 2: 2 page</h2>
            <Link to="/">home redirect</Link>
          </div>
        </Route>
      </Switch>
    </AppMounter>
  )
}

export default Remote
