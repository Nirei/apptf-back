import {
  get as getDbConnection,
  handleError as handleDbError
} from "./util/connection.js";
import { format } from "./util/sql_formatter.js";

const DB_TABLE = "Party";

export function listParties() {
  const conn = getDbConnection();
  conn.all(`SELECT * FROM ${DB_TABLE};`, [], (err, rows) => {
    handleDbError(err);
    console.log(rows);
    rows.forEach(row => console.log(row));
  });
}

export function getParty() {}

export function createParty(party) {
  console.log(getDbConnection);
  const conn = getDbConnection();
  const keys = Object.keys(party);
  const queryKeys = keys.join(", ");
  const values = keys.map(key => format(party[key]));
  const queryValues = values.join(", ");
  const queryString = `INSERT INTO ${DB_TABLE}(${queryKeys}) VALUES (${queryValues});`
  console.log(queryString);
  conn.run(queryString);
}

export function deleteParty() {}
