# router-adapter

This package is intend to simplify the express router list as well as separate the logic from the http handling.

This:

```js
app.get('/my-entrypoint/:id', (req, res) => {
  getObject(req.params.id)
  .then((value) => {
    res.status(200).json(value)
  })
  .catch((e) => {
    res.status(500).json(e)
  })
})
```

Becomes this:

```js

app.get('/my-entrypoint/:id', routerAdapter((req) => getObject(req.params.id))

```

## Requirements

-The handler function must return a `Promise`
-If you want to return different error codes other than 500, the promise can be rejected with an instance of HttpError.

