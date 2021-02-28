const loadLibrary = function () {
  return new Promise(function (resolve, reject) {
    const src = 'https://apis.google.com/js/api.js'
    let s = document.querySelector('script[src="' + src + '"]')
    let shouldAppend = false
    if (!s) {
      s = document.createElement('script')
      s.src = src
      s.async =  true
      s.onload = function () {
        s.setAttribute('data-loaded', true)
        resolve()
      }
      s.onerror = reject
      shouldAppend  = true
    } else if (s.hasAttribute('data-loaded')) {
        resolve()
    }
    if (shouldAppend) {      
      document.head.appendChild(s)
    }
  })
}

const initClient = (config)  =>  {
  return new Promise((resolve, reject) => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init(config)
        .then(() => {
          resolve(window.gapi)
        }).catch((error) => {
          reject(error)
        })
    })
  })
}

const Google = class {
  constructor () {
    this.api = null
    this.isInit = false
  }
  load (config) {
    loadLibrary().then( () => {
      return initClient(config)
    }).then((gapi) => {
      this.api = gapi
      this.isInit = true
    })
  }
}

export default {
  install: function (Vue, config) {
    const google = new Google()
    Vue.google = Vue.prototype.$google = google
    Vue.google.load(config)
  }
}