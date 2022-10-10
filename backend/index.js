const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());


app.use(cors());

const TodoItemRoute = require('./routes/todoItems');

mongoose.connect(`mongodb://localhost:27017/todolist`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(()=> console.log("Database connected"))
.catch(err => console.log(err))


app.use('/', TodoItemRoute);

app.listen(9000, ()=> console.log("Server connected") );