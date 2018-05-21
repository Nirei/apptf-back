import { createParty, listParties } from "./data/party.js";
import {
  open as openDbConnection,
  close as closeDbConnection,
  handleError as handleDbError
 } from "./data/util/connection.js";

function main() {
  openDbConnection(handleDbError);

  createParty({
    name: "Una fiestuki",
    creator: "asdfghjk",
    date: Date.now(),
    type: 0,
    latitude: 1.0,
    longitude: 0.1,
  });

  listParties();

  closeDbConnection(handleDbError);
}

main();
