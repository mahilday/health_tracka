import { Router } from "express";
import {
  deleteIpLoc,
  getAllData,
  getById,
  postIpLoc,
  updateIpLoc,
} from "../controllers/ipLocController";

const router = Router();

router
  .post("/", postIpLoc)
  .get("/", getAllData)
  .get("/:id", getById)
  .delete("/:id", deleteIpLoc)
  .put("/:id", updateIpLoc);

module.exports = router;
