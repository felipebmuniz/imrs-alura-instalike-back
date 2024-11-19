import express from "express";

const posts = [
  {
    id: 1,
    description: "Gato millie",
    image: "https://placecats.com/millie/300/150",
    createDate: "2023-11-22",
  },
  {
    id: 2,
    description: "Gato persa branco",
    image: "https://placecats.com/persian/300/150",
    createDate: "2023-11-22",
  },
  {
    id: 3,
    description: "Gatinho siamês brincando",
    image: "https://placecats.com/siamese/300/150",
    createDate: "2023-11-22",
  },
  {
    id: 4,
    description: "Gata tigrada dormindo",
    image: "https://placecats.com/tabby/300/150",
    createDate: "2023-11-22",
  },
  {
    id: 5,
    description: "Gato maine coon gigante",
    image: "https://placecats/mainecoon/300/150",
    createDate: "2023-11-22",
  },
  {
    id: 6,
    description: "Gatinho preto e branco",
    image: "https://placecats/tuxedo/300/150",
    createDate: "2023-11-22",
  },
];

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Servidor escutando...");
});

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

const getPostID = (id) => {
  return posts.findIndex((post) => post.id === Number(id));
};

app.get("/posts/:id", (req, res) => {
  const index = getPostID(req.params.id);

  if (index >= 0) {
    res.status(200).json(posts[index]);
  } else {
    res.status(404).json({ error: "Post não encontrado" });
  }
});
