const express = require("express");
const cors = require('cors');
const bodyparser = require("body-parser");
const authroute = require("./routes/auth");
const tokenroute = require("./routes/token");
const stockroute = require("./routes/stock");
const swaproute = require("./routes/swap")

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyparser.json());
app.get("/", (req, res) => {
  res.send("Brics API");
});



app.use("/api/user", authroute);
app.use("/api/token", tokenroute);
app.use("/api/stock", stockroute);
app.use("/api/swap", swaproute)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
