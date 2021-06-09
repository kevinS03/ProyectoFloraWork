
var express = require("express");
var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Pase el nombre del directorio que contiene los activos estáticos a la función de middleware express.static para empezar directamente el servicio de los archivos./
app.use(express.static("html")); 

//app.post (ruta, devolución de llamada [, devolución de llamada ...])
app.post("/validarDatos",function(req,res){
    var usuario = req.body.user;
    var contra = req.body.pass;
    if(usuario == "admin@admin.com" && contra =="123456") {
        res.redirect("/principal");
    }else{
        res.redirect("/error");
    }
})

app.get("/principal",function(req,res){
    res.redirect("/pages/panel.html");
});

app.get("/error",function(req,res){
    res.send("Error al entrar");
});

app.listen(3000,function(){
    console.log("Esta corriendo en el server");
});
