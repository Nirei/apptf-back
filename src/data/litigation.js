import table from './table';

const DB_TABLE = table("Litigation");

export function listUsers() {
  return DB_TABLE.list();
}

export function getUser(key) {
  return DB_TABLE.get(key);
}

export function createUser(party) {
  return DB_TABLE.create(party);
}

export function deleteUser(key) {
  return DB_TABLE.delete(key);
}
