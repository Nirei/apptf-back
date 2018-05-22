CREATE TABLE User (
  id TEXT NOT NULL PRIMARY KEY,
  name TEXT,
  avatar TEXT,
  passwd TEXT
) WITHOUT ROWID;

CREATE TABLE Party (
  name TEXT NOT NULL,
  creator TEXT NOT NULL REFERENCES User(id),
  date INTEGER NOT NULL,
  type INTEGER NOT NULL, -- 0: unofficial party, 1: official party
  latitude REAL NOT NULL,
  longitude REAL NOT NULL,
  PRIMARY KEY(creator, date)
) WITHOUT ROWID;

CREATE TABLE Assistance (
  user TEXT NOT NULL REFERENCES User(id),
  partyCreator TEXT NOT NULL,
  partyDate INTEGER NOT NULL,
  PRIMARY KEY(user, partyCreator, partyDate),
  FOREIGN KEY(partyCreator, partyDate) REFERENCES Party(creator, date)
) WITHOUT ROWID;

CREATE TABLE Picture (
  filename TEXT NOT NULL PRIMARY KEY,
  uploader TEXT NOT NULL REFERENCES User(id),
  proves TEXT NOT NULL REFERENCES Party(rowid)
) WITHOUT ROWID;

CREATE TABLE Report (
  issuer TEXT NOT NULL REFERENCES User(id),
  reported TEXT NOT NULL REFERENCES User(id),
  partyCreator TEXT NOT NULL,
  partyDate INTEGER NOT NULL,
  date INTEGER NOT NULL,
  PRIMARY KEY(issuer, reported, partyCreator, partyDate)
  FOREIGN KEY(partyCreator, partyDate) REFERENCES Party(creator, date)
) WITHOUT ROWID;

CREATE TABLE Litigation (
  accused TEXT NOT NULL REFERENCES User(id),
  party INTEGER NOT NULL REFERENCES Party(rowid),
  partyCreator TEXT NOT NULL,
  partyDate INTEGER NOT NULL,
  PRIMARY KEY(accused, partyCreator, partyDate),
  FOREIGN KEY(partyCreator, partyDate) REFERENCES Party(creator, date)
) WITHOUT ROWID;

CREATE TABLE Vote (
  voter TEXT NOT NULL REFERENCES User(id),
  accused TEXT NOT NULL,
  partyCreator TEXT NOT NULL,
  partyDate INTEGER NOT NULL,
  PRIMARY KEY(voter, accused, partyCreator, partyDate),
  FOREIGN KEY(accused, partyCreator, partyDate) REFERENCES Litigation(accused, partyCreator, partyDate)
) WITHOUT ROWID;
