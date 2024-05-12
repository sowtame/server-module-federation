import React from 'react'
import fs from 'fs'
import App from '../../client/root'

type Props = {
  url: string
  RemoteModule: any
  cssLinks: any
  jsLinks?: any
}

const initAssetsRetry = `window.assetsRetryStatistics = window.assetsRetry({ domain: {'http://localhost:8081': 'http://localhost:8082'}, maxRetryCount: 1 })`

const pathRetry = require.resolve('assets-retry')

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
        return <script defer src={src} />
      })} */}

      <script async src="/static/index.js" />
      <script defer dangerouslySetInnerHTML={{ __html: `${fs.readFileSync(pathRetry, 'utf-8')} ${initAssetsRetry}` }} />
      <script async src="http://localhost:8080/static/remoteEntry.js" />
    </html>
  )
}
