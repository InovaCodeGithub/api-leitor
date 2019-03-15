const express = require('express')
const fs = require('fs');
const math = require('mathjs')
const app = express()
var content



app.get('/postRead/:idLeitor/:idTag', async (req,res) => {
  if (req.params.idTag == 0 || req.params.idTag == "") {
    var stream = await fs.createWriteStream(req.params.idLeitor + ".txt", {flags: 'w'});
    stream.once('open', (fd) => {
      stream.write("");
      stream.end();
    });
  }
  else
  {
    var stream = await fs.createWriteStream(req.params.idLeitor + ".txt", {flags: 'a'}, 666);
    var dt   = new Date();
    var hoje = ("0" + dt.getDate()).slice(-2) + "/" + ("0" + (dt.getMonth() + 1)).slice(-2) + "/" + dt.getFullYear()
    var hora = ("0" + dt.getHours()).slice(-2) + ":" + ("0" +dt.getMinutes()).slice(-2) + ":" + ("0" +dt.getSeconds()).slice(-2)
    stream.once('open', (fd) => {
      stream.write(hoje + ";" + hora + ";" + req.params.idTag + "^" + "\n");
      stream.end()
    });
  }
})


app.get('/getRead/:idLeitor', async (req,res) => {
   await fs.readFile(req.params.idLeitor + ".txt", function(err,data){
    if(err){
      throw err
    }
    content = data
    res.end(content)
  })  
})


app.get('/a/:a/:b/:c', async (req,res) => {
 const a = await math.sum(req.params.a,req.params.b, req.params.c)
 console.log(a)
 res.json(a)
})


function interval(){
    console.log("Inova API");
}

setInterval(function(){
    interval()}, 30000)

app.listen(8080)

// Bão ! Agora é o seguinte, tente simular algo que faça cair esse app. Imagine que coloque dentro um get com 3 parâmetros e vc tente somar esses parâmetros, mas um deles veio string.. este timer não poderar cair