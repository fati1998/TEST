const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var express = require("express");
var router = express.Router();
const Thing = require('./models/thing');
mongoose.connect('mongodb+srv://admin:admin@cluster0.3uhn0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
/*
mongoose.connect("mongodb://localhost:27017/node-demo",  { useUnifiedTopology: true, useNewUrlParser: true  })
.then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

*/
const pino = require('express-pino-logger')();

let elt_index = 0;

let Users = {list:[{
      index: 0,user: {
      Nom: 'KERDAD',
      Prenom: 'Alice',
      Email: 'blabla@dsok.fr',
      Tel: '0751588418',},
      
    }, {
      index : 1,user :{
      Nom: 'KERDAD',
      Prenom: 'Alice',
      Email: 'blabla@dsok.fr',
      Tel: '0751588418',},
      
    } ]};

function update(){
  
  for (let i = 0, len = Users.list.length; i < len; ++i) {
      Users.list[i].index=i;
 
}
}


router.get("/user", (req, res) => {


  res.send(Users.list[elt_index]);
});

router.get("/", function(req,res, next){
	
	res.send(Users);
});

router.use(bodyParser.urlencoded({ extended: true }));
router.use(pino);

router.post("/", (req, res) => {
 /*
    const thing = new Thing( { index : 1, user:{
    Nom: req.body.Nom,
    Prenom: req.body.Prenom,
    Email: req.body.Email,
    Tel: req.body.Tel
  })};
  thing.save()
  .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
  .catch(error => res.status(400).json({ error }));
*/
 const newUser = {
    Nom: req.body.Nom,
    Prenom: req.body.Prenom,
    Email: req.body.Email,
    Tel: req.body.Tel
  };   
  Users.list.push({index: Users.list.length , user: newUser});
  console.log(newUser);

  res.send({newUser});
});

router.post("/validate", (req, res) => {
  
  const userModified = req.body;

  Users.list[elt_index].user = userModified;
  console.log(userModified);

  res.send(req.body);
});
 


router.post("/modify", (req, res) => {
  
  const index = req.body;  
  
  const i = index['index'];
  elt_index= i;
 
  console.log(i);

  res.send(index);
});


router.post("/delete", (req, res) => {
  
  const index = req.body;  
  
  const i = index['index'];
  Users.list.splice(i,1);
  update();
  console.log(i);

  res.send(index);
});
module.exports=router;

