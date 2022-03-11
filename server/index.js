const express = require('express')
const app = express()
const port = 3000
const db = require('../database/index.js')

app.use(express.json())

app.get('/', (req,res) => {
  res.send('Hello world!')
})

/* the /reviews/ route takes the following params:
* page - integer
* count - integer
* sort - integer
* product_id
*/
//
app.get('/reviews/', (req, res) => {
//  console.log('starting GET request at /reviews/')
  db.getReviews(req.query.page, req.query.count, req.query.product_id)
  .then( (result) => {
    res.status(200).send(result.rows[0].json_build_object)
  })
  .catch( (error) => console.log('/reviews/ : uh oh:', error))
})

app.get('/reviews/meta/', (req, res) => {
//  console.log('starting GET request at /reviews/meta/')
//  console.log(req.query)

  db.getMeta(req.query.product_id)
  .then( (result) => {
    res.status(200).send(result.rows[0].json_build_object)
  })
.catch( (error) => console.log)
})

app.get('/loaderio-69e649ae0dbe3b9cceb3bd0c0460effb/', (req, res) => {
  res.status(200).send('loaderio-69e649ae0dbe3b9cceb3bd0c0460effb')
})


app.listen(port, () => {
  console.log(`reviews API listening on port ${port}`)
})
