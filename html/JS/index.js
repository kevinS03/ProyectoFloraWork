var resp=0;
function contar(){
	resp = resp + 1;
	console.log(resp);
}

// Variables
const baseDeDatos = [
    {
        id: 1,
        nombre: 'Mango toro',
        precio: 5.0,
        imagen: './ASSETS/maceta-mango.jpg'
    },
    {
        id: 2,
        nombre: 'Manzanilla',
        precio: 9.9,
        imagen: './ASSETS/maceta-manzanilla.jpg'
    },
    {
        id: 3,
        nombre: 'Platano',
        precio: 4.99,
        imagen: './ASSETS/platano.jpg'
    },
	{
        id: 4,
        nombre: 'Aloe vera',
        precio: 1.99,
        imagen: './ASSETS/maceta-aloe.jpg'
    },
	{
        id: 5,
        nombre: 'Palmera',
        precio: 4.99,
        imagen: './ASSETS/maceta-palmera.jpg'
    },
	{
        id: 6,
        nombre: 'Cactus mer',
        precio: 1.99,
        imagen: './ASSETS/maceta-cactus.jpg'
    },

];

let carrito = [];
let total = 0;
var contadorSpan = 0;
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar')
const DOMspanCarrito = document.querySelector('#spanCarrito');

function renderizarProductos() {
    baseDeDatos.forEach((info) => {
        // Estructura
        const miNodo = document.createElement('div');
        miNodo.classList.add('card', 'col-sm-4');
        // Body
        const miNodoCardBody = document.createElement('div');
        miNodoCardBody.classList.add('card-body');
        // Titulo
        const miNodoTitle = document.createElement('h5');
        miNodoTitle.classList.add('card-title');
        miNodoTitle.textContent = info.nombre;
        // Imagen
        const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('card-img-top');
        miNodoImagen.setAttribute('src', info.imagen);
		miNodoImagen.style.cssText = 'width: 10rem;';
        // Precio
        const miNodoPrecio = document.createElement('p');
        miNodoPrecio.classList.add('card-text');
        miNodoPrecio.textContent = info.precio + '€';
        // Boton 
        const miNodoBoton = document.createElement('button');
        miNodoBoton.classList.add('btn', 'btn-primary');
        miNodoBoton.textContent = '+';
        miNodoBoton.setAttribute('marcador', info.id);
        miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
        // Insertamos
        miNodoCardBody.appendChild(miNodoImagen);
        miNodoCardBody.appendChild(miNodoTitle);
        miNodoCardBody.appendChild(miNodoPrecio);
        miNodoCardBody.appendChild(miNodoBoton);
        miNodo.appendChild(miNodoCardBody);
        DOMitems.appendChild(miNodo);
    });
}

function anyadirProductoAlCarrito(evento) {
    // Anyadimos el Nodo a nuestro carrito
    carrito.push(evento.target.getAttribute('marcador'))
    // Calculo el total
    calcularTotal();
    // Actualizamos el carrito 
    renderizarCarrito();
	var valor = document.getElementById('spanCarrito').innerHTML;

	if(valor == 0){
		contadorSpan = 1
	}else{
		contadorSpan += 1;
	}
	document.getElementById('spanCarrito').innerHTML=' '+ contadorSpan;

}

function renderizarCarrito() {
    // Vaciamos todo el html
    DOMcarrito.textContent = '';
    // Quitamos los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    // Generamos los Nodos a partir de carrito
    carritoSinDuplicados.forEach((item) => {
        // Obtenemos el item que necesitamos de la variable base de datos
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            // ¿Coincide las id? Solo puede existir un caso
            return itemBaseDatos.id === parseInt(item);
        });
        // Cuenta el número de veces que se repite el producto
        const numeroUnidadesItem = carrito.reduce((total, itemId) => {
            // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
            return itemId === item ? total += 1 : total;
        }, 0);
        // Creamos el nodo del item del carrito
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}€`;
	
		const miNodoImagen = document.createElement('img');
        miNodoImagen.classList.add('card-img-top');
        miNodoImagen.setAttribute('src', miItem[0].imagen);
		miNodoImagen.style.cssText = 'width: 2rem; margin-left: 1%;';
        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
		miBoton.addEventListener("click", function(){
			contadorSpan = contadorSpan - numeroUnidadesItem;
			document.getElementById('spanCarrito').innerHTML=' '+ contadorSpan;
		}, false);
        // Mezclamos nodos
		miNodo.appendChild(miNodoImagen);
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
}

function borrarItemCarrito(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    // Borramos todos los productos
    carrito = carrito.filter((carritoId) => {
        return carritoId !== id;
    });
    // volvemos a renderizar
    renderizarCarrito();
    // Calculamos de nuevo el precio
    calcularTotal();

}

function calcularTotal() {
    // Limpiamos precio anterior
    total = 0;
    // Recorremos el array del carrito
    carrito.forEach((item) => {
        // De cada elemento obtenemos su precio
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
            return itemBaseDatos.id === parseInt(item);
        });
        total = total + miItem[0].precio;
    });
    // Renderizamos el precio en el HTML
    DOMtotal.textContent = total.toFixed(2);
}

function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    // Renderizamos los cambios
    renderizarCarrito();
    calcularTotal();
			document.getElementById('spanCarrito').innerHTML=' '+ 0;
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// Inicio
renderizarProductos();