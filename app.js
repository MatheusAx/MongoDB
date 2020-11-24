//importar o modulo do express e vincular a uma constante de mesmo
//nome. Esse modulo nos ajuda a subir o servidor do node.js
const express = require("express");

// Vamos criar um app para representar o servidor e fazer as suas
// execuções
const app = express();

//Vamos importar o modulo do Mongoose para realizar as tarefas
// com o banco de dados
const mongoose = require("mongoose");

//Importação do modulo body-parser para realizar a conversão dos
//dados vindos do cliente para o formato json
const bodyParser = require("body-parser");
//Utilização do body-parser na nossa aplicação
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://matheus:Helena@bancoapi.rugmg.mongodb.net/atividade?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Abaixo a criação da estrutura da tabela para cadastrar
// os clientes. Estamos usando o comando schema para criar
const tabela = new mongoose.Schema({
  nomecliente: String,
  email: String,
  telefone: String,
  cpf: String,
  idade: { type: Number, min: 16, max: 100 },
  datacadastro: { type: Date, default: Date.now },
});

//Construindo a tabela
const Cliente = mongoose.model("Cliente", tabela);

/*
CRUD
C -> Create (insert)
R -> Read (select)
U -> Update (Update Atualizar)
D -> Delete (Delete Apagar)
*/

//Rotas para aplicação
//GET
app.get("/", (req, res) => {
  res.send("Você está no metodo Get");
});

//POST
app.post("/cadastro", (req, res) => {
  const dados = new Cliente(req.body);
  dados
    .save()
    .then(() => res.send("Cliente cadastrado com sucesso!"))
    .catch((erro) => console.error(`Erro ao tentar cadastrar ${erro}`));
});

//PUT
app.put("/atualizar", (req, res) => {
  res.send("Você está no metodo put");
});

//DELETE
app.delete("/apagar", (req, res) => {
  res.send("Você está no metodo delet");
});

app.listen(3000);
console.log("Servidor online...");
