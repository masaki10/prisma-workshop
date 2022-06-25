import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/users", async (req, res) => {
  const result = await prisma.user.findMany();
  res.json(result)
});

app.post(`/signup`, async (req, res) => {
  const { name, email } = req.body;

  const result = await prisma.user.create({
    data: {name: name, email: email},
  });

  res.json(result)
});

app.post(`/post`, async (req, res) => {
  const { title, content, authorEmail } = req.body;

  const result = await prisma.post.create({
    data: {
      title: title, 
      content: content, 
      author: {
        connect: {
          email: authorEmail,
        }
      }
    },

  });

  res.json(result)
});

app.put("/post/:id/views", async (req, res) => {
  const { id } = req.params;

  const result = await prisma.post.update({
    where: {id: parseInt(id)},
    data: {
      viewCount: {
        increment: 1,
      }
    },
  });

  res.json(result)
});

app.put("/publish/:id", async (req, res) => {
  const { id } = req.params;

  const result = await prisma.post.update({
    where: {id: Number(id)},
    data: {published: true},
  });

  res.json(result)
});

app.get("/user/:id/drafts", async (req, res) => {
  const { id } = req.params;

  const result = await prisma.user.findUnique({
    where: {id: Number(id)},
  }).posts({
    where: {published: false},
  });

  res.json(result)
});

app.get(`/post/:id`, async (req, res) => {
  const { id } = req.params;

  const result = await prisma.post.findUnique({
    where: {id: Number(id)},
  });

  res.json(result)
});

app.get("/feed", async (req, res) => {
  const { searchString, skip, take } = req.query;

  const or = searchString ? {
    OR: [
      {title: {contains: searchString as string}},
      {content: {contains: searchString as string}},
    ]
  } : {};

  console.log(or);

  const result = await prisma.post.findMany({
    skip: Number(skip) || undefined,
    take: Number(take) || undefined,
    where: {
      published: true,
      ...or,
    }
  });

  res.json(result)
});

app.listen(3001, () =>
  console.log(`🚀 Server ready at: http://localhost:3001`)
);
