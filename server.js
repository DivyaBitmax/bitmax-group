const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
const employeeRoutes = require("./routes/employeeRoutes");
const { PORT } = require("./config/config");

const app = express();
app.use(cors());
app.use(express.json());

connectDB()

app.use("/api/employees", employeeRoutes);
app.use("/api/documents", documentRoutes); // ✅ Added
app.use("/uploads", express.static("uploads")); 

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));