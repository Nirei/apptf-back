import table from './table';

const DB_TABLE = table("Party");

export function listParties() {
  return DB_TABLE.list();
}

export function getParty(key) {
  return DB_TABLE.get(key);
}

export function createParty(party) {
  return DB_TABLE.create(party);
}

export function deleteParty(key) {
  return DB_TABLE.delete(key);
}
