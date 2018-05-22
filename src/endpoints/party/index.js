import { Router } from "express";
import * as partyDb from "../../data/party.js";

const router = Router();

function listParties(req, res) {
  partyDb.listParties().then(parties => res.json(parties));
}

function getParty(req, res) {}

function postParty(req, res) {}

function deleteParty(req, res) {}

router.get("/", listParties);
router.get("/:partyCreator/:partyDate", getParty);
router.post("/", postParty);
router.delete("/", deleteParty);

export default router;
