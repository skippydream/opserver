const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let userData = {}; // Simula il database in memoria

app.post("/sync", (req, res) => {
    const { key, value } = req.body;
    userData[key] = value;
    res.json({ success: true });
});

app.get("/sync/:key", (req, res) => {
    res.json({ value: userData[req.params.key] ?? null });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server attivo su porta ${PORT}`));
