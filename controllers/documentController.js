const Document = require("../models/Document");

exports.uploadDocument = async (req, res) => {
  const { employeeId, type } = req.body;
  const file = req.file;

  if (!file) return res.status(400).json({ msg: "No file uploaded" });

  try {
    const doc = new Document({
      employeeId,
      type,
      filePath: file.path,
    });

    await doc.save();
    res.status(201).json({ msg: "Document uploaded", document: doc });
  } catch (err) {
    res.status(500).json({ msg: "Upload failed", error: err.message });
  }
};

exports.getDocumentsByEmployee = async (req, res) => {
  try {
    const docs = await Document.find({ employeeId: req.params.id });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch documents" });
  }
};

exports.downloadDocument = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.docId);
    if (!doc) return res.status(404).json({ msg: "Document not found" });

    res.download(doc.filePath);
  } catch (err) {
    res.status(500).json({ msg: "Download failed" });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findByIdAndDelete(req.params.docId);
    if (!doc) return res.status(404).json({ msg: "Document not found" });

    res.json({ msg: "Document deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Delete failed" });
  }
};
