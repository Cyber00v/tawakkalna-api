<h1 align="center">tawakkalna-api (allow typescript developers Interacting with Tawakkalna’s Endpoint)</h1>

## Features

- Simplicity
- Chained method
- Zero dependencies
- Tiny size

## Installation

```
npm install tawakkalna-api
```

## Quickstart

```ts
import TawakkalnaApi from "tawakkalna-api";
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

### Request Chaining

`requestUserFullName()` and `requestUserBloodType()` are chained methods for adding Tawakkalna’s endpoints to pending requests list.

### Sending Requests

`sendAll()` Triggers all pending requests sequentially

### Handling Responses

- The `then` block is executed after all requests are completed.
- `for (const value of values)` It iterates over the array of responses `values`.

**Remark**
Each response object contains a data property if the request was successful.
