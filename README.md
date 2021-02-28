# vue-googleapis
Handling Google APIs in Vue.js project - A simple wrapper around Google API Client Library for Javascript

## Installation

`npm install --save vue-googleapis`

## Initialization

```javascript
// src main.js
import Gapi from 'vue-googleapis'
Vue.use(Gapi, {
  clientId: 'CLIENT_ID.apps.googleusercontent.com',
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apisyoutube/v3/rest'],
  scope: 'https://www.googleapis.com/auth/youtube',
})
```


