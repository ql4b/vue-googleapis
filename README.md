# vue-googleapis
Handling Google APIs in Vue.js project 

Ths is a simple wrapper around [Google API Client Library for Javascript](https://github.com/google/google-api-javascript-client) for use in Vue.js project. 

While I was prototyping a side-project I needed to a `YouTube Data API` and `Google Auth`  to perform actions on behalf of a Google user. 

The existing plugins I found were either outdated or doing too less (oAuth only) or too much (deciding how I should I have managed user session) so I wrote my own plugin being totally new to Vue and frontend development in general.

## Installation

`npm install --save vue-googleapis`

## Initialization

```javascript
// src main.js
import Gapi from 'vue-googleapis'
Vue.use(Gapi, {
  apiKey: '<APIKEY>'
  clientId: '<CLIENT_ID>.apps.googleusercontent.com',
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apisyoutube/v3/rest'],
  scope: 'https://www.googleapis.com/auth/youtube',
})

```

The options passed to `Vue.use` are used to initialise the client, check the [documentation](https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientinitargs--) for details


## Usage

The pluging add a `$google` object to the Vue instance. This object has to property

`isInit` (boolean) : Determine if the api libraries has been loaded. **Please make sure the value is set to true before using the client**

`api` : This represent the configured [gapi client](https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md) and allow you to access all its methods and properties

### Authentication

For example you can access the [Google Auth](https://developers.google.com/identity/sign-in/web/reference#gapiauth2getauthinstance) object in your component this way:

```javascript
this.$google.api.auth2.getAuthInstance()
```

and define a methods that deals with authentication  this way

```javascript

methods: {
  isSignedId () {
    return  this.$google.api.auth2.getAuthInstance().isSignedIn.get()
  },
  async signIn () {
    await this.$google.api.auth2.getAuthInstance().signIn()
  },
}

```

Please refer to the official documentation for how to manage oAuth 2.0 autentication: 

* https://developers.google.com/identity/protocols/oauth2
* https://developers.google.com/identity/sign-in/web/reference


### Using Google APIs

The Google Javasript Client library allow you to make requests in [several ways](https://github.com/google/google-api-javascript-client/blob/master/docs/start.md)

If you loaded the [Discoveery documents](https://github.com/google/google-api-javascript-client/blob/master/docs/discovery.md)  for the APIs you intend to use as in the initialization step above you can make requests this way

```javascript
await this.$google.api.client.youtube.playlists.list({mine: true, part: "snippet"})
```

If you didn't you can always use the [client.request method](https://github.com/google/google-api-javascript-client/blob/master/docs/reference.md#----gapiclientrequestargs--) this way 


```javascript
  await this.$google.api.client.request({
    path: 'youtube/v3/playlists',
    method: 'GET',
    params: {
      mine: true, part: "snippet"
    }
  })
```