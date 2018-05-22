import sql from "sqlite3";

const DBPATH = "db/apptf.db";

let DBCONN;

const handleError = function(err) {
  if (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export function open(cb = handleError) {
  DBCONN = new sql.Database(DBPATH, cb);
  DBCONN.run("PRAGMA foreign_keys = ON");
}

export function get() {
  return DBCONN;
}

export function close(cb = handleError) {
  DBCONN.close(cb);
}
