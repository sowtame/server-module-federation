import RootDev from '../../client/root'

type Props = {
  criticalCss: string
  markupApp: string
}

export const Html = ({ criticalCss, markupApp }: Props) => {
  return (
    <html>
      <head>
        <style type="text/css" dangerouslySetInnerHTML={{ __html: criticalCss }} />
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: markupApp }} />
      </body>

      <script async data-chunk="main" src="http://localhost:8080/static/index.js"></script>
    </html>
  )
}