import c from './styles.modules.css'

import { Switch, Route, Link } from 'react-router-dom'
import { AppMounter } from '../components/mounter'
import { Button } from '@alfalab/core-components/button'
import { Typography } from '@alfalab/core-components/typography'
import { HomePage } from '../routes/home'
import { CarouselPage } from '../routes/carousel'
import { siteMap } from '../utils/sitemap'

export interface ContentProps {
  content?: string
  url: string
}

const Remote: React.FC<ContentProps> = (props: ContentProps) => {
  return (
    <AppMounter url={props.url}>
      <Switch>
        <Route exact path={siteMap.home}>
          <HomePage content={props.content} />
        </Route>
        <Route exact path={siteMap.carousel}>
          <CarouselPage />
        </Route>
        <Route exact path={siteMap.second}>
          <div className={c.container} style={{ padding: '1rem', borderRadius: '0.25rem', border: '4px dashed #228b22' }}>
            <Typography.Title tag="h2"> App 2: 2 page</Typography.Title>
            <Button>@alfalab/core-components/button</Button>
            <Link to="/">home redirect</Link>
          </div>
        </Route>
      </Switch>
    </AppMounter>
  )
}

export default Remote
