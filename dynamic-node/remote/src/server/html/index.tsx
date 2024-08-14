import { getCriticalRules, getUsedStyles } from 'used-styles'
import { stylesLookup } from '../render-client'
import { getClearCriticalCss } from './utils/get-clear-critical-rules'

type Props = {
  markupApp: string
}

export const Html = ({ markupApp }: Props) => {
  const usedStyles = getUsedStyles(markupApp, stylesLookup)
  const criticalCss = getCriticalRules(markupApp, stylesLookup)

  return (
    <html>
      <head>
        <style type="text/css" dangerouslySetInnerHTML={{ __html: getClearCriticalCss(criticalCss) }} />
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: markupApp }} />
      </body>

      <script async data-chunk="main" src="http://localhost:8080/static/index.js"></script>
      {usedStyles.map((file) => {
        return <link rel="stylesheet" href={`http://localhost:8080/static/${file}`}></link>
      })}
    </html>
  )
}
