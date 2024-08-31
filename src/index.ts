import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const PORT = process.env.PORT || 8000;
const prisma = new PrismaClient({
  log: ["query", "error"],
});

//middlewares
app.use(express.json());

// root first route
app.get("/", (req, res) => {
  res.send({
    msg: "hello world",
  });
});

// get all books
app.get("/books", async (req, res) => {
  const allBooks = await prisma.books.findMany();
  res.json(allBooks);
});

// get single book
app.get("/books/:id", async (req, res) => {
  const { id } = req.params;

  const findBook = await prisma.books.findUnique({
    where: { id: id },
  });
  res.json(findBook);
});

// create a book entry
app.post("/books", async (req, res) => {
  await prisma.books.create({
    data: req.body,
  });
  res.json({
    success: true,
  });
});

// update a single book entry
app.put("/books/:id", async (req, res) => {
  const { id } = req.params;
  const updateBook = await prisma.books.update({
    where: {
      id: id,
    },
    data: req.body,
  });

  res.json(updateBook);
});

// delete a book entry
app.delete("/books/:id", async (req, res) => {
  const { id } = req.params;
  const deleteBook = await prisma.books.delete({
    where: {
      id: id,
    },
  });

  res.json(deleteBook)
});

try {
  app.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
  });
} catch (error) {
  console.error("Error:", error);
}
