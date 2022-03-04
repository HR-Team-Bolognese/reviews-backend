const { Pool, Client} = require('pg')
const pool = new Pool( {
  user: 'bronson',
  host: 'localhost',
  database: 'reviewsapi',
  port: 5432,
})

//pool.connect().then( () => console.log('hey we connected!')).catch( (error) => console.log('uh oh', error))

const helloWorld = function() {
  return pool.query('SELECT * from REVIEWS where ID=1')
}

// const client = new Client()
// await client.connect()
// const res = await

module.exports = {
  helloWorld: helloWorld
}