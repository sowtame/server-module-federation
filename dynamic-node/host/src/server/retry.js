!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = e())
    : 'function' == typeof define && define.amd
    ? define(e)
    : ((t = t || self).assetsRetry = e())
})(this, function () {
  'use strict'
  function u(t) {
    return t
  }
  function h() {}
  function t(t) {
    for (
      var e = Object.getPrototypeOf
          ? Object.getPrototypeOf
          : function (t) {
              return t.__proto__
            },
        r = Object.keys(t);
      e(t);

    )
      (r = r.concat(Object.keys(e(t)))), (t = e(t))
    return r.filter(function (t) {
      return 'constructor' !== t
    })
  }
  function n(t, e) {
    try {
      return 'function' == typeof t[e]
    } catch (t) {
      return !1
    }
  }
  function f(t) {
    return Array.isArray(t)
      ? t.reduce(function (t, e, r, n) {
          return (t[e] = n[(r + 1) % n.length]), t
        }, {})
      : t
  }
  function g(e, t) {
    return Object.keys(t)
      .filter(function (t) {
        return -1 < e.indexOf(t)
      })
      .sort(function (t, e) {
        return e.length - t.length
      })[0]
  }
  var e,
    r,
    o,
    b = 'retryTimes',
    l = 'succeeded',
    m = 'failed',
    E = 'maxRetryCount',
    O = 'onRetry',
    d = 'onSuccess',
    j = 'onFail',
    w = 'domain',
    s = 'styleImageNoImportant',
    i = '_assetsRetryProxy',
    p = '_assetsRetryOnerror',
    y = 'script',
    a = 'link',
    _ = 'data-assets-retry-hooked',
    A = 'data-assets-retry-ignore',
    k = 'data-retry-id',
    v = window,
    R = window.document,
    c = v.HTMLElement,
    S = v.HTMLScriptElement,
    x = v.HTMLStyleElement,
    L = v.HTMLLinkElement,
    T = v.HTMLImageElement,
    I = Object.prototype.hasOwnProperty,
    M = function (t, e, r) {
      var n = t.indexOf(e)
      return -1 === n ? t : t.substring(0, n) + r + t.substring(n + e.length)
    },
    N = function (t) {
      return [].slice.call(t)
    },
    P = function (e, t, r, n) {
      void 0 === r && (r = h), void 0 === n && (n = !1)
      var o,
        i,
        a,
        c,
        u,
        f = n || e.defer || e.async
      'loading' !== R.readyState || /Edge|MSIE|rv:/i.test(navigator.userAgent) || f
        ? ((o = R.createElement(y)),
          Object.keys(S.prototype).forEach(function (t) {
            if ('src' !== t && e[t] && 'object' != typeof e[t])
              try {
                o[t] = e[t]
              } catch (t) {}
          }),
          (o.src = t),
          (o.onload = e.onload),
          (o.onerror = e.onerror),
          o.setAttribute(k, q()),
          (i = e.getAttribute('nonce')) && o.setAttribute('nonce', i),
          R.getElementsByTagName('head')[0].appendChild(o))
        : ((a = q()),
          (c = e.outerHTML.replace(/data-retry-id="[^"]+"/, '').replace(/src=(?:"[^"]+"|.+)([ >])/, k + '=' + a + ' src="' + t + '"$1')),
          R.write(c),
          (u = R.querySelector('script[' + k + '="' + a + '"]')) && (u.onload = r))
    },
    H = function (e) {
      try {
        return e.rules
      } catch (t) {
        try {
          return e.cssRules
        } catch (t) {
          return null
        }
      }
    },
    C = function (e, t, r) {
      var n = R.createElement(a)
      Object.keys(L.prototype).forEach(function (t) {
        if ('href' !== t && e[t] && 'object' != typeof e[t])
          try {
            n[t] = e[t]
          } catch (t) {}
      }),
        (n.href = t),
        (n.onload = r || e.onload),
        (n.onerror = e.onerror),
        n.setAttribute(k, q()),
        R.getElementsByTagName('head')[0].appendChild(n)
    },
    B = function (t) {
      return t ? (t instanceof c ? [t.nodeName, t.src, t.href, t.getAttribute(k)].join(';') : 'not_supported') : 'null'
    },
    q = function () {
      return Math.random().toString(36).slice(2)
    },
    z = function (t) {
      return t instanceof S || t instanceof T ? t.src : t instanceof L ? t.href : ''
    },
    D = {},
    F = function (t, e) {
      var r,
        n = Z(t, e),
        o = n[0],
        i = n[1]
      return o ? ((D[o] = D[o] || (((r = {})[b] = 0), (r[m] = []), (r[l] = []), r)), [i, D[o]]) : []
    },
    Z = function (t, e) {
      var r,
        n,
        o = g(t, e)
      return o ? [((n = o), (r = t).substr(r.indexOf(n) + n.length, r.length)), o] : ['', '']
    }
  try {
    ;(r = (function () {
      for (var t = 0, e = 0, r = arguments.length; e < r; e++) t += arguments[e].length
      for (var n = Array(t), o = 0, e = 0; e < r; e++) for (var i = arguments[e], a = 0, c = i.length; a < c; a++, o++) n[o] = i[a]
      return n
    })(t(S.prototype), t(L.prototype))),
      (o = {}),
      r.forEach(function (t) {
        o[t] = !0
      }),
      (e = Object.keys(o))
  } catch (t) {}
  function $(s, t) {
    var l = t[E],
      d = f(t[w]),
      y = t[O]
    return e.reduce(function (t, r) {
      var e = n(S.prototype, r)
      return (
        (t[r] = e
          ? {
              value: function () {
                return s[i][r].apply(s[i], arguments)
              },
            }
          : {
              set: function (e) {
                var f = s[i]
                return 'onerror' === r
                  ? ((s[p] = e),
                    void (f.onerror = function (n) {
                      if ('string' != typeof n) {
                        n.stopPropagation && n.stopPropagation()
                        var t = function () {
                            return (t = s[p]), (e = f), (r = n), 'function' != typeof t ? null : t.call(e, r)
                            var t, e, r
                          },
                          e = z(f),
                          r = F(e, d),
                          o = r[0],
                          i = r[1],
                          a = f.hasAttribute(A)
                        if (!o || !i || a) return t()
                        var c = M(e, o, d[o]),
                          u = y(c, e, i)
                        if (null === u) return t()
                        if ('string' != typeof u) throw new Error('a string should be returned in `onRetry` function')
                        i[b] <= l ? (f instanceof S ? P(f, u, h, !0) : f instanceof L && C(f, u)) : t()
                      }
                    }))
                  : 'onload' === r
                  ? ((s._assetsRetryOnload = e),
                    void (s[i].onload = function (t) {
                      e && !e._called && ((e._called = !0), e.call(s[i], t))
                    }))
                  : void (f[r] = e)
              },
              get: function () {
                return s[i][r]
              },
            }),
        t
      )
    }, {})
  }
  var G = function (r) {
      var n = R.createElement
      R.createElement = function (t, e) {
        return t === y || t === a
          ? (function (t, e) {
              var r
              t.setAttribute(_, 'true')
              var n = (((r = {})[i] = t), (r[p] = h), r),
                o = $(n, e)
              return Object.defineProperties(n, o), (n.onload = h), (n.onerror = h), n
            })(n.call(R, t), r)
          : n.call(R, t, e)
      }
    },
    J = function (r) {
      Object.keys(r)
        .filter(function (t) {
          return n(r, t)
        })
        .forEach(function (t) {
          var e = r[t]
          r[t] = function () {
            var t = [].slice.call(arguments).map(function (t) {
              return t && I.call(t, i) ? t[i] : t
            })
            return e.apply(this, t)
          }
        })
    }
  var K = {}
  function Q(y) {
    function f(t) {
      if (t) {
        var e = t.target || t.srcElement,
          r = z(e)
        if (r) {
          var n = F(r, v),
            o = n[0],
            i = n[1],
            a = e instanceof HTMLElement && e.hasAttribute(A)
          if (i && o && !a && !(e instanceof L && 'stylesheet' !== e.getAttribute('rel'))) {
            i[b]++, i[m].push(r)
            var c,
              u = i[b] > y[E]
            if ((u && ((c = Z(r, v)[0]), p(c)), v[o] && !u)) {
              var f = v[o],
                s = M(r, o, f),
                l = h(s, r, i)
              if (null !== l) {
                if ('string' != typeof l) throw new Error('a string should be returned in `onRetry` function')
                if (e instanceof T && e.src) return e.setAttribute(k, q()), void (e.src = l)
                var d = B(e)
                K[d] ||
                  ((K[d] = !0),
                  e instanceof S && !e.getAttribute(_) && e.src ? P(e, l) : e instanceof L && !e.getAttribute(_) && e.href && C(e, l))
              }
            }
          }
        }
      }
    }
    var h = y[O],
      s = y[d],
      p = y[j],
      v = y[w]
    R.addEventListener('error', f, !0),
      R.addEventListener(
        'load',
        function (t) {
          var e, r, n, o, i, a, c, u
          t &&
            ((e = t.target || t.srcElement),
            (r = z(e)) &&
              ((n = F(r, v))[0],
              (o = n[1]),
              (i = Z(r, v)[0]),
              (a = function () {
                o && o[l].push(r), s(i)
              }),
              e instanceof L
                ? R.styleSheets &&
                  ((c = N(R.styleSheets).filter(function (t) {
                    return t.href === e.href
                  })[0]),
                  null !== (u = H(c)) && (0 !== u.length ? a() : f(t)))
                : a()))
        },
        !0
      )
  }
  var U = Date.now() % 1e9,
    V =
      Object.defineProperty &&
      (function () {
        try {
          return 1 === Object.defineProperty({}, 'x', { value: 1 }).x
        } catch (t) {}
      })(),
    W =
      ((X.prototype.add = function (t) {
        V ? Object.defineProperty(t, this._, { configurable: !0, writable: !0, value: !0 }) : (t[this._] = !0)
      }),
      (X.prototype.has = function (t) {
        return !!t[this._]
      }),
      (X.prototype.delete = function (t) {
        return !!t[this._] && !(t[this._] = void 0)
      }),
      X)
  function X() {
    this._ = '__st' + ((1e9 * Math.random()) >>> 0) + U++ + '__'
  }
  function Y(t, e, r, n, o) {
    var i,
      a = o[w],
      c = o[O],
      u = e.style && e.style[t]
    if (u && !/^url\(["']?data:/.test(u)) {
      var f = u.match(/^url\(["']?(.+?)["']?\)/) || [],
        s = f[1]
      if (s) {
        var l = g(s, a)
        if (l) {
          for (var d = l, y = (((i = {})[d] = !0), i); d && a[d]; ) {
            var h = a[d]
            if (y[h]) break
            ;(y[h] = !0), (d = h)
          }
          var p = Object.keys(y)
              .map(function (t) {
                var e = M(s, l, t),
                  r = c(e, s, null)
                return r ? 'url("' + r + '")' : null
              })
              .filter(Boolean)
              .join(','),
            v =
              e.selectorText +
              ('{ ' +
                t.replace(/([a-z])([A-Z])/g, function (t, e, r) {
                  return e + '-' + r.toLowerCase()
                }) +
                ': ' +
                p +
                ' ' +
                (o.styleImageNoImportant ? '' : '!important')) +
              '; }'
          try {
            r.insertRule(v, n.length)
          } catch (t) {
            r.insertRule(v, 0)
          }
        }
      }
    }
  }
  var tt = {},
    et = new W(),
    rt = function (t, o) {
      var i = ['backgroundImage', 'borderImage', 'listStyleImage']
      t.forEach(function (r) {
        var n = H(r)
        if (null !== n) {
          for (var t = n.length, e = 0; e < t; e++)
            !(function (t) {
              var e = n[t]
              i.forEach(function (t) {
                Y(t, e, r, n, o)
              })
            })(e)
          r.href && (tt[r.href] = !0), r.ownerNode instanceof x && et.add(r.ownerNode)
        }
      })
    },
    nt = function (t, r) {
      return N(t).filter(function (t) {
        if (!H(t)) return !1
        if (t.href) return !tt[t.href] && !!g(t.href, r)
        var e = t.ownerNode
        return !(e instanceof x && et.has(e))
      })
    }
  return function (t) {
    var e, r, n, o
    void 0 === t && (t = {})
    try {
      if ('object' != typeof t[w]) throw new Error('opts.domain cannot be non-object.')
      var i = [E, O, d, j, w, s],
        a = Object.keys(t).filter(function (t) {
          return -1 === i.indexOf(t)
        })
      if (0 < a.length) throw new Error('option name: ' + a.join(', ') + ' is not valid.')
      var c =
        (((e = {})[E] = t[E] || 3), (e[O] = t[O] || u), (e[d] = t[d] || h), (e[j] = t[j] || h), (e[w] = f(t[w])), (e[s] = t[s] || !1), e)
      return (
        G(c),
        'undefined' != typeof Node && J(Node.prototype),
        'undefined' != typeof Element && J(Element.prototype),
        Q(c),
        (r = c),
        (n = R.styleSheets),
        (o = r[w]),
        n &&
          setInterval(function () {
            var t = nt(R.styleSheets, o)
            0 < t.length && rt(t, r)
          }, 250),
        D
      )
    } catch (t) {
      v.console && console.error('[assetsRetry] error captured', t)
    }
  }
})
