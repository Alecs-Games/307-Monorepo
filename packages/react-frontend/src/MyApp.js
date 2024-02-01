// src/MyApp.js
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
    function postUser(person) {
      const promise = fetch("Http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
      return promise;
    }
    function fetchUsers() {
      const promise = fetch("http://localhost:8000/users");
      return promise;
    }
    useEffect(() => {
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => { console.log(error); });
    }, [] );
    const [characters, setCharacters] = useState([]);
    function updateList(person) { 
      postUser(person)
        .then((response) => {
          if(response.status == 201){
            response.json().then((json) => { 
              setCharacters([...characters, json]);
            }
            );
          }else{
            console.log("Failed to post user: Response status:" + response.status)
          }
        })
        .catch((error) => {
          console.log(error);
        })
    }
    function removeOneCharacter(index) {
      fetch("Http://localhost:8000/users/" + characters[index]["id"], {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([characters[index]["id"]]),
      }).then((response) => {
        if(response.status == 204){
          console.log("success!");
          const updated = characters.filter((character, i) => {
            return i !== index;
          });
          setCharacters(updated);
        }else{
          console.log("Failed to post user::: Response status:" + response.status)
        }
      });
    }
    return (
        <div className="container">
          <Table
            characterData={characters}
            removeCharacter={removeOneCharacter}
          />
          <Form handleSubmit={updateList} />
        </div>
      );
}

export default MyApp