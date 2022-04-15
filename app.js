const express = require("express");
const { listenerCount } = require("process");

const app = express();

const PORT = process.env.posrt || 3000;

let list = [
  {
    id: 1,
    name: "Bussiness 1",
    priority: 1,
    completed: false,
  },
  {
    id: 2,
    name: "Bussiness 2",
    priority: 2,
    completed: false,
  },
];

app.use(express.json());
app.get("/api", (req, res, next) => {
  if (list.length == 0) {
    res.send("You don't have any bussinesses to do.");
  } else {
    res.send(list);
  }
});

app.get("/api/:priority", (req, res, next) => {
  let filtered = [];

  if (list.length !== 0) {
    filtered = list.filter((obj) => obj.priority == req.params.priority);
  }
  filtered.length == 0
    ? res.send("There is no items with required priority.")
    : res.send(filtered);
});

app.post("/api", (req, res, next) => {
  list.push(req.body);
  res.status(200).send(req.body);
});

app.delete("/api/:id", (req, res, next) => {
  list.map((el, i) => {
    if (el.id == parseInt(req.params.id)) {
      list.splice(i, 1);
    }
    res.send("You deleted the item.");
  });
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}...`);
});
