import express from "express"; // Importa o framework Express para criar aplicações web
import multer from "multer"; // Importa o middleware Multer para lidar com uploads de arquivos
import cors from "cors";

import {
  createNewPosts, // Importa a função para criar novos posts
  listPosts, // Importa a função para listar todos os posts
  uploadImage, // Importa a função para lidar com o upload de imagens
  updatePostByID,
  updateUploadByID,
} from "../controllers/postsController.js"; // Importa funções controladoras do arquivo postsController.js

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200,
};

// Configura o armazenamento para o Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define o diretório de destino para os arquivos carregados (./uploads/)
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Mantém o nome original do arquivo durante o upload
    cb(null, file.originalname);
  },
});

// Cria uma instância do Multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage });

// Função para configurar as rotas da aplicação Express
const routes = (app) => {
  // Habilita o parser JSON para o servidor Express
  app.use(express.json());
  app.use(cors(corsOptions));

  // Rota GET para obter todos os posts
  app.get("/posts", listPosts);

  // Rota POST para criar um novo post
  app.post("/posts", createNewPosts);

  app.put("/posts/:id", updatePostByID);

  // Rota POST para fazer upload de uma imagem
  app.post("/upload", upload.single("image"), uploadImage);

  app.put("/upload/:id", updateUploadByID);
};

export default routes; // Exporta a função de rotas para ser utilizada na aplicação principal
