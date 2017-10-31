# router-adapter

This package is intend to simplify the express router list as well as separate the logic from the http handling

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
app.get('/my-entrypoint/:id', (req, res) => {
  routerAdapter(res, getObject(req.params.id))
})

```
