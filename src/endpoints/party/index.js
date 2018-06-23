import { Router } from "express";
import * as partyDb from "../../data/party";
import * as assistDb from "../../data/assistance";
import { requireAuth } from "../endpoint-util";

const router = Router();

router.get("*", requireAuth);
router.put("*", requireAuth);
router.post("*", requireAuth);
router.delete("*", requireAuth);

function listParties(req, res) {
  partyDb.listParties().then(parties => res.json(parties));
}

function assistParty(req, res) {
  const partyCreator = req.params.creator;
  const partyDate = parseInt(req.params.date);
  const user = req.user;
  assistDb
    .createAssist({ partyCreator, partyDate, user: user.id })
    .then(() => {
      res.status(201);
      res.end();
    })
    .catch(err => {
      res.status(409);
      res.end();
    });
}

function listAssist(req, res) {
  const partyCreator = req.params.creator;
  const partyDate = parseInt(req.params.date);
  assistDb
    .getAssist({ partyCreator, partyDate })
    .then(assists => res.json(assists));
}

function getParty(req, res, next) {
  const creator = req.params.creator;
  const date = parseInt(req.params.date);
  const promise = Promise.all([
    partyDb.getParty({ creator, date }),
    assistDb.getAssist({ partyCreator: creator, partyDate: date })
  ]).then(([[party], assist]) => {
    party.assistants = assist.map(a => a.user);
    res.json(party);
  }).catch(() => next());
}

function postParty(req, res) {}

function deleteParty(req, res) {}

router.get("/", listParties);
router.get("/:creator/:date", getParty);
router.get("/:creator/:date/assist", listAssist);
router.post("/:creator/:date/assist", assistParty);
router.post("/", postParty);
router.delete("/", deleteParty);

export default router;
