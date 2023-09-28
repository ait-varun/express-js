npm init
npm i express
npm i --save-dev nodemon --> Its saves nodemon as dev dependency

"scripts": {
"devStart": "nodemon app.js"
},

//app.js
const express = require("express");
const app = express();
const port = 3000;

// this on client
app.get("/", (req, res) => {
res.send({
message: "Hello Get",
});
});

// this on server
app.listen(port, () => {
console.log(`Example app listening on port ${port}`);
});
