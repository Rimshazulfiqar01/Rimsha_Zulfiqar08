const express = require("express");
const server = express();

const comment = require("./models/comment"); 
const viewcomment = require("./routes/viecomment");

server.use(express.static("public"));
server.use(express.urlencoded());
server.use(express.json());


server.set("view engine", "ejs");
server.use("/viewcomment", viewcomment)


server.get("/comments", async (req, res) => {
  try {
    const comments = await comment.find();
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


server.get("/comment/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const foundcomment = await comment.findById(id);
    if (!foundcommentl) {
      return res.status(404).json({ error: "comment not found" });
    }
    res.json(foundcommentl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


server.post("/comment", async (req, res) => {
  try {
    const newcomment = new comment(req.body);
    await newcomment.save();
    res.status(201).json(newcomment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE a comment
server.delete("/comment/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedcomment = await comment.findByIdAndDelete(id);
    if (!deletedcomment) {
      return res.status(404).json({ error: "comment not found" });
    }
    res.json(deletedcomment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// update comment
server.put("/comment/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedcomment = await comment.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedcomment) {
      return res.status(404).json({ error: "comment not found" });
    }
    res.json(updatedcomment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

server.listen(3000, () => {
  console.log("Server Started, Visit localhost:3000");
});

const mongoose = require("mongoose");
mongoose
  .connect('mongodb://127.0.0.1:27017/commentinglist', { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB!"))
  .catch((error) => console.log(error.message));
