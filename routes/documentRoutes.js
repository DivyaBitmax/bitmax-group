// routes/documentRoutes.js
const express = require("express");
const router = express.Router();
const docCtrl = require("../controllers/documentController");
const upload = require("../middleware/upload");

router.post("/upload", upload.single("pdf"), docCtrl.uploadDocument);
router.get("/employee/:id", docCtrl.getDocumentsByEmployee);
router.get("/download/:docId", docCtrl.downloadDocument);
router.delete("/:docId", docCtrl.deleteDocument);

module.exports = router;
