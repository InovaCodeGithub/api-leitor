const request = require('request')
const express = require('express')
const parseString = require("xml2js").parseString
 var fs = require('fs');
const app = express()
var content

// app.get('/a/:a/:b', (req,res) => {

 

//   fs.writeFile("resultado.txt", req.params.idTag + " ^ " + req.params.idLeitor, function(err) {
//       if(err) {
//           return console.log(err);
//       }
//       console.log("File saved successfully!");
//   });

// })


app.get('/postRead/:idLeitor/:idTag', (req,res) => {


if (req.params.idTag == 0 || req.params.idTag == "") {

  var stream = fs.createWriteStream(req.params.idLeitor + ".txt", {flags: 'w'});
  stream.once('open', (fd) => {
      stream.write("");

      stream.end();
  });
}else{

  var stream = fs.createWriteStream(req.params.idLeitor + ".txt", {flags: 'a'}, 666);
  var dt   = new Date();
  var hoje = ("0" + dt.getDate()).slice(-2) + "/" + ("0" + (dt.getMonth() + 1)).slice(-2) + "/" + dt.getFullYear()
  var hora = ("0" + dt.getHours()).slice(-2) + ":" + ("0" +dt.getMinutes()).slice(-2) + ":" + ("0" +dt.getSeconds()).slice(-2)

  stream.once('open', (fd) => {
      stream.write(hoje + ";" + hora + ";" + req.params.idTag + "^" + "\n");

      stream.end()
      
  });

}
})


app.get('/getRead/:idLeitor', (req,res) => {
  fs.readFile(req.params.idLeitor + ".txt", function(err,data){
    if(err){
      throw err
    }
    content = data
    res.end(content)

  })  
})


app.listen(3000)