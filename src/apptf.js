import express from "express";
import endpoints from "./endpoints";
import {
  open as openDbConnection,
  close as closeDbConnection,
} from "./data/util/connection.js";

function main() {
  openDbConnection();

  const app = express();
  app.use("/api", endpoints.api);
  app.use(endpoints.statics);

  app.listen(8080);
}

process.on("exit", function() {
  console.log("Terminating server, closing DB connection.");
  closeDbConnection();
});

main();
