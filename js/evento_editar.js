const URL = "https://dh96183.pythonanywhere.com/"; 

const app = Vue.createApp({
  data() {
    return {
      idEvento: '',
      nombre: '',
      descripcion: '',
      tipo: '',
      fecha: '',
      ubicacion: '',
      detalles: '',
      mostrarDatosEvento: false,
      imagenSeleccionada: null,
      imagenUrlTemp: null,
    };
  },
  methods: {
    obtenerEvento() {
      fetch(URL + 'eventos/' + this.idEvento)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error al obtener los datos del evento.');
          }
        })
        .then(data => {
          this.nombre = data.nombre;
          this.descripcion = data.descripcion;
          this.tipo = data.tipo_evento;
          this.fecha = data.fecha;
          this.ubicacion = data.ubicacion;
          this.detalles = data.detalles;
          this.mostrarDatosEvento = true;
        })
        .catch(error => {
          console.log(error);
          alert('ID de evento no encontrado.');
        });
    },
    seleccionarImagen(event) {
      const file = event.target.files[0];
      this.imagenSeleccionada = file;
      this.imagenUrlTemp = URL.createObjectURL(file);
    },
    guardarCambios() {

      let evento = {
        nombre: this.nombre,
        descripcion: this.descripcion,
        tipo_evento: this.tipo,
        fecha: this.fecha,
        ubicacion: this.ubicacion,
        detalles: this.detalles,
      };

      fetch(URL + 'eventos/' + this.idEvento, {
        method: 'PUT',
        body: JSON.stringify(evento),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(response => {
          console.log(response);
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error al guardar los cambios del evento.', response);
          }
        })
        .then(data => {
          alert('Evento actualizado correctamente.');
          this.limpiarFormulario();
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Error al actualizar el evento.');
        });
    },
    limpiarFormulario() {
      this.idEvento = '';
      this.nombre = '';
      this.descripcion = '';
      this.tipo = '';
      this.fecha = '';
      this.ubicacion = '';
      this.detalles = '';
      this.mostrarDatosEvento = false;
    },
  },
});

app.mount('#app');
