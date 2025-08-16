import express from "express";
import path from "path";
// var bodyParser = require('body-parser')
require("dotenv").config();
import cors from "cors";
import initRoutes from "./src/routes";
import connectDatabase from "./src/config/connectDatabase";

const app = express();
app.use(
  cors({
    // origin: process.env.CLIENT_URL,
    // origin:"*",
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Serve static files from shared_assets
app.use('/assets', express.static(path.join(__dirname, '../shared_assets')));

initRoutes(app);
connectDatabase();

const port = process.env.PORT || 5000;
const listener = app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on the port ${listener.address().port}`);
});
