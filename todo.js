//Creamos la clase Tarea
class Tarea {
    // Inicializamos sus atributos privados#
    #textoTarea;
    #prioridad;
    #nombreUsuario;
    #fecha;

    //Constructor 
    constructor(textoTarea, prioridad, nombreUsuario, fecha) {
        this.#textoTarea = textoTarea;
        this.#prioridad = prioridad;
        this.#nombreUsuario = nombreUsuario;
        this.#fecha = fecha;
        // Esto no permite que se agregen mas atributos no queridos fuera del constructor
        Object.seal(this);
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
            console.error("El texto de la tarea debe tener al menos 1 caracter.");
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
            console.error("El nombre de usuario debe tener como minimo 1 caracter.");
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
            console.error("La fecha debe ser un objeto de tipo Date .");
        }
    }

}

class ListaTareas {
    #listaTareas;

    constructor(listaTareas) {
        this.#listaTareas = listaTareas = [];

        Object.seal(this);
    }

    // getter y setter listaTareas
    get listaTareas() {
        return this.#listaTareas;
    }
    set listaTareas(listaTareas) {
        this.#listaTareas = listaTareas;
    }

    // Metodos de ListaTareas

    // Añade la tarea a la lista
    addTarea(tarea) {
        this.#listaTareas.push(tarea);
    }

    // Borra la tarea de la lista
    removeTarea(tarea) {
        let indiceTarea = this.#listaTareas.indexOf(tarea);
        this.#listaTareas.splice(indiceTarea, 1);
    }

    // devuelve la lista de tareas
    getListaTareas(){
        return this.#listaTareas;
    }

    // devuelve la lista de tareas ordenada por fecha, la mas vieja primero
    listaOrdenadaPorFecha() {
        this.#listaTareas.sort((a, b) => a.fecha - b.fecha);
        return this.#listaTareas;
    }

    // devielve la lista por orden de prioridad, la que tiene prioridad 1 primero etc
    listaOrdenadaPorPrioridad() {
        this.#listaTareas.sort((a, b) => a.prioridad - b.prioridad);
        return this.#listaTareas;
    }

    // devuelve la lista ordenada por orden alfabetico por nombreUsuario
    listaOrdenadaPorUsuarioOrdenAlfabetico() {
        this.#listaTareas.sort((a, b) => {
            // Lo hacemos de esta forma para  que aunque esten en mayusculas se copare de forma correcta
            if (a.nombreUsuario.toLowerCase() < b.nombreUsuario.toLowerCase() ) {
                return -1;
            }
            if (a.nombreUsuario.toLowerCase()  > b.nombreUsuario.toLowerCase() ) {
                return 1; 
            }
            return 0; 
        });
        
        return this.#listaTareas;
    }

    // devuelve un array distinto con solo las coincidencias que haya tenido con el nombre, tambien es indiferente las mayusculas
    listaOrdenadaPorUsuarioPorNombre(nombreUsuario) {
        let listaTareasFiltradaPorUsuario = [];
        this.#listaTareas.forEach(tarea => {
            if (tarea.nombreUsuario.toLowerCase() == nombreUsuario.toLowerCase()) {
                listaTareasFiltradaPorUsuario.push(tarea);
            }
         });
        return listaTareasFiltradaPorUsuario;
    }

}
