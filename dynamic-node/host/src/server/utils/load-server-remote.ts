import { injectScript, RuntimeRemote } from '@module-federation/utilities'

export const loadServerRemote = async (props: RuntimeRemote) => {
  const container = await injectScript(props)

  const globalScope = globalThis.__remote_scope__

  if (globalScope && globalScope[props.global]) {
    globalScope[props.global] = undefined
  }

  return container
}
