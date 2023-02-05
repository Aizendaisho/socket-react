const express = require("express")

const app = express()

const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>{
    console.log(`se escucha en el puerto ${PORT}`)
})