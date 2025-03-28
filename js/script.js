//1coger API y traer datos
const api ='https://api.chucknorris.io/jokes/random'
const jokeList = document.getElementById('jokeList')
let listachistes = JSON.parse(localStorage.getItem('chistes')) || [];
function obtenerDatos(api){
    return fetch(api)
    .then(response=>{
        if(!response.ok){
            throw new Error(`error: ${response.status}`)
        }
        return response.json()
    })
}

// boton id fetchJoke y coger el boton
const btnfetchJoke = document.getElementById('fetchJoke')
btnfetchJoke.addEventListener('click', function(){
    obtenerDatos(api).then(data =>{
        const chiste = data.value;
        listachistes.push(chiste)
        localStorage.setItem('chistes', JSON.stringify(listachistes));
        actualizarLista();
    })
    .catch(error =>{
        console.error('Hubo un problema con la petición:', error);
    })
})
//crear lista de chistes y guardarlos en el localStorage y que los chistes no se solapem
function actualizarLista() {
    jokeList.innerHTML = ''; 

    listachistes.forEach((chiste, index) => {
        const li = document.createElement('li');
        li.textContent = chiste;
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar'
        btnEliminar.classList.add('btn-eliminar');
        btnEliminar.style.marginLeft = '10px'
        btnEliminar.addEventListener('click', function(){
            eliminarchiste(index);
        })
        li.appendChild(btnEliminar);
        jokeList.appendChild(li);
    });
}

function eliminarchiste(index){
    listachistes.splice(index, 1);
    localStorage.setItem('chistes', JSON.stringify(listachistes));
    actualizarLista();
}
actualizarLista();
// OPCIONAL crear 2 botones 1 para borrar lista y el 2 para borrar ID


