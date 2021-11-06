const express = require('express')
const fs = require('fs')

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.set('view engine', 'pug')
app.set('views', './views')

const container = require('./contend')

// CODE
// PROYECT-
const writeFileAsync = async (arr, nameFile) => {
    await fs.promises.writeFile(
      nameFile,
      JSON.stringify(arr, null, 2),
      "utf-8"
    );
  }; 
  
  const readFileAsync = async (nameFile) => {
    let file = await fs.promises.readFile(nameFile, "utf-8");
    return file;
  };
  
  const truncateAsync = async (nameFile) => {
    await fs.promises.truncate(
      nameFile, 0, function() {
  
      }
    )
  }
  // PROYECT-

  let contenedor = new container.Contenedor("./productos.txt");

// Exportar
module.exports.contenedor = contenedor
module.exports.writeFileAsync = writeFileAsync
module.exports.readFileAsync = readFileAsync
module.exports.truncateAsync = truncateAsync 
  

// Rutas
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/productos', async (req, res) => {
    let productos = await contenedor.getAll() 
    console.log(productos)
    res.render("productos", {data: productos})
})

app.post("/", async (req, res) => {
    req.body.price = Number(req.body.price)                                                                                                                                                                      
      await contenedor.save(req.body)  
    console.log("Send")
    res.render("index")
  })


app.listen(port, () => {
    console.log('Server running on port ' + port)
})