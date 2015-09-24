CREATE TABLE pictures (
  picture_id SERIAL PRIMARY KEY,
  title varchar(255) NOT NULL,
  description text NOT NULL,
  url varchar(255) NOT NULL,
  gallery_id INTEGER NOT NULL,
  picture_order INTEGER NOT NULL,
  width INTEGER NOT NULL,
  height INTEGER NOT NULL,
  FOREIGN KEY (gallery_id) references galleries (gallery_id) ON DELETE CASCADE
);
