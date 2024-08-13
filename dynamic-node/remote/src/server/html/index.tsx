import { getUsedStyles } from 'used-styles'
import { stylesLookup } from '../render-client'

type Props = {
  criticalCss: string
  markupApp: string
}

export const Html = ({ criticalCss, markupApp }: Props) => {
  const usedStyles = getUsedStyles(markupApp, stylesLookup)

  return (
    <html>
      <head>
        <style type="text/css" dangerouslySetInnerHTML={{ __html: criticalCss }} />
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: markupApp }} />
      </body>

      <script async data-chunk="main" src="http://localhost:8080/static/index.js"></script>
      {usedStyles.map((file) => {
        return <link data-chunk="CitiesModalMobile" rel="stylesheet" href={`http://localhost:8080/static/${file}`}></link>
      })}
    </html>
  )
}
