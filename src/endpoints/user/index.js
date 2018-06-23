import { Router } from "express";
import * as userDb from "../../data/user.js";
import { requireAuth } from "../endpoint-util";

const router = Router();

router.get('*', requireAuth);
router.put('*', requireAuth);
router.post('*', requireAuth);
router.delete('*', requireAuth);


function listUsers(req, res) {
  userDb.listUsers().then(users => res.json(users));
}

function getUser(req, res) {
  const id = req.params.id;
  userDb.getUser({ id }).then(user => res.json(user));
}

function putUser(req, res) {
}

router.get("/", listUsers);
router.get("/:id", getUser);
router.put("/", putUser);

export default router;
