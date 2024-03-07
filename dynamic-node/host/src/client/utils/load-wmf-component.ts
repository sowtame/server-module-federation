/**
 * Function to initialize sharing
 * @async
 * @function
 */
const initSharing = async () => {
  const webpackShareScopes = __webpack_share_scopes__ as unknown as WebpackShareScopes
  if (!webpackShareScopes?.default) {
    await __webpack_init_sharing__('default')
  }
}

export const loadWmfComponent = async (scope: string, module: string) => {
  // Эта строчка инициализирует область общего доступа.
  await initSharing()
  const container = window[scope]

  console.log(__webpack_share_scopes__.default)

  // Initialize the container to get shared modules and get the module factory:
  const [, factory] = await Promise.all([container.init(__webpack_share_scopes__.default), container.get(module)])

  // Загружаем нужные чанки.
  const Module = factory()

  return Module
}
