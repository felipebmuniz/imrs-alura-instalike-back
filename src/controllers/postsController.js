import fs from "fs"; // Importa o módulo fs para operações de sistema de arquivos
import { createPost, getAllPosts, updatePost } from "../models/postsModel.js"; // Importa funções para criar e obter todos os posts
import gerarDescricaoComGemini from "../services/geminiService.js";

export const listPosts = async (req, res) => {
  // Obtém todos os posts usando a função getAllPosts
  const posts = await getAllPosts();
  // Envia os posts como resposta JSON com status 200 (OK)
  res.status(200).json(posts);
};

export const createNewPosts = async (req, res) => {
  const newPost = req.body; // Obtém o novo post do corpo da requisição

  try {
    // Cria o novo post usando a função createPost
    const post = await createPost(newPost);
    // Envia o post criado como resposta JSON com status 200 (OK)
    res.status(200).json(post);
  } catch (error) {
    // Em caso de erro, registra o erro no console e envia uma resposta de erro
    console.error(error.message);
    res.status(500).json({ error: "Falha na requisição" });
  }
};

export const updatePostByID = async (req, res) => {
  const postID = req.params.id;
  const newPost = req.body;

  try {
    // Cria o novo post usando a função updatePost
    const post = await updatePost(postID, newPost);
    // Envia o post atualizado como resposta JSON com status 200 (OK)
    res.status(200).json(post);
  } catch (error) {
    // Em caso de erro, registra o erro no console e envia uma resposta de erro
    console.error(error.message);
    res.status(500).json({ error: "Falha na requisição" });
  }
};

export const uploadImage = async (req, res) => {
  // Cria um objeto com informações da imagem, incluindo o nome do arquivo
  const newImage = {
    description: "",
    imgUrl: req.file.originalname,
    alt: "",
  };

  try {
    // Cria o post da imagem usando a função createPost
    const image = await createPost(newImage);
    // Renomeia o arquivo para incluir o ID do post
    const updateImage = `uploads/${image.insertedId}.png`;
    fs.renameSync(req.file.path, updateImage);
    // Envia o post da imagem como resposta JSON com status 200 (OK)
    res.status(200).json(image);
  } catch (error) {
    // Em caso de erro, registra o erro no console e envia uma resposta de erro
    console.error(error.message);
    res.status(500).json({ error: "Falha na requisição" });
  }
};

export const updateUploadByID = async (req, res) => {
  const postID = req.params.id;
  const urlImage = `http://localhost:3000/${postID}.png`;

  try {
    const imageBuffer = fs.readFileSync(`uploads/${postID}.png`);
    const description = await gerarDescricaoComGemini(imageBuffer);

    const newPost = {
      description: description,
      imgUrl: urlImage,
      alt: req.body.alt,
    };

    // Cria o novo post usando a função updatePost
    const post = await updatePost(postID, newPost);
    // Envia o post atualizado como resposta JSON com status 200 (OK)
    res.status(200).json(post);
  } catch (error) {
    // Em caso de erro, registra o erro no console e envia uma resposta de erro
    console.error(error.message);
    res.status(500).json({ error: "Falha na requisição" });
  }
};
