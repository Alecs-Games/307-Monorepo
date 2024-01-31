// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;
const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};
const addUser = (user) => {
  user["id"] = Math.round(Math.random() * 10000).toString();
  users["users_list"].push(user);
  return user;
};
const deleteUser = (user) => {
  const index = users["users_list"].indexOf(user);
  users["users_list"].splice(index, 1);
  return user;
};

app.use(cors());
app.use(express.json());

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});


app.get("/users", (req, res) => {
  let value = {"users_list": []}
  value["users_list"] = users["users_list"];
  const name = req.query.name;
  const job = req.query.job;
  if(name != undefined){
    value["users_list"] = value["users_list"].filter(
      (user) => user["name"] === name);
  }
  if(job != undefined){
    value["users_list"] = value["users_list"].filter(
      (user) => user["job"] === job);
  }
  res.send(value)
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  let user = addUser(userToAdd);
  res.status(201);
  res.send(user);
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  let user = findUserById(id);
  deleteUser(user)
  res.send();
});
