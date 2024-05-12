import React from 'react'
import App from '../../client/root'

type Props = {
  url: string
  RemoteModule: any
  cssLinks: any
  jsLinks?: any
}

export const Html = ({ url, cssLinks, jsLinks, RemoteModule }: Props) => {
  return (
    <html>
      <head>
        {cssLinks.map(({ src }) => {
          return <link key={src} rel="stylesheet" href={src} />
        })}
      </head>
      <body>
        <div id="root">
          <App url={url} RemoteApp={RemoteModule} />
        </div>
      </body>
      {/* {jsLinks.map(({ src }) => {
        return <script async src={src} />
      })} */}
      <script async src="/static/index.js" />
      <script async src="http://localhost:8080/static/remoteEntry.js" />
    </html>
  )
}
