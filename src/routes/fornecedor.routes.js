import { Router } from "express";
import fornecedorController from "../controller/fornecedor.controller.js";

const fornecedorRouter = Router();

fornecedorRouter.post("/fornecedor", fornecedorController.createfornecedorController);
fornecedorRouter.get("/fornecedor", fornecedorController.findAllfornecedorController);
fornecedorRouter.get("/fornecedor/:id", fornecedorController.findfornecedorByIdController);
fornecedorRouter.put("/fornecedor/:id", fornecedorController.updatefornecedorController);
fornecedorRouter.delete("/fornecedor/:id", fornecedorController.deletefornecedorController);

export default fornecedorRouter;
