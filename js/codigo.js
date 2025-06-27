let slcGrado = document.querySelector("#grado");
let slcProfe = document.querySelector("#profesor");
let slcGradoFiltro = document.querySelector("#gradoFiltro");
let slcProfeDatos = document.querySelector("#profeDatos");

for(let i = 0; i < grados.length; i++){
    slcGrado.innerHTML += `<option value="${grados[i]}">${grados[i]}</option>`
    slcGradoFiltro.innerHTML += `<option value="${grados[i]}">${grados[i]}</option>`
}

for(let i = 0; i < profesores.length; i++){
    slcProfe.innerHTML += `<option value="${profesores[i]}">${profesores[i]}</option>`
    slcProfeDatos.innerHTML += `<option value="${profesores[i]}">${profesores[i]}</option>`
}

document.querySelector("#btn").addEventListener("click", almacenar)

function almacenar(){
    let nombre = document.querySelector("#nombre").value
    let edad = Number(document.querySelector("#edad").value)
    let grado = document.querySelector("#grado").value
    let profe = document.querySelector("#profesor").value
    let error = document.querySelector("#error")
    error.innerHTML = ""
   

    if(nombre === "" || grado === "" || profe === "" || edad === 0){
       error.innerHTML = "Porfavor rellenar todos los campos"
       return
    }

    if(edad < 6){
        error.innerHTML = "La edad del alumno debe ser mayor a 6 años"
    }

    for(let estudiante of estudiantes){
        if(estudiante.nombre === nombre){
            error.innerHTML = "Ese alumno ya existe"
            return
        }
    }
    
    let letra = nombre.charAt(0)

    if(letra !== letra.toUpperCase()){
        error.innerHTML = "El nombre debe ser ingresado con mayuscula"
        return
    }

    estudiantes.push({"nombre": nombre, "edad": edad, "grado": grado, "profesor": profe})
    document.querySelector("#nombre").value = ""
    document.querySelector("#edad").value = ""
    document.querySelector("#grado").value = ""
    document.querySelector("#profesor").value = ""
    mostrarEstudiantes(estudiantes)
}

function mostrarEstudiantes(array){
    document.querySelector("#datos").innerHTML =`
     <thead>
            <tr>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Grado</th>
                <th>Profesor</th>
            </tr>
        </thead>
        <tbody id="resultadoTabla">
        </tbody>`
    let tabla = document.querySelector("#resultadoTabla")
    tabla.innerHTML = ""
    for (let estudiante of array){
        tabla.innerHTML += `
            <tr>
                <td>${estudiante.nombre}</td>
                <td>${estudiante.edad} años</td>
                <td>${estudiante.grado} grado</td>
                <td>${estudiante.profesor}</td>
            </tr>
        `
    }
}


mostrarEstudiantes(estudiantes)

document.querySelector("#gradoFiltro").addEventListener("change", filtroGrado)

function filtroGrado(){
    let grado = slcGradoFiltro.value
    let filtrados = []

    for(let estudiante of estudiantes){
        if(estudiante.grado === grado){
            filtrados.push(estudiante)
        }
    }

    mostrarEstudiantes(filtrados)
}

document.querySelector("#profeDatos").addEventListener("change", datosProfesor)

function datosProfesor(){
    let profesor = document.querySelector("#profeDatos").value
    let alumnosProfe = []

    for(let estudiante of estudiantes){
        if(estudiante.profesor === profesor){
            alumnosProfe.push(estudiante)
        }
    }
    let datos2 = document.querySelector("#datos2")
    datos2.innerHTML = `El profesor ${profesor} tiene ${alumnosProfe.length} alumnos: <br>`

    for(let alumno of alumnosProfe){
        datos2.innerHTML += `${alumno.nombre} <br>`
    }
}