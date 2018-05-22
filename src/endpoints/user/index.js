import { Router } from "express";

const router = Router();

function listUsers(req, res) {}

function getUser(req, res) {}

function postUser(req, res) {}

function deleteUser(req, res) {}

router.get("/", listUsers);
router.get("/:userId", getUser);
router.post("/", postUser);
router.delete("/", deleteUser);

export default router;
