const carrito = document.querySelector('#carrito-compras');
const contenedorCarrito = document.querySelector('#lista-carrito-compras tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const ListaProductos = document.querySelector('#productos');
let articulosCarrito = []

cargarEventListeners();
function cargarEventListeners(){
    ListaProductos.addEventListener('click', agregarProducto);
    carrito.addEventListener('click', eliminarProducto);
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        LimpiarHTML();
    });
}


function agregarProducto(evento){
    evento.preventDefault();    
    if(evento.target.classList.contains('agregar-carrito')){
        const productoSeleccionado = evento.target.parentElement.parentElement;
        leerDatosProducto(productoSeleccionado);
    }
}

function eliminarProducto(evento){
    
    if(evento.target.classList.contains('borrar-producto')){
        const productoId = evento.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);        
        carritoHTML();
    }
}

function leerDatosProducto(producto){
    
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        nombre: producto.querySelector('h3').textContent,
        precio: producto.querySelector('.precio span').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    const existe = articulosCarrito.some(producto => producto.id === infoProducto.id);
    if(existe){
        const productos = articulosCarrito.map(producto => {
            if(producto.id === infoProducto.id){
                producto.cantidad++;
                return producto;
            } else{
                return producto;
            }
        });
        articulosCarrito = [...productos];
    }else{
        articulosCarrito = [...articulosCarrito, infoProducto];
    }
    

    console.log(articulosCarrito);

    carritoHTML();
}

function carritoHTML(){
    LimpiarHTML();

    articulosCarrito.forEach((producto)=>{

        const{imagen, nombre, precio, cantidad, id} = producto;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${imagen}"></td>
            <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-producto" data-id="${id}"> X </a> 
            </td>
        `;
        
        contenedorCarrito.appendChild(row);

    });
}

function LimpiarHTML() {
    
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }

}
