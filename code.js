//Solución 1
function changeTxt(){
    let btnJob1Txt = document.getElementById('btn-job1').textContent.trim();
    btnJob1Txt === 'Pulsar'? 
        document.getElementById('btn-job1').innerHTML='<h2>Pulsado</h2>':
        document.getElementById('btn-job1').innerHTML='<h2>Pulsar</h2>';
}
//Solucion 2
function changeColor(btnElement){
    let capa = document.getElementById('micapa');
    let id = btnElement.id;
    let esColor = '';
    switch(id){
        case 'btn1-job2':
            esColor = 'red';
            break;
        case 'btn2-job2':
            esColor = 'blue';
            break;
        case 'btn3-job2':
            esColor = 'green';
            break;
        case 'btn4-job2':
            esColor = 'orange';
            break;            
        default:
            esColor = 'black';
    }
    capa.style.setProperty("background-color", esColor);
}
//Solucion 3
function dibujarTabla(){
    let filas = document.getElementById('nFil').value;
    let cols = document.getElementById('nCol').value;
    let tablaExistente = document.getElementById('1');
    //Elimina tabla existente
    if( tablaExistente != null){
        let filasExistentes = tablaExistente.getElementsByTagName('tr').length;
        let colsExistentes = tablaExistente.getElementsByTagName('td').length;
        if(filasExistentes == filas && colsExistentes/filas == cols){
            return;
        }
        tablaExistente.remove();
    }
    //Rechaza ingreso de cero o números negativos ó filas mayores a 100 ó columnas mayores a 20
    if(filas < 1 || filas > 100 || cols < 1 || cols > 20){
        alert('Número de Fila ó Columnas NO VÁLIDO');
        return;
    }
    crearTabla(1, filas, cols);
    let tabla = document.getElementById('1');
    let cantCeldas = tabla.getElementsByTagName('td').length;
    let datos = [], i;
    for(i = 1; i <= cantCeldas; i++){
        datos.push(i);
    }
    agregarDatosEnTabla(tabla, datos);
}
//Solucion 3 y 4
function crearTabla(idTabla, cantFilas, cantColumnas){
    let body = document.getElementsByTagName('body')[0];
    let tabla = document.createElement('table');
    let tbody = document.createElement('tbody');
    let iFil, iCol, fil, col;

    for(iFil = 0; iFil < cantFilas; iFil++){
        fil = document.createElement('tr');
        for(iCol = 0; iCol < cantColumnas; iCol++){
            col = document.createElement('td');
            fil.appendChild(col);
        }
        tbody.appendChild(fil);
    }
    tabla.appendChild(tbody);
    body.appendChild(tabla);
    tabla.setAttribute('border','10');
    tabla.setAttribute('id',idTabla);
}
function agregarDatosEnTabla(tabla, arrayContenido){
    if( tabla === null){
        console.error('La tabla NO existe para agregar datos.');
        return;
    }
    let celda;
    for(celda = 0; celda < arrayContenido.length; celda++){
        tabla.getElementsByTagName('td')[celda].innerHTML = arrayContenido[celda];
    }
}
//Solución 4
function mostrarArreglo(){
    let tabla2 = document.getElementById('2');
    if(tabla2 != null){return;}
    let datos = ['Manzana','Naranja','Pera','Higo','Banana'];
    crearTabla(2, 1, datos.length);
    tabla2 = document.getElementById('2');
    agregarDatosEnTabla(tabla2, datos);
}
//Solución 5
class Persona {
    constructor(dniX, nombreX, apellidoX) {
        this.dni = dniX;
        this.nombre = nombreX;
        this.apellido = apellidoX;
    }
}
//array, colección de objetos del tipo Persona(...)
let personas = [
    {"dni":"33333330","nombre":"Juan", "apellido":"Ortiz"},
    {"dni":"33333335","nombre":"Maria", "apellido":"Suarez"},
    {"dni":"33333340","nombre":"Jose", "apellido":"Gonzales"}
]
//muestra una tabla con una carga de datos inicial
function mostrarPersonas(){
    crearTabla(3, personas.length, 3);
    let tabla3 = document.getElementById('3');
    tabla3.insertRow(0).innerHTML='<th>DNI</th><th>NOMBRE</th><th>APELLIDO</th>';
    let i , persona = [];

    for(i = 0; i < personas.length; i++){
        persona.push(personas[i].dni);
        persona.push(personas[i].nombre);
        persona.push(personas[i].apellido);
    }

    agregarDatosEnTabla(tabla3, persona);

}
//agrega una persona a la tabla
function agregarPersona(){
    let tabla3 = document.getElementById('3');
    let dni = document.getElementById('dni').value;
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let persona;
    let existePersona = false;
    limpiarDatosEnInput();
    //La tabla para agregar datos debe estar creada
    if(tabla3 === null){
        alert('La Tabla para agregar datos NO existe.');
        return;
    }
    //valida que la entrada de datos tenga contenido
    if(dni.length <8 || nombre.length < 3 || apellido.length < 3 || apellido.length < 3){
        alert('Error al ingresar datos');
        return;
    }
    existePersona = personas.find(persona => persona.dni === dni);
    //no permite el ingreso de dos DNI iguales
    if(existePersona){
        alert('La persona con DNI: '+dni+' Ya Existe.');
        return;
    }
    //crea una nueva instancia del tipo Persona(...)
    persona = new Persona(dni, nombre, apellido);
    //inserta una nueva fila en la tabla3 personas
    tabla3.insertRow(-1).innerHTML = 
        '<td>'+persona.dni+'</td><td>'+persona.nombre+'</td><td>'+persona.apellido+'</td>';
    //agrega el objeto persona al array personas
    personas.push({"dni":persona.dni,"nombre":persona.nombre,"apellido":persona.apellido});

}
//vacía de contenido los Inputs
function limpiarDatosEnInput(){
    document.getElementById('dni').value='';
    document.getElementById('nombre').value='';
    document.getElementById('apellido').value='';
}
//valida que al menos del DNI contenga 8 dígitos
function validarDni(){
    let dni = document.getElementById('dniBuscar').value;
    if(dni.length < 8){
        alert('Error al ingresar DNI');
        document.getElementById('dniBuscar').value='';
        return;
    }
    buscarPersona(dni);
}
//busca un objeto del tipo Persona(...) en el array personas
function buscarPersona(unDni){
    let personaX = personas.find(persona => persona.dni === unDni);
    document.getElementById('dniBuscar').value='';
    if(personas.find(persona => persona.dni === unDni)){
        alert('Persona encontrada: '+personaX.nombre+' '+personaX.apellido);
        return;
    }
    alert('La persona con DNI: '+unDni+' NO fué encontrada.')
}
