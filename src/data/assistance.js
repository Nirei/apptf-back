import table from './table';

const DB_TABLE = table("Assistance");

export function listAssist() {
  return DB_TABLE.list();
}

export function getAssist(key) {
  return DB_TABLE.get(key);
}

export function createAssist(assist) {
  return DB_TABLE.create(assist);
}

export function deleteAssist(key) {
  return DB_TABLE.delete(key);
}
