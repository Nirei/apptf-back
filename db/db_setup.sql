CREATE TABLE User (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT,
  avatar TEXT,
  passwd TEXT
);

CREATE TABLE Party (
  name TEXT NOT NULL,
  creator TEXT NOT NULL REFERENCES User(id),
  date INTEGER NOT NULL,
  type INTEGER NOT NULL, -- 0: unofficial party, 1: official party
  latitude REAL NOT NULL,
  longitude REAL NOT NULL
);

CREATE TABLE Assistance (
  user TEXT NOT NULL REFERENCES User(id),
  party INTEGER NOT NULL REFERENCES Party(rowid),
  PRIMARY KEY(user, party)
);

CREATE TABLE Picture (
  filename TEXT NOT NULL PRIMARY KEY,
  uploader TEXT NOT NULL REFERENCES User(id),
  proves TEXT NOT NULL REFERENCES Party(rowid)
);

CREATE TABLE Report (
  issuer TEXT NOT NULL REFERENCES User(id),
  reported TEXT NOT NULL REFERENCES User(id),
  party INTEGER NOT NULL REFERENCES Party(rowid),
  date INTEGER NOT NULL,
  PRIMARY KEY(issuer, reported, party)
);

CREATE TABLE Litigation (
  accused TEXT NOT NULL REFERENCES User(id),
  party INTEGER NOT NULL REFERENCES Party(rowid),
  PRIMARY KEY(accused, party)
);

CREATE TABLE Vote (
  voter TEXT NOT NULL REFERENCES User(id),
  accused TEXT NOT NULL,
  party INTEGER NOT NULL,
  FOREIGN KEY(accused, party) REFERENCES Litigation(accused, party)
);
