import express from "express";
import fornecedorRouter from "./src/routes/fornecedor.routes.js";

const app = express();

app.use(express.json());
app.use("/api", fornecedorRouter);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000...");
});
