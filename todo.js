//Creamos la clase Tarea
class Tarea {
    // Inicializamos sus atributos privados#
    #textoTarea;
    #prioridad;
    #nombreUsuario;
    #fecha;
    #marcado;

    //Constructor 
    constructor(textoTarea, prioridad, nombreUsuario, fecha, marcado) {
        this.#textoTarea = textoTarea;
        this.#prioridad = prioridad;
        this.#nombreUsuario = nombreUsuario;
        this.#fecha = fecha;
        this.#marcado = marcado;
        // Esto no permite que se agregen mas atributos no queridos fuera del constructor
        Object.seal(this);
    }

    //marcado
    get marcado() {
        return this.#marcado;
    }
   
    set marcado(marcado) {
        if (typeof marcado === "boolean") {
            this.#marcado = marcado;
        } else {
            console.error("El valor de 'marcado' debe ser un booleano.");
            this.#marcado = false; 
        }
    }


    //textoTarea
    get textoTarea() {
        return this.#textoTarea;
    }
    // Solo se hara si es como minimo de 1 caracter
    set textoTarea(textoTarea) {
        if (textoTarea.length >= 1) {
            this.#textoTarea = textoTarea;
        } else {
            console.error("El texto de la tarea debe tener al menos 1 carácter.");
        }
    }

    //prioridad
    get prioridad() {
        return this.#prioridad;
    }
    // No puede ser -1
    set prioridad(prioridad) {
        if (prioridad !== -1) {
            this.#prioridad = prioridad;
        } else {
            console.error("La prioridad no puede ser -1.");
        }
    }

    //nombreUsuario
    get nombreUsuario() {
        return this.#nombreUsuario;
    }
    // Solo se hara si mide minimo 1
    set nombreUsuario(nombreUsuario) {
        if (nombreUsuario.length >= 1) {
            this.#nombreUsuario = nombreUsuario;
        } else {
            console.error("El nombre de usuario debe tener al menos 1 carácter.");
        }
    }

    //fecha
    get fecha() {
        return this.#fecha;
    }
    // Debe tener formato de fecha obligatoriamente
    set fecha(fecha) {
        if (fecha instanceof Date && !isNaN(fecha.getTime())) {
            this.#fecha = fecha;
        } else {
            console.error("La fecha debe ser un objeto de tipo Date válido.");
        }
    }

}


class ListaTareas {
    #listaTareas;

    constructor(listaTareas) {
        this.#listaTareas = listaTareas = [];

        Object.seal(this);
    }

    //ListaTareas
    get listaTareas() {
        return this.#listaTareas;
    }
    set listaTareas(listaTareas) {
        this.#listaTareas = listaTareas;

    }

    //Añadir la tarea
    addTarea(tarea) {
        this.#listaTareas.push(tarea);
    }

    //Borrar la tarea
    removeTarea(tarea) {
        let indiceTarea = this.#listaTareas.indexOf(tarea);
        this.#listaTareas.splice(indiceTarea, 1);
    }


    // METODO PARA ORDENAR LAS TAREAS 

    

    ordenarTareas(tipoFiltro, nombreAfiltrar) {
        if (nombreAfiltrar == "") {
            switch (tipoFiltro) {
                case "fecha":
                    return listaOrdenadaPorFecha(this.#listaTareas);

                case "prioridad":
                    return listaOrdenadaPorPrioridad(this.#listaTareas);

                case "usuario":
                    return listaOrdenadaPorUsuarioOrdenAlfabetico(this.#listaTareas);

                default:
                    console.log("Opción no válida");
            }
        }
        else {
            let listaOrdenadaUser = listaOrdenadaPorUsuarioPorNombre(nombreAfiltrar, this.listaTareas)
            switch (tipoFiltro) {
                case "fecha":
                    return listaOrdenadaPorFecha(listaOrdenadaUser);

                case "prioridad":
                    return listaOrdenadaPorPrioridad(listaOrdenadaUser);

                case "usuario":
                    return listaOrdenadaPorUsuarioOrdenAlfabetico(listaOrdenadaUser);

                default:
                    console.log("Opción no válida");
            }

        }
    }
}


function listaOrdenadaPorFecha(lista) {
    lista.sort((a, b) => a.fecha - b.fecha);
    return lista;
}

function listaOrdenadaPorPrioridad(lista) {
    lista.sort((a, b) => a.prioridad - b.prioridad);
    return lista;
}

function listaOrdenadaPorUsuarioOrdenAlfabetico(lista) {
    lista.sort((a, b) => {
        
        if (a.nombreUsuario.toLowerCase() < b.nombreUsuario.toLowerCase() ) {
            return -1;
        }
        if (a.nombreUsuario.toLowerCase()  > b.nombreUsuario.toLowerCase() ) {
            return 1; 
        }
        return 0; 
    });
    
    return lista;
}

function listaOrdenadaPorUsuarioPorNombre(nombreUsuario, lista) {
    let listaTareasFiltradaPorUsuario = [];
    lista.forEach(tarea => {
        if (tarea.nombreUsuario.toLowerCase() == nombreUsuario.toLowerCase()) {
            listaTareasFiltradaPorUsuario.push(tarea);
        }
     });
    return listaTareasFiltradaPorUsuario;
}
