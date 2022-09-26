
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
    const letras = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q",
        "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    var numero = parseInt(Math.random() * (28 - 1)), letra;
    
    return letras[numero];
}

function eventoPresionar(e){
    seleccionando = true;
    e.target.classList.add("seleccionado")
    listaLetras.push(e.target);
}

function eventoSoltar(){
    seleccionando = false;
    var palabraSeleccionada = "";
    for(var i = 0; i < listaLetras.length; i++){
        palabraSeleccionada += listaLetras[i].textContent;
        listaLetras[i].classList.remove("seleccionado")
    }
    for(var i = 0; i < 8; i++){
        if(palabraSeleccionada == palabras[i]){
            console.log("Palabra encontrada: " + palabraSeleccionada);
            encontradas++;
            for(var j = 0; j < listaLetras.length; j++){
                listaLetras[j].classList.add("completado");
            }
            document.getElementById("palabra"+(i+1)).classList.add("encontrada");
            break;
        }
    }
    
    if (encontradas == 8){
        ganar()
    }
    
    listaLetras = [];
}

function eventoMouseOver(e){
    if(seleccionando && !e.target.classList.contains("completado")){
        eventoPresionar(e);
    }
}

function elegirPalabras(){
    listaPalabras = ["GATO", "PERRO", "PANTALLA", "BOTELLA", "MUSICA", "LLAVE", "OCEANO", 
    "GUITARRA", "AZUL", "IMPRESORA", "BOTON", "CONTENEDOR", "FUNCION", "CEPILLO", "BRAZO",
    "PAÑUELO", "NUMERO", "CARTEL", "CONTINENTE", "AMERICA", "EUROPA", "OCEANIA", "ASIA", 
    "AFRICA", "ANTARTIDA", "METAL", "TECLADO", "ALUMINIO", "PIRAMIDE"];

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
    alert("¡GANASTE!");
}











