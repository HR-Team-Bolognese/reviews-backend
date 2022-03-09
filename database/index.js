const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'bronson',
  host: 'localhost',
  database: 'reviewsapi',
  port: 5432,
})

//pool.connect().then( () => console.log('hey we connected!')).catch( (error) => console.log('uh oh', error))

const getReviews = function (page, count, product_id) {
  //need to build logic for page/count/sort

  return pool.query(`SELECT json_build_object(
    'product', product_id,
    'page', ${page},
    'count', ${count},
    'results', (SELECT json_agg(
      json_build_object(
        'review_id', id,
        'rating', rating,
        'summary', summary,
        'recommend', recommend,
        'response', response,
        'body', body,
        'date', date,
        'reviewer_name', reviewer_name,
        'helpfulness', helpfulness,
        'photos', (SELECT json_agg(json_build_object(
          'id', reviews_photos.id,
          'url', reviews_photos.url
        )) FROM reviews_photos WHERE review_id = reviews.id))
    ) as results FROM reviews WHERE product_id = ${product_id} )
  ) FROM reviews WHERE product_id = ${product_id}`)


  //return pool.query(`SELECT * from REVIEWS where ID < 10`)
}

const getMeta = function (product_id) {

  //select name from characteristics where product_id=1

//return pool.query(`SELECT row_to_json(row(name, id)) from characteristics where product_id=1`)

  return pool.query(`SELECT json_build_object(
    'product_id', ${product_id},
    'ratings', json_build_object (
      '1', (SELECT COUNT(rating) FROM reviews WHERE rating=1 AND product_id=$1),
      '2', (SELECT COUNT(rating) FROM reviews WHERE rating=2 AND product_id=$1),
      '3', (SELECT COUNT(rating) FROM reviews WHERE rating=3 AND product_id=$1),
      '4', (SELECT COUNT(rating) FROM reviews WHERE rating=4 AND product_id=$1),
      '5', (SELECT COUNT(rating) FROM reviews WHERE rating=5 AND product_id=$1)
    ), 'recommended', json_build_object(
      'true', (SELECT COUNT(recommend) FROM reviews WHERE recommend='true' AND product_id=$1),
      'false', (SELECT COUNT(recommend) FROM reviews WHERE recommend='false' AND product_id=$1)
    ), 'characteristics', (SELECT json_object_agg(characteristics.name, (SELECT json_build_object('id', characteristics.characteristic_id,
    'value', (select avg(value)
          FROM characteristic_reviews
            WHERE characteristic_id=characteristics.characteristic_id))))
              FROM characteristics
                WHERE product_id=$1))
     FROM reviews WHERE product_id = $1`,[product_id])
}



/*
select avg(value) from
characteristic_reviews where
characteristic_id = 5
*/

module.exports = {
  getReviews: getReviews,
  getMeta: getMeta
}

/* tables in the database:
* reviews
* characteristics
* reviews_photos
* characteristic_reviews
*/