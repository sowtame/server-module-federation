import { useEffect, useRef } from 'react'
import { IS_SSR } from '../../../utils/constants'

export const useShadowLinks = () => {
  const links = useRef(null)

  useEffect(() => {
    const container = document.getElementById('remote-id')
    debugger

    if (container?.shadowRoot) {
      container?.shadowRoot.appendChild(links.current)
    }
  }, [links])

  if (!IS_SSR && !links.current) {
    const container = document.getElementById('remote-id')

    links.current = container.shadowRoot.getElementById('wrap-styles')
  }
}
