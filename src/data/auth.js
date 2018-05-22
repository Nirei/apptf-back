import table from './table';

const DB_TABLE = table("Auth");

export function getAuth(key) {
  return DB_TABLE.get(key);
}

export function createAuth(auth) {
  return DB_TABLE.create(auth);
}
