import { useEffect, useRef } from 'react'
import { BrowserRouter, StaticRouter } from 'react-router-dom'
import root from 'react-shadow'
import { useShadowLinks } from './hooks/use-shadow-links'

type Props = {
  children: any
  url: string
}

const IS_SSR = typeof window === 'undefined'

// export const AppMounter = ({ children, url }: Props) => {
//   if (IS_SSR) {
//     return <StaticRouter location={url}>{children}</StaticRouter>
//   }
//   return <BrowserRouter>{children}</BrowserRouter>
// }
// export const AppMounter = ({ children, url }: Props) => {
//   if (IS_SSR) {
//     return <StaticRouter location={url}>{children}</StaticRouter>
//   }
//   debugger
//   return (
//     <root.div className="client" id={'remote-id'} mode="open">
//       <BrowserRouter>{children}</BrowserRouter>
//     </root.div>
//   )
// }
export const AppMounter = ({ children, url }: Props) => {
  useShadowLinks()

  if (IS_SSR) {
    return (
      <root.div className="ssr" id={'remote-id'} mode="open" ssr={true}>
        <StaticRouter location={url}>{children}</StaticRouter>
      </root.div>
    )
  }

  return (
    <root.div className="client" id={'remote-id'} mode="open">
      <body>
        <BrowserRouter>{children}</BrowserRouter>
      </body>
    </root.div>
  )
}
