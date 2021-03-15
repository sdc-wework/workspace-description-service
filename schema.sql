DROP DATABASE IF EXISTS spacework;
CREATE DATABASE spacework;
\c spacework
CREATE TABLE workspacedescriptions(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  url VARCHAR(50),
  descriptionHeadline VARCHAR(50),
  description VARCHAR(2500)
);

