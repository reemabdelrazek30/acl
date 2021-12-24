const express = require("express");

const app = express();

app.use(express.json());

const fakeDB = [
    {
      id: Math.floor(Math.random() * 100),
      email: "test@example.com",
    },
  ];
  
  app.get("/test", (req, res) => {
    return res.status(200).json({ data: fakeDB });
  });
  
  app.post("/send", (req, res) => {
    fakeDB.push({
      id: Math.floor(Math.random() * 100),
      email: req.body.email,
    });
    return res.status(201).json({ data: fakeDB });
  });
  
  app.put("/update/:id", (req, res) => {
    const obj = fakeDB.find((el) => el.id === Number(req.params.id));
    obj.email = req.body.email;
    return res.status(200).json({ data: fakeDB });
  });
  
  app.delete("/destroy/:id", (req, res) => {
    const i = fakeDB.findIndex((el) => el.id === Number(req.params.id));
    fakeDB.splice(i, 1);
    return res.status(200).json({ data: fakeDB });
  });
  module.exports = app;
