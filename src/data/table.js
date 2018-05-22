import { get as getDbConnection } from "./util/connection.js";

function cbToPromise(resolve, reject) {
  return function(err, rows) {
    if (err) reject(err);
    else {
      resolve(rows);
    }
  };
}

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
        conn.all(queryString, values, cbToPromise(resolve, reject));
      });

      return promise;
    },

    get: function(params) {
      const promise = new Promise(function(resolve, reject) {
        const conn = getDbConnection();
        const keys = Object.keys(params);
        const values = keys.map(key => params[key]);
        const condition = keys.map(key => `${key} = ?`).join(" AND ");
        const queryString = `SELECT * FROM ${table} WHERE ${condition};`;
        conn.all(queryString, values, cbToPromise(resolve, reject));
      });

      return promise;
    },

    delete: function(pk) {
      const promise = new Promise(function(resolve, reject) {
        const conn = getDbConnection();
        const keys = Object.keys(pk);
        const values = keys.map(key => pk[key]);
        const condition = keys.map(key => `${key} = ?`).join(" AND ");
        const queryString = `DELETE FROM ${table} WHERE ${condition};`;
        conn.run(queryString, values, cbToPromise(resolve, reject));
      });

      return promise;
    },

    update: function(pk, entity) {
      const promise = new Promise(function(resolve, reject) {
        const conn = getDbConnection();
        const eKeys = Object.keys(entity);
        const queryKeys = eKeys.join(", ");
        const eValues = eKeys.map(key => entity[key]);
        const queryValues = eKeys.map(key => `${key} = ?`).join(", ");
        const pkKeys = Object.keys(pk);
        const condition = pkKeys.map(key => `${key} = ?`).join(" AND ");
        const pkValues = pkKey.map(key => pk[key]);
        const queryString = `UPDATE ${table} SET ${queryValues} WHERE ${condition};`;
        conn.run(
          queryString,
          [...eValues, ...pkValues],
          cbToPromise(resolve, reject)
        );
      });

      return promise;
    }
  };
}
