\c reviewsapi

/* Table 'reviews' */
CREATE TABLE reviews(
  id integer NOT NULL,
  product_id integer,
  rating integer NOT NULL,
  date double precision NOT NULL,
  summary varchar(250) NOT NULL,
  body varchar(250) NOT NULL,
  recommend boolean NOT NULL,
  reported boolean,
  reviewer_name varchar(250) NOT NULL,
  reviewer_email varchar(250) NOT NULL,
  response varchar(250),
  helpfulness integer,
  PRIMARY KEY(id)
);

/* Table 'characteristics' */
CREATE TABLE "characteristics"(
  characteristic_id integer,
  product_id integer NOT NULL,
  "name" varchar(250) NOT NULL,
  PRIMARY KEY(characteristic_id)
);

/* Table 'reviews_photos' */
CREATE TABLE reviews_photos(
  id integer NOT NULL,
  review_id integer NOT NULL,
  url varchar NOT NULL,
  PRIMARY KEY(id)
);

/* Table 'characteristic_reviews' */
CREATE TABLE characteristic_reviews(
  id integer NOT NULL,
  characteristic_id integer,
  review_id integer,
  "value" integer,
  PRIMARY KEY(id)
);

/* Relation 'review_photos' */
ALTER TABLE reviews_photos
  ADD CONSTRAINT review_photos FOREIGN KEY (review_id) REFERENCES reviews (id);

/* Relation 'characteristics_characteristic_reviews' */
ALTER TABLE characteristic_reviews
  ADD CONSTRAINT characteristics_characteristic_reviews
    FOREIGN KEY (characteristic_id) REFERENCES "characteristics" (characteristic_id)
  ;
