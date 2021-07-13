const express = require("express");
const cors = require("cors");
const fileupload = require("express-fileupload");
const ExcelJS = require("exceljs");

const Student = require("./models/Student");

const app = express();

require('./db');

// Middlewares
app.use(cors());
app.use(express.json());
app.use(fileupload());

app.post("/api/loadFile", async (req, res) => {

  const buffer = req.files["file"].data;

  const wb = new ExcelJS.Workbook();
  await wb.xlsx.load(buffer);

  const sheet = wb.getWorksheet("nocturnas-ebjas- semip");

  const data = [];

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber !== 1) {
      const student = [];

      row.eachCell(cell => {
        student.push(cell.value.trim());
      });

      const [
        zona,
        distrito,
        amie,
        institucion,
        sostenimiento,
        especialidad,
        grado,
        cedula,
        nombres,
      ] = student;

      const studentObj = {
        zona,
        distrito,
        amie,
        institucion,
        sostenimiento,
        especialidad,
        grado,
        cedula,
        nombres,
      };

      data.push(studentObj);
    }
  });

  // Saving in MongoDB
  await Student.insertMany(data);

  res.json({
    status: "success",
    count: data.length,
    estudiantes: data,
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
