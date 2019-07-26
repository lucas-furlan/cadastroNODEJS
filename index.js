const express = require('express');
//qualquer coisa usada no express será usada pela variavel app
const app = express(); //variavel app recebe func express(), q vem do mod express
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const Post = require('./models/Post')


//config
  //Template Engine
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
  //Body-parser
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

//ROTAS
  app.get('/', function(req, res){
    Post.findAll().then(function(posts){
      res.render('home', {posts: posts})
    })
  })

  app.get('/cad', function(req, res){
    res.render('formulario')
  })

  app.post('/add', function(req, res){
    Post.create({
      titulo: req.body.titulo,
      conteudo: req.body.conteudo
    }).then(function(){
      res.redirect('/')
    }).catch(function(erro){
      res.send("OUVE UM ERRO")
    })
  })

app.get('/deletar/:id', function(req, res){
  Post.destroy({where: {'id': req.params.id}}).then(function(){
    res.send("Postagem deletada com sucesso!")
  }).catch(function(erro){
    res.send("Postagem n foi deletada!"+erro)
  }) //pegar o id q vem na rota
})

app.listen(8081, function(){
  console.log("Servidor rodando na URL localhost:8081")
});
