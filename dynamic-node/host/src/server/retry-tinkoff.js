;(function retryResourceLoad(retryTimeout, retryMap, assetsPrefix) {
  var check,
    checkCb,
    checkMap = {
      'https://www.cdn-tinkoff.ru': 'https://www.cdn-tinkoff.ru/cdn-healthz.txt',
    },
    retriedResourcesList = {}
  function getRetryUrl(url) {
    for (var key in retryMap) if (-1 !== url.indexOf('https://' + key)) return url.replace(key, retryMap[key])
    return url
  }
  function checkStatic(url) {
    var checkUrl = (function getCheckUrl(url) {
      for (var key in checkMap) if (0 === url.indexOf(key)) return checkMap[key]
    })(url)
    if (checkUrl) {
      var xhr = new XMLHttpRequest()
      xhr.open('GET', checkUrl),
        (xhr.timeout = 2e3),
        (xhr.onerror = xhr.onload =
          function (err) {
            ;(check = {
              isCompleted: !0,
              url: checkUrl,
              xhrStatus: xhr.status,
            }),
              checkCb && checkCb()
          }),
        xhr.send()
    } else
      check = {
        isCompleted: !1,
      }
  }
  function throwError(url, error, newTag) {
    if ((newTag && delete newTag.dataset.href, void 0 !== check)) {
      var err = new Error('Problem with the file loading: ' + url),
        conn = navigator.connection || {}
      throw (
        ((err.originalUrl = url),
        (err.newUrl = getRetryUrl(url)),
        (err.connection = {
          downlink: conn.downlink,
          type: conn.type,
          effectiveType: conn.effectiveType,
          rtt: conn.rtt,
          saveData: conn.saveData,
        }),
        (err.check = check),
        (err.code = 'ASSET_LOAD_FAIL'),
        error
          ? ((err.secondError = {
              message: error.message,
              stack: error.stack,
            }),
            (err.xhrStatus = error.xhrStatus),
            (err.retry = 'failed'))
          : (err.retry = 'success'),
        err)
      )
    }
    checkCb = throwError.bind(null, url, error)
  }
  window.addEventListener(
    'error',
    function retry(event) {
      var tag = event && event.target,
        tagName = tag.tagName && tag.tagName.toLowerCase()
      if ('link' === tagName || 'script' === tagName) {
        var isLink = 'link' === tagName,
          failedUrl = isLink ? tag.href : tag.src
        if (
          (tag.dataset.critical ||
            (function isMainResource(url) {
              return 0 === url.indexOf(assetsPrefix)
            })(failedUrl)) &&
          (!isLink || 'stylesheet' === tag.rel.toLowerCase())
        ) {
          var newTag,
            retryUrl = getRetryUrl(failedUrl)
          if (retriedResourcesList[retryUrl]) {
            if (!(retriedResourcesList[retryUrl] < 1)) return
            retriedResourcesList[retryUrl] = retriedResourcesList[retryUrl] + 1
          } else retriedResourcesList[retryUrl] = 1
          if (isLink)
            (newTag = document.createElement('link')),
              checkStatic(tag.href),
              (newTag.dataset.href = tag.href),
              (newTag.href = retryUrl),
              (newTag.rel = 'stylesheet'),
              (newTag.onload = throwError.bind(null, tag.href)),
              (newTag.onerror = throwError.bind(null, tag.href, new Error('CSS loading error'), newTag))
          else {
            var error, xhr
            ;(newTag = document.createElement('script')), checkStatic(tag.src)
            try {
              ;(xhr = new XMLHttpRequest()).open('GET', retryUrl, !1),
                xhr.send(),
                xhr.status >= 400
                  ? (error = {
                      message: xhr.responseText,
                      xhrStatus: xhr.status,
                    })
                  : (newTag.text = xhr.responseText)
            } catch (e) {
              ;(e.xhrStatus = xhr.status), (error = e)
            }
            setTimeout(throwError.bind(null, tag.src, error), 0)
          }
          tag.parentNode.insertBefore(newTag, tag),
            setTimeout(function timeoutCallback() {
              tag && tag.parentNode && ('function' != typeof tag.remove ? tag.parentNode.removeChild(tag) : tag.remove())
            }, 0)
        }
      }
    },
    !0
  )
})(
  null,
  {
    'www.cdn-tinkoff.ru': 'fallback.cdn-tinkoff.ru/www',
    'acdn.tinkoff.ru': 'fallback.cdn-tinkoff.ru/acdn',
    'unic-cdn-prod.cdn-tinkoff.ru': 'fallback.cdn-tinkoff.ru/unic-cdn-prod',
  },
  'https://acdn.tinkoff.ru/supreme/'
)
