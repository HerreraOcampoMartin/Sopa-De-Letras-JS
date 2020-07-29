
var seleccionando = false, listaLetras = [], palabras = [], encontradas = 0;

elegirPalabras();

for(var i = 0; i < 15; i++){
    for(var j = 0; j < 15; j++){
        var nueva_etq = document.createElement("div");
        nueva_etq.setAttribute("class", "letra");
        nueva_etq.textContent = letraRandom().toUpperCase();
        nueva_etq.addEventListener("mousedown", eventoPresionar);
        nueva_etq.addEventListener("mouseup", eventoSoltar);
        nueva_etq.addEventListener("mouseover", eventoMouseOver);
        document.getElementById("sopa").append(nueva_etq);
    }
}

colocarPalabras();

function letraRandom(){
    var numero = parseInt(Math.random() * (28 - 1) + 1), letra;
    switch(numero){
        case 1:
            letra = "a";
            break;
        case 2:
            letra = "b";
            break;
        case 3:
            letra = "c";
            break;
        case 4:
            letra = "d";
            break;
        case 5:
            letra = "e";
            break;
        case 6:
            letra = "f";
            break;
        case 7:
            letra = "g";
            break;
        case 8:
            letra = "h";
            break;
        case 9:
            letra = "i";
            break;
        case 10:
            letra = "j";
            break;
        case 11:
            letra = "k";
            break;
        case 12:
            letra = "l";
            break;
        case 13:
            letra = "m";
            break;
        case 14:
            letra = "n";
            break;
        case 15:
            letra = "ñ";
            break;
        case 16:
            letra = "o";
            break;
        case 17:
            letra = "p";
            break;
        case 18:
            letra = "q";
            break;
        case 19:
            letra = "r";
            break;
        case 20:
            letra = "s";
            break;
        case 21:
            letra = "t";
            break;
        case 22:
            letra = "u";
            break;
        case 23:
            letra = "v";
            break;
        case 24:
            letra = "w";
            break;
        case 25:
            letra = "x";
            break;
        case 26:
            letra = "y";
            break;
        case 27:
            letra = "z";
            break;
    }
    return letra;
}
function eventoPresionar(e){
    seleccionando = true;
    if(e.target.style.color != "blue"){
        e.target.style.color = "black";
        e.target.style.backgroundColor = "white";
    }
    listaLetras.push(e.target);
}
function eventoSoltar(){
    seleccionando = false;
    var palabraSeleccionada = "";
    for(var i = 0; i < listaLetras.length; i++){
        palabraSeleccionada += listaLetras[i].textContent;
        if(listaLetras[i].style.color != "blue"){
            listaLetras[i].style.color = "white";
            listaLetras[i].style.backgroundColor = "red";
        }
    }
    for(var i = 0; i < 8; i++){
        if(palabraSeleccionada == palabras[i]){
            console.log("Palabra encontrada: "+palabraSeleccionada);
            for(var j = 0; j < listaLetras.length; j++){
                listaLetras[j].style.color = "blue";
                listaLetras[j].style.backgroundColor = "white";
                listaLetras[j].disabled = true;
                palabras[i] += ".";
            }
            document.getElementById("palabra"+(i+1)).style.textDecoration = "line-through";
            break;
        }
    }
    for(var i = 0; i < 8; i++){
        var e = 0
        if(document.getElementById("palabra"+(i+1)).style.textDecoration == "line-through"){
            e++;
        }
        if(e == 7){
            ganar;
        }
    }
    listaLetras = [];
}
function eventoMouseOver(e){
    if(seleccionando && e.target.style.color != "blue"){
        e.target.style.color = "black";
        e.target.style.backgroundColor = "white";
        listaLetras.push(e.target);
    }
}
function elegirPalabras(){
    listaPalabras = ["GATO", "PERRO", "PANTALLA", "BOTELLA", "MUSICA", "LLAVE", "OCEANO", 
    "GUITARRA", "AZUL", "IMPRESORA", "BOTON", "CONTENEDOR", "FUNCION", "CEPILLO", "BRAZO",
    "PAÑUELO", "NUMERO", "CARTEL", "CONTINENTE", "AMERICA", "EUROPA", "OCEANIA", "ASIA", 
    "AFRICA", "ANTARTIDA", "ARGENTINA", "BRASIL", "FRANCIA", "INGLATERRA", "ALEMANIA", 
    "CANADA", "MONTAÑA", "ARENA", "TIERRA", "METAL", "TECLADO", "ALUMINIO", "PIRAMIDE"];

    for(var i = 0; i < 8; i++){
        palabras.push(listaPalabras[parseInt(Math.random() * listaPalabras.length)]);
        console.log(palabras[i]);
    }

}
function colocarPalabras(){
    for(var i = 0; i < 8; i++){
        var colocada = false;
        while(colocada == false){
            var direccion = getDireccion();
            if(direccion == 0){
                colocada = colocarHorizontal(i);
            }else{
                colocada = colocarVertical(i);
            }
        }
        anadirALista(palabras[i], i+1);
    }
}
function anadirALista(palabra, num){
    document.getElementById("palabra"+num).textContent = palabra;
}
function colocarHorizontal(i){
    var etqs = document.getElementsByClassName("letra"), x, y;
        //HORIZONTAL
        x = parseInt(Math.random() * (14 - palabras[i].length));
        y = parseInt(Math.random() * 14);
        for(var j = 0; j < palabras[i].length; j++){
            if(etqs[x*15+y].className == "letra usada"){
                return false;
            }
            etqs[x*15+y].textContent = palabras[i][j];
            etqs[x*15+y].className = "letra usada";
            x += 1;
        }
    return true;
}
function colocarVertical(i){
    //VERTICAL
    var etqs = document.getElementsByClassName("letra"), x, y;
    x = parseInt(Math.random() * 14); 
    y = parseInt(Math.random() * (14 - palabras[i].length));
    for(var j = 0; j < palabras[i].length; j++){
        if(etqs[x*15+y].className == "letra usada"){
            return false;
        }
        etqs[x*15+y].textContent = palabras[i][j];
        etqs[x*15+y].className = "letra usada";
        y += 1;
    }
    return true;
}
function getDireccion(){
    var dir = parseInt(Math.random() * 2);
    return dir;
}
function ganar(){
    document.write("¡GANASTE!");
}











