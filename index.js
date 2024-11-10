var nombreEvento, numeroGanadores, titulo, premios, patrocinadores, selectGanadores, nombreParticipante, dniParticipante, listaParticipantes, botonCrearEvento, botonEliminarEvento, botonCrearQR, botonAgregarParticipante, botonRealizarSorteo;

function ingresarNombreEvento(){
    
    titulo = document.getElementById("titulo");
    nombreEvento = document.getElementById("nombre-evento").value;
    titulo.textContent = nombreEvento;
    titulo.style.color = "Black";

    
    
}

function menuGanadores() {
    const contenedorPremios = document.getElementById("contenedorPremios");
    numeroGanadores = document.getElementById("cantidadGanadores").value;
    contenedorPremios.innerHTML = ("");
    
    
    for(let i = 1; i <= numeroGanadores; i++){
        const inputPremios = document.createElement("div");
        inputPremios.style.display = "flex";
        inputPremios.style.margin = "10px"
        inputPremios.id = `premio${i}`;
        
        
    
        inputPremios.innerHTML = `
        <div>
            <label>Premio ${i}</label>
            <input class="premios" style="font-family: 'Courier New', Courier, monospace"  id="premioLista">           
        </div>
        <div>
            <label>Patrocinador: </label>
            <input class="patrocinadores" style="font-family: 'Courier New', Courier, monospace"  type="text" id="patrocinadorLista">      
            <br><br>
        </div>
        `;
        contenedorPremios.appendChild(inputPremios);
       
    }
}

function agregarParticipante(){
nombreParticipante = document.getElementById("nombreParticipante");
dniParticipante = document.getElementById("dniParticipante");
listaParticipantes  = document.getElementById("listaParticipantes");
    if(nombreParticipante.value !== "" && dniParticipante.value !== ""){
        var nuevoParticipante = document.createElement("li");
        nuevoParticipante.innerHTML = nombreParticipante.value + "  " + dniParticipante.value + "      " + `<button class="botonEliminarParticipante" onClick="eliminarParticipante(this)"> x </button>`;
        listaParticipantes.appendChild(nuevoParticipante);
        nombreParticipante.value = "";
        dniParticipante.value = "";
    }else{
        alert("Nombre o DNI inválido")
    }

}

function eliminarParticipante(cruz){
    const participante = cruz.parentNode;
    participante.remove();
}

function deshabilitarInput(input){
    input.disabled = true;
}
function habilitarInput(input){
    input.disabled = false;
}

function crearEvento(){ 
    /* agregar funcion para crear html del formulario de inscripcion al que dirige el qr y que se borre al finalizar el sorteo */
    nombreEvento = document.getElementById("nombre-evento").value;
    selectGanadores = document.getElementById("cantidadGanadores");
    if(nombreEvento === ""){
        alert("El nombre del evento no es válido");
        return;
    }else{
        ingresarNombreEvento();
    }
    if(selectGanadores.value === "0"){
        alert("Agrege al menos 1 premio");
        return;
    }
    premios = document.getElementsByClassName("premios");
    patrocinadores = document.getElementsByClassName("patrocinadores");
    for(let i = 0; i < (numeroGanadores); i++){
        if(premios[i].value === ""){
            alert("Premio " + (i+1) + " vacío");
            return;
        }
        deshabilitarInput(premios[i]);
       deshabilitarInput(patrocinadores[i]);
    }
    
   
    deshabilitarInput(selectGanadores);
    botonCrearEvento = document.getElementById("botonCrearEvento");
    deshabilitarInput(botonCrearEvento);
    nombreEvento = document.getElementById("nombre-evento");
    deshabilitarInput(nombreEvento);
    botonEliminarEvento = document.createElement("button");
    botonEliminarEvento.id = "botonEliminarEvento";
    botonEliminarEvento.onclick = cuadroConfirmacionEliminarEvento;
    botonEliminarEvento.className = "botonEliminar";
    botonEliminarEvento.textContent = "Eliminar Evento";
    const contenedorBotonesEvento = document.getElementById("seccion-nombre");
    contenedorBotonesEvento.appendChild(botonEliminarEvento);

    botonCrearQR = document.getElementById("botonCrearQR"); // Habilitar inputs y botones luego de crear sorteo
    habilitarInput(botonCrearQR);
    
    botonAgregarParticipante = document.getElementById("botonAgregarParticipante");
    habilitarInput(botonAgregarParticipante);

    botonRealizarSorteo = document.getElementById("botonRealizarSorteo");
    habilitarInput(botonRealizarSorteo);

    nombreParticipante = document.getElementById("nombreParticipante");
    dniParticipante = document.getElementById("dniParticipante");
    habilitarInput(nombreParticipante);
    habilitarInput(dniParticipante);
    
    
}
 
function mostrarQR(){
     /* agregar opcion para descargar el qr y para compartir el link del formulario de inscripcion */
    QRCode.toDataURL('http://127.0.0.1:5500/Client/formulario.html', {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        width: 256
    }, function (err, url) {
        if (err) {
            console.error('Error al generar el QR:', err);
            return;
        }

        document.getElementById('qrCode').innerHTML = '<img src="' + url + '" alt="QR Code">';
        document.getElementById('botonesQr').innerHTML = '<button class="botonEliminar" onclick="cerrarQr()">Cerrar</button> <button class="boton" onclick="compartirLink()">Compartir Link</button> <button class="boton" onclick="descargarQr()"><img src="./img/iconoDescarga.png" alt="Descargar" class="botonDescargarQr"></button>';
        deshabilitarInput(botonCrearQR);
    });
}

function cerrarQr(){
    document.getElementById('qrCode').innerHTML= '';
    document.getElementById('botonesQr').innerHTML= '';
    habilitarInput(botonCrearQR);
}

function compartirLink(){

}

function descargarQr(){

}

function cuadroConfirmacionEliminarEvento(){
   var cuadroConfirmacion = document.getElementById("cuadroConfirmacion");
    cuadroConfirmacion.style.display = "block";
}
function ocultarCuadroConfirmacionEliminarEvento(){
    var cuadroConfirmacion = document.getElementById("cuadroConfirmacion");
    cuadroConfirmacion.style.display = "none";
}

function eliminarEvento(){
nombreEvento.value = "";
habilitarInput(nombreEvento);
titulo.textContent = "Crear sorteo";
titulo.style.color = "gray";
numeroGanadores.value = "";
habilitarInput(selectGanadores);
for(let i = 0; i < (numeroGanadores); i++){
    premios[i].value = "";
    premios[i].disabled = false;
    patrocinadores[i].value = "";
    patrocinadores[i].disabled = false;
}
habilitarInput(botonCrearEvento);
botonEliminarEvento.remove();
deshabilitarInput(botonAgregarParticipante);
deshabilitarInput(botonCrearQR);
deshabilitarInput(botonRealizarSorteo);
deshabilitarInput(nombreParticipante);
deshabilitarInput(dniParticipante);
document.getElementById("listaParticipantes").innerHTML = ("");
cerrarQr();
ocultarCuadroConfirmacionEliminarEvento();
}
