// Inicializo ID que utilizo para poder tachar tareas y identificarlas para poder borrarlas
let id = 0;


//cada vez que se reiniucie la página:
document.addEventListener("DOMContentLoaded", () => {
    //Inicializo constantes necesarias
    const botonAñadirTarea = document.getElementById("botonAñadirTarea");
    const inputTextoTarea = document.getElementById("inputTarea");
    const selectorPrioridad = document.getElementById("selectorPrioridad");
    const inputTextoUsuario = document.getElementById("inputUsuario");
    const listaDeTareasHTML = document.getElementById("listaTareas");
    const miListaTareas = new ListaTareas();



    // PRUEBAAAA
    let fecha = new Date();
    let tareaPrueba = new Tarea("tareaPrueba", "2", "IZAN", fecha);

    miListaTareas.addTarea(tareaPrueba);
    printTareaNueva(tareaPrueba, miListaTareas);
    id++;
     // PRUEBAAAA


     //Añado listener para el boton de añadir tarea
    botonAñadirTarea.addEventListener("click", () => {

        //Si alguno de los inputs esta vacio pongo placeholder rojo
        if (inputTextoTarea.value == "" || inputTextoUsuario.value == "") {
            console.log("Introduce todos los campos obligatorios");
            inputTextoTarea.classList.add("placeholderRojo");
            inputTextoUsuario.classList.add("placeholderRojo");
        }
        //Si no cojo los valores necesarios y cre un objeto tarea, aparte lo añado a la listaDeTareas que es otro objeto
        else {
            let textoTarea = inputTextoTarea.value;
            let prioridad = selectorPrioridad.value; // devuelve el indice(1,2,3...)
            let usuario = inputTextoUsuario.value;
            let fecha = new Date();

            let tarea = new Tarea(textoTarea, prioridad, usuario, fecha);
            miListaTareas.addTarea(tarea);


            //Cada vez que creo una nueva tarea uncremento el id
            printTareaNueva(tarea, miListaTareas);
            id++; 

            //Reinicio los estilos y vacio los inputs
            inputTextoTarea.value = "";
            inputTextoUsuario.value = "";

            inputTextoTarea.classList.remove("placeholderRojo");
            inputTextoUsuario.classList.remove("placeholderRojo");
        }
        
    });


    // Creo listener para el selector de los filtros
    const selectorFiltros = document.getElementById("selectorFiltros");
    let filtro = "";

    selectorFiltros.addEventListener("change", (event) => {
        const valorSeleccionado = event.target.value;
        
        // Segun el valor seleccionado llamare a una funcion u otra que ordenara de X manera el array.
        let inputUsuarioFlitrar = document.getElementById("inputnombreUsuarioFiltrar");

        let botonFiltrar = document.getElementById("filtraUsuario");

        filtra(valorSeleccionado, listaDeTareasHTML, miListaTareas, inputUsuarioFlitrar);

        botonFiltrar.addEventListener("click", function() {

            filtra(valorSeleccionado, listaDeTareasHTML, miListaTareas, inputUsuarioFlitrar);
  
        });
        
       
    });

});

