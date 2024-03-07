const express = require("express");
const fs = require("fs");
const verifyToken = require("../middlewares/authJWT");
const PDFDocument = require("pdfkit");

const router = express.Router();

router.post("/markdown/export", verifyToken, function (req, res) {
  if (!req.user) {
    res.status(403).send({
      message: "Invalid JWT token",
    });
  }

  const { text, format } = req.body;
  if (!text || !format) {
    return res.status(400).json({ error: "Text and format are required." });
  }

  if (!["pdf", "txt", "json"].includes(format)) {
    return res
      .status(400)
      .json({ error: "Invalid format. Supported formats: pdf, txt, word." });
  }

  switch (format) {
    case "pdf":
      const pdfDoc = new PDFDocument({ bufferPages: true });
      let buffers = [];
      pdfDoc.on("data", buffers.push.bind(buffers));
      pdfDoc.on("end", () => {
        let pdfData = Buffer.concat(buffers);
        res
          .writeHead(200, {
            "Content-Length": Buffer.byteLength(pdfData),
            "Content-Type": "application/pdf",
            "Content-disposition": "attachment;filename=test.pdf",
          })
          .end(pdfData);
      });

      pdfDoc.text(text);
      pdfDoc.end();
      // res.download(pdfDoc, "exported-document.pdf", () => {
      //   fs.unlinkSync(pdfPath);
      // });
      break;
    case "txt":
      const txtPath = "exported-document.txt";
      fs.writeFileSync(txtPath, text);
      res.download(txtPath, "exported-document.txt", () => {
        fs.unlinkSync(txtPath);
      });
      break;
  }
});

module.exports = router;
