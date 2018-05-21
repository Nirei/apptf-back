import sql from "sqlite3";

const DBPATH = "db/apptf.db";

let DBCONN;

export function open(cb) {
  DBCONN = new sql.Database(DBPATH, cb);
  DBCONN.run("PRAGMA foreign_keys = ON");
}

export function get() {
  return DBCONN;
}

export function close(cb) {
  DBCONN.close(cb);
}

export function handleError(err) {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
};