// Funcion para imprimir tareas.
function printTareaNueva(tarea, miListaTareas) {
    //Inicializo la const, que es el elemento que será padre de todas las tareas
    const listaDeTareasHTML = document.getElementById("listaTareas");

    //Hago un switch con la opcion de prioridad elegisa, segun la elegida cambio el valor de classs
    let classs = "";
    switch (tarea.prioridad) {
        case "1":
            classs = "rojo";
            break;
        case "2":
            classs = "naranja";
            break;
        case "3":
            classs = "amarillo";
            break;
        case "4":
            classs = "verde";
            break;
        default:
            classs = "cuatro";
    }

    //inicializo un li donde ira la nueva tarea y le agrego una calse
    let nuevaTarea = document.createElement("li");
    nuevaTarea.className = "tarea";

    // Creo el html de la tarea donde lo unico que cambia el el ID, el texto de la tarea, la fecha y el usuario 
    nuevaTarea.innerHTML = `
        <div class="contenedorTarea">
            <input type="checkbox" id="tarea-${id}">
            <label class="checkboxCool" for="tarea-${id}">
                <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                </svg>
            </label>
            <label for="tarea-${id}" class="textoTarea">
                ${tarea.textoTarea}
            </label>
            <button id="borrarTarea-${id}" class="borrarTarea">
                <svg fill="var(--colorSecundario)" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                </svg>
            </button>
        </div>
        <div class="contenedorAtributosTarea">
            <div class="contenedorPrioridad">
                <div class="barra rojo"></div>
                <div class="barra naranja"></div>
                <div class="barra amarillo"></div>
                <div class="barra verde"></div>
            </div>
                
            <div class="contenedorFecha">
                ${tarea.fecha.toLocaleString()}
            </div>
            <div class="contenedorNombreUsuario">
                ${tarea.nombreUsuario}
            </div>
        </div>
    `;


    // Selecciona el div que tenga la calsse anteriormente elegida con la variable classs y utilizando un querySelectro, este busca dentro de nuevaTarea algun elemento que tenga la calse seleccionada.
    let divPrioridad = nuevaTarea.querySelector(`.${classs}`);

    // Le cambia la opacidad a 100%
    divPrioridad.style.opacity = "1";

    //Por ultimo agrego la tarea a mi contenedro
    listaDeTareasHTML.appendChild(nuevaTarea);

    // Agregar listener para el boton eliminarTarea que es unico gracias al ID
    const botonBorrar = nuevaTarea.querySelector(`#borrarTarea-${id}`);
    botonBorrar.addEventListener("click", () => {

        // LLamo a la funcion removeTarea(tarea); para eliminar la tarea de la lista
        miListaTareas.removeTarea(nuevaTarea);

        // Y lo borro del dom
        listaDeTareasHTML.removeChild(nuevaTarea); 
    });

    // Agregar listener para el boton eliminarTarea que es unico gracias al ID
    const chekBox = nuevaTarea.querySelector(`#tarea-${id}`);
    chekBox.addEventListener("click", () => {
       
        tarea.marcado = chekBox.checked
        //alert(tarea.marcado)

    });


    // Si el atributo marcado es true, marcar el checkbox cada vez que se pinte, si no no hacre nada;
    if(tarea.marcado) {
        chekBox.checked = true;
    }
    else{
       // alert("La siguiente tarea no esta terminada")
    }
}

function limpiarListaHTML_ImprimirNuevas (listaDeTareasHTML, miListaTareas) {
    while (listaDeTareasHTML.firstChild) {
        listaDeTareasHTML.removeChild(listaDeTareasHTML.firstChild);
    }

    miListaTareas.forEach((tarea) => {
        printTareaNueva(tarea,miListaTareas);
        id++;
    });
}

function filtra(valorSeleccionado, listaDeTareasHTML, miListaTareas, inputUsuarioFlitrar) {
    let filtro = "";
    switch (valorSeleccionado) {
        case "1":
            filtro = "fecha";
            limpiarListaHTML_ImprimirNuevas(listaDeTareasHTML, miListaTareas.ordenarTareas(filtro, inputUsuarioFlitrar.value));
            console.log("Filtrando por fecha");
            
            break;
        case "2":
            filtro = "prioridad";
            limpiarListaHTML_ImprimirNuevas(listaDeTareasHTML, miListaTareas.ordenarTareas(filtro, inputUsuarioFlitrar.value));

            console.log("Filtrando por prioridad");
            break;
        case "3":
            filtro = "usuario";
            limpiarListaHTML_ImprimirNuevas(listaDeTareasHTML, miListaTareas.ordenarTareas(filtro, inputUsuarioFlitrar.value));
                
            console.log("Filtrando por usuario");
            break;
        default:
            console.log("Opción no válida");
    }
}