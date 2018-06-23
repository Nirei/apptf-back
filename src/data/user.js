import table from './table';

const DB_TABLE = table("User");

export function listUsers() {
  return DB_TABLE.list();
}

export function getUser(key) {
  return DB_TABLE.get(key);
}

export function createUser(user) {
  return DB_TABLE.create(user);
}

export function deleteUser(key) {
  return DB_TABLE.delete(key);
}
