import { Router } from "express";
import * as partyDb from "../../data/party.js";

const router = Router();

function listParties(req, res) {
  partyDb.listParties().then(parties => res.json(parties));
}

function getParty(req, res) {
  const creator = req.params.creator;
  const date = parseInt(req.params.date);
  partyDb.getParty({ creator, date }).then(party => res.json(party));
}

function postParty(req, res) {}

function deleteParty(req, res) {}

router.get("/", listParties);
router.get("/:creator/:date", getParty);
router.post("/", postParty);
router.delete("/", deleteParty);

export default router;
