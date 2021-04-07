DROP DATABASE IF EXISTS spacework;
CREATE DATABASE spacework;
\c spacework

CREATE TABLE owners(
  id INTEGER PRIMARY KEY,
  firstName VARCHAR(20),
  lastName VARCHAR(20)
);

CREATE TABLE workspacedescriptions(
  id INTEGER PRIMARY KEY,
  name VARCHAR(50),
  url VARCHAR(50),
  descriptionheadline VARCHAR(50),
  description VARCHAR(2500),
  ownerId INTEGER REFERENCES owners(id)
);

CREATE TABLE photos(
  id INTEGER PRIMARY KEY,
  url VARCHAR(200),
  workspaceId INTEGER REFERENCES workspacedescriptions(id)
)