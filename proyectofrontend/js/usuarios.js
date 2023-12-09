const { createApp } = Vue
createApp({
    data() {
        return {


           usuarios: [],
            url: 'http://localhost:5000/usuarios',
            error: false,
            cargando: true,

            id: 0,
            apellido:"",
            correo:"",
            nombre:"",
            password:"",
            telefono:0,




            
        }

        
    },

    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {

                    this.usuarios = data;
                    this.cargando = false;




                    console.log(data)
                    this.id = data.id
                    this.apellido = data.apellido
                    this.correo = data.correo
                    this.nombre = data.nombre
                    
                    this.password = data.password
                    this.telefono = data.telefono
                })
                .catch(err => {
                    console.error(err);
                    this.error = true
                })
        },

        eliminar(usuario) {
            const url = this.url + '/' + usuario;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
                    location.reload();
                })
        },

        grabar() {
            let usuario = {
                apellido: this.apellido,
                correo: this.correo,
                nombre: this.nombre,
                password: this.password,
                telefono: this.telefono,
                
            }
            var options = {
                body: JSON.stringify(usuario),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro grabado")
                    window.location.href = "./usuarios.html";
                })
                
        },





        
        modificar() {
            let usuario = {
                apellido: this.apellido,
                               
                correo: this.correo,
                nombre: this.nombre, 
                password: this.password,
                telefono: this.telefono
                
            }
            var options = {
                body: JSON.stringify(usuario),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado")
                    window.location.href = "./usuarios.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })
        }
    },
    created() {
        this.fetchData(this.url)
    },
}).mount('#app')