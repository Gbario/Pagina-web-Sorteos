var nombreEvento, numeroGanadores, titulo, premios, patrocinadores, selectGanadores;

function ingresarNombreEvento(){
    
    titulo = document.getElementById("titulo");
    nombreEvento = document.getElementById("nombre-evento").value;
    titulo.textContent = nombreEvento;

    
    
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
            <input class="premios" id="premioLista">           
        </div>
        <div>
            <label>Patrocinador: </label>
            <input class="patrocinadores" type="text" id="patrocinadorLista">      
            <br><br>
        </div>
        `;
        contenedorPremios.appendChild(inputPremios);
       
    }
}

function agregarParticipante(){

}

function deshabilitarInput(input){
    input.disabled = true;
}
function habilitarInput(input){
    input.disabled = false;
}

function crearEvento(){
    nombreEvento = document.getElementById("nombre-evento").value;
    if(nombreEvento === ""){
        alert("El nombre del evento no es válido");
        return;
    }else{
        ingresarNombreEvento();
    }
    if(numeroGanadores === "0"){
        alert("Agrege al menos 1 premio");
        return;
    }
    premios = document.getElementsByClassName("premios");
    patrocinadores = document.getElementsByClassName("patrocinadores");
    for(let i = 0; i < (numeroGanadores); i++){
        premios[i].disabled = true;
        patrocinadores[i].disabled = true;
    }
    selectGanadores = document.getElementById("cantidadGanadores");
    deshabilitarInput(selectGanadores);
    const botonCrearEvento = document.getElementById("botonCrearEvento");
    deshabilitarInput(botonCrearEvento);
    nombreEvento = document.getElementById("nombre-evento");
    deshabilitarInput(nombreEvento);
    const botonEliminarEvento = document.createElement("button");
    botonEliminarEvento.id = "botonEliminarEvento";
    botonEliminarEvento.onclick = eliminarEvento;
    botonEliminarEvento.className = "botonEliminar";
    botonEliminarEvento.textContent = "Eliminar Evento";
    const contenedorBotonesEvento = document.getElementById("seccion-nombre");
    contenedorBotonesEvento.appendChild(botonEliminarEvento);
}
 
function eliminarEvento(){
nombreEvento.value = "";
habilitarInput(nombreEvento);
titulo.innerHTML = "";
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
}