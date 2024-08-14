import memoize from 'lodash-es/memoize'

export const getClearCriticalCss = memoize((css: string) => {
  return css.replace(/\n/g, '').replace(/\/\*(.*?)\*\//g, '')
})
