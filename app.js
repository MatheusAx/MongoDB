//importar o modulo do express e vincular a uma constante de mesmo
//nome. Esse modulo nos ajuda a subir o servidor do node.js
const express = require("express");

//Importação do modulo do cors para fazer a CROSS-PLATAFORM
//assim protocolos de origens diferentes podem acessar o conteúdo deste servidor
const cors = require("cors");

// Vamos criar um app para representar o servidor e fazer as suas
// execuções
const app = express();

//Ativar o cors para ser utilizado
app.use(cors());


//Configurando cors para aceitar as diversas origens
const corsConfig = {
  origin: "*",
  optionsSuccessstatus: 200
};

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
app.get("/", cors(corsConfig) , (req, res) => {
  Cliente.find((erro, dados) => {
    if (erro) console.error(`Erro ao tentar listar os clientes ${erro}`);
    res.status(200).send({ saida: dados });
  });
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
app.put("/atualizar/:id", (req, res) => {
  Cliente.findByIdAndUpdate(req.params.id,req.body,{new:true},(erro,dados)=>{
    if(erro){
      res.status(400).send({resultado:`Erro ao tentar atualizar ${erro}`})
      return
    }
    res.status(200).send({resultado:dados});

  })


});

//DELETE
app.delete("/apagar/:id", (req, res) => {
  Cliente.findByIdAndDelete(req.params.id,(erro,dados)=>{
    if(erro) console.error(`Erro ao tentar apagar ${erro}`);

    res.status(200).send({ resultado: "Apagado"})
  });
});



//Rota para consultar um cliente por Id

app.get("/:id",(req,res) => {
  Cliente.findById(req.params.id, (erro, dados) => {
    if (erro) {
      res
        .status(400)
        .send({rs: `Erro ao tentar consultar um cliente ${erro}`});
      return;
    }
    res.status(200).send({ rs: dados});
  });
});



app.listen(3001);
console.log("Servidor online...");
