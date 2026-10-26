import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { alterarControlador } from "../config/db.js";
import { controladorDB } from "../config/db.js";

const app = express();
const port = 4444;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
    res.sendFile(path.resolve(__dirname, "../../front/index.html"));

});

app.get("/validar", async (req, res) => {
    const visible = await controladorDB();
    console.log(visible)
    res.json({ visible: visible })
})

app.post("/", async (req, res) => {
    console.log("Requisição recebida!");

    const valor = req.body.ativo;
    console.log("Valor recebido:", valor);

    await alterarControlador(valor);

    res.json({ received: true });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

