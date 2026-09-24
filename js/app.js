console.log("JavaScript conectado");

const inputTarea = document.getElementById("nueva-tarea");

const formulario = document.querySelector("form");

const listaTareas = document.getElementById("lista-tareas");

const botonEliminarCompletadas =
    document.getElementById("eliminar-completadas");

const botonEliminarTodas =
    document.getElementById("eliminar-todas");

let todos = [];

function guardarTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function cargarTodos() {
    const tareasGuardadas = localStorage.getItem("todos");

    if (tareasGuardadas) {
        todos = JSON.parse(tareasGuardadas);
        renderTodos();
    }
}


function renderTodos() {
    listaTareas.innerHTML = "";

    todos.forEach((todo, index) => {

        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;

        const span = document.createElement("span");
        span.textContent = todo.text;

        if (todo.completed) {
            span.classList.add("completada");
        }

        checkbox.addEventListener("change", () => {

            todo.completed = checkbox.checked;

            guardarTodos();

            renderTodos();
        });

        li.appendChild(checkbox);
        li.appendChild(span);

        listaTareas.appendChild(li);
    });
}


formulario.addEventListener("submit", (event) => {

    event.preventDefault();

    const textoTarea = inputTarea.value.trim();

    if (textoTarea === "") {
        return;
    }

    const nuevaTarea = {
        text: textoTarea,
        completed: false
    };

   
    todos.push(nuevaTarea);

    guardarTodos();

    inputTarea.value = "";

    renderTodos();
});  


function eliminarCompletadas() {

    todos = todos.filter((todo) => !todo.completed);

    guardarTodos();

    renderTodos();
}



botonEliminarCompletadas.addEventListener("click", () => {

    eliminarCompletadas();
});

botonEliminarTodas.addEventListener("click", () => {

    todos = [];

    guardarTodos();

    renderTodos();
});

cargarTodos();