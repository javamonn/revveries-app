CREATE TABLE galleries (
  gallery_id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL,
  description text NOT NULL,
  gallery_order integer NOT NULL
);
