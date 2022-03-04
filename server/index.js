const express = require('express')
const app = express()
const port = 3000
const db = require('../database/index.js')

app.get('/', (req,res) => {
  res.send('Hello world!')
})

app.get('/reviews/', (req,res) => {
  db.helloWorld()
  .then( (result) => {
    console.log(result.rows[0])
    res.send(result.rows[0].now)
  })
  .catch( (error) => console.log('uh oh', error))
})

app.listen(port, () => {
  console.log(`reviews API listening on port ${port}`)
})