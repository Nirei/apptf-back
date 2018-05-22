import { get as getDbConnection } from "./util/connection.js";

const cbToPromise = function(resolve, reject) {
  return function(err, rows) {
    if (err) reject(err);
    else resolve(rows);
  };
};

export default function(table) {
  return {
    list: function() {
      const promise = new Promise(function(resolve, reject) {
        const queryString = `SELECT * FROM ${table};`;
        const conn = getDbConnection();
        conn.all(queryString, [], cbToPromise(resolve, reject));
      });

      return promise;
    },

    create: function(entity) {
      const promise = new Promise(function(resolve, reject) {
        const conn = getDbConnection();
        const keys = Object.keys(entity);
        const queryKeys = keys.join(", ");
        const values = keys.map(key => entity[key]);
        const queryValues = values.map(v => "?").join(", ");
        const queryString = `INSERT INTO ${table}(${queryKeys}) VALUES (${queryValues});`;
        conn.run(queryString, values, cbToPromise(resolve, reject));
      });
    },

    get: function(key) {},

    delete: function() {},

    update: function() {}
  };
}
