import { BrowserRouter, StaticRouter } from 'react-router-dom'

type Props = {
  children: any
  url: string
}

const IS_SSR = typeof window === 'undefined'

export const AppMounter = ({ children, url }: Props) => {
  if (IS_SSR) {
    return <StaticRouter location={url}>{children}</StaticRouter>
  }
  return <BrowserRouter>{children}</BrowserRouter>
}
