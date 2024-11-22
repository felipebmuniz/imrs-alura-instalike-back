import "dotenv/config";
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Conecta ao banco de dados usando a string de conexão do ambiente
const connection = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts do banco de dados
export const getAllPosts = async () => {
  // Seleciona o banco de dados "imersao-instabytes"
  const db = connection.db("imersao-instabytes");
  // Seleciona a coleção "posts" dentro do banco de dados
  const collection = db.collection("posts");

  // Busca todos os documentos da coleção e retorna como um array
  return collection.find().toArray();
};

export const createPost = async (newPost) => {
  const db = connection.db("imersao-instabytes");
  const collection = db.collection("posts");

  return collection.insertOne(newPost);
};

export const updatePost = async (id, update) => {
  const db = connection.db("imersao-instabytes");
  const collection = db.collection("posts");

  const objID = ObjectId.createFromHexString(id);

  return collection.updateOne(
    { _id: new ObjectId(objID) },
    {
      $set: update,
    },
  );
};
