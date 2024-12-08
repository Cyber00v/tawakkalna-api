
<h1 align="center">twk-ts (allow typescript /javascript developers Interacting with Tawakkalna’s Endpoint)</h1>

## Features

- Simplicity
- Chained method
- Zero dependencies
- Parallel Execution
- Tiny size

## Installation

```
npm install tawakkalna-api
```

## Quickstart

```ts
import TawakkalnaApi from "twk-ts";
let result: Record<string, any> = {};
TawakkalnaApi.requestUserFullName()
  .requestUserBloodType()
  .sendAll()
  .then((values) => {
    for (const value of values) {
      if ("data" in value) {
        const json = JSON.parse(value.data as string);

        if (Array.isArray(json)) {
          //handle gallery image or video
          Object.assign(result, json[0]);
        } else if (json.mime_type)
          //handle raw data
          console.log(json.data);
        else {
          Object.assign(result, json); //handle user full name, blood type,...etc
        }
      }
    }
    console.log(result); //{full_name:"الإسم الكامل","blood_type:":1}
  })
  .catch((error) => alert(error));
```

## Here's a breakdown

### TawakkalnaApi

The `TawakkalnaApi` is a wrapper around an HTTP client, providing a chainable methods to make API calls (requests) and handle responses.

#### It provides methods to

- Fetch user information ( full name, mobile number, health status, etc.)
- Manage gallery operations (request file, request image or mulitple images,etc.)
- Perform actions: Trigger actions like opening screens, sharing screens, and posting cards.
- Request permissions: Obtain user permissions for location, camera, gallery, and notifications.

### Request Chaining

`requestUserFullName()` and `requestUserMobileNumber()` are chained methods for adding Tawakkalna’s endpoints (`user_data/full_name` and `user_data/mobile_number`) to queue requests to requests and process them in parallel.

### Sending Requests

`sendAll()` execute all queued requests concurrently.

### Handling Responses

- The `then` block is executed after all requests are completed and all the response are parsed and resolved to tawakkalna entity.

### Examples

```js
const gallery = await twa
  .requestGallerySingle()
  .requestCameraPhoto()
  .requestGallerySingleVideo()
  .requestFileId()
  .sendAll();

console.log(gallery.images.length);
```

```js
const rawData = await twa
  .requestRawData(gallery.images)
  .requestRawData(gallery.videos)
  .sendAll();

console.log(rawData.files.length);
```
