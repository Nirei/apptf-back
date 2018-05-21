import { Router } from "express";

const router = Router();

fuction listParties (req, res) {

}

function getParty (req, res) {

}

fuction postParty (req, res) {

}

fuction deleteParty (req, res) {

}

router.get('/party', listParties);
router.get('/party/:partyId', getParty);
router.post('/party', postParty);
router.delete('/party', deleteParty);

export default router;
