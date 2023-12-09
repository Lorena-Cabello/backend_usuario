const URL = "http://127.0.0.1:5000/"
const app = Vue.createApp({
    data() {
        return {
            id: '',
            apellido: '',
            nombre: '',
            correo: '',
            password: '',
            telefono: null,
            mostrarDatosProducto: false,
        };
    },
    methods: {
        obtenerUsuario() {
            fetch(URL + 'usuarios/' + this.codigo)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {


                        throw new Error('Error al obtener los datos del usuario.')

                    }
                })
                .then(data => {
                    this.id = data.id;
                    this.apellido = data.apellido;
                    this.nombre = data.nombre;
                    this.correo = data.correo;
                    this.password = data.password;
                    this.telefono = data.telefono;
                    this.mostrarDatosProducto = true;
                })
                .catch(error => {
                    console.log(error);
                    alert('Código no encontrado.');
                })
        },


        guardarCambios() {
            const formData = new FormData();
            formData.append('id', this.id);
            formData.append('apellido', this.apellido);
            formData.append('nombre', this.nombre);
            formData.append('correo', this.correo);
            formData.append('password', this.password);
            formData.append('telefono', this.telefono);

            //Utilizamos fetch para realizar una solicitud PUT a la API y guardar los cambios.

            fetch(URL + 'usuarios/' + this.codigo, {
                method: 'PUT',
                body: formData,
            })
                .then(response => {
                    //Si la respuesta es exitosa, utilizamos response.json() para parsear la respuesta en formato JSON.
                    if (response.ok) {
                        return response.json()
                    } else {
                        //Si la respuesta es un error, lanzamos una excepción.

                        throw new Error('Error al guardar los cambios del usuario.')
                    }
                })
                .then(data => {
                    alert('Usuario actualizado correctamente.');
                    this.limpiarFormulario();
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error al actualizar el usuario.');
                });
        },
        limpiarFormulario() {

            this.id = '',
                this.apellido = '',
                this.nombre = '',
                this.correo = '',
                this.password = '',
                this.telefono = null,
                this.mostrarDatosProducto = false
 
        }
    },

});
// app.mount('#app');