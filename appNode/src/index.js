

  const express = require('express');
  const cors =require("cors")
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
app.use(cors ({

  origin:"*",
}) );
const mongoURI = 'mongodb+srv://mohamed:mk123456@cluster0.dxkopeq.mongodb.net/curd';

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const user = mongoose.model('user', {
    first_name: String,
    last_name: String,
    email:String,
    password:String,
    age:String 
});

app.post('/api/user', (req, res) => {
  const newuser = new user(req.body);
  newuser.save()
    .then(_user => res.json(_user))
    .catch(err => res.status(400).json({ error: err.message }));
});

app.get('/api/user', (req, res) => {
    user.find()
    .then(_user => res.json(_user))
    .catch(err => res.status(400).json({ error: err.message }));
});

app.get('/api/user/:id', (req, res) => {
    user.findById(req.params.id)
    .then(_user => res.json(_user))
    .catch(err => res.status(400).json({ error: err.message }));
});

app.put('/api/user/:id', (req, res) => {
  console.log(req.params.id)
    user.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(_user => res.json("user modify successfully"))
    .catch(err => res.status(400).json({ error: err.message }));
});

app.delete('/api/user/:id', (req, res) => {
    user.findByIdAndRemove(req.params.id)
    .then(() => res.json({ message: 'user deleted' }))
    .catch(err => res.status(400).json({ error: err.message }));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
