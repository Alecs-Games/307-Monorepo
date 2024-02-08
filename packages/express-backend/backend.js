// backend.js
import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;
const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};
const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};
const deleteUser = (user) => {
  const index = users["users_list"].indexOf(user);
  if (index == -1) {
    return -1;
  }
  users["users_list"].splice(index, 1);
  return user;
};
app.use(express.json());

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  userServices.findUserById(id).then((user) => {
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
  });
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  userServices.getUsers(name, job).then((result) => {
    res.send(result);
  });

  /*let value = { users_list: [] };
  value["users_list"] = users["users_list"];
  const name = req.query.name;
  const job = req.query.job;
  if (name != undefined) {
    value["users_list"] = value["users_list"].filter(
      (user) => user["name"] === name
    );
  }
  if (job != undefined) {
    value["users_list"] = value["users_list"].filter(
      (user) => user["job"] === job
    );
  }
  res.send(value);*/
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userServices.addUser(userToAdd).then((user) => {
    res.status(201);
    res.send(user);
  });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  userServices
    .deleteUserById(id)
    .then((user) => {
      if (user == undefined) {
        res.status(404);
      } else {
        res.status(204);
      }
      res.send();
    })
    .catch((err) => {
      console.log(err);
      res.status(404);
      res.send();
    });

  /*userServices.findUserById(id).then((user) => {
    if (user == undefined) {
      res.status(404);
    } else {
      deleteUser(user);
      res.status(204);
    }
    console.log(res.status);
    res.send();
  });*/
});
