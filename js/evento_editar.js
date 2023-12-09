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
      const formData = new FormData();
      formData.append('nombre', this.nombre);
      formData.append('descripcion', this.descripcion);
      formData.append('tipo_evento', this.tipo);
      formData.append('fecha', this.fecha);
      formData.append('ubicacion', this.ubicacion);
      formData.append('detalles', this.detalles);

      if (this.imagenSeleccionada) {
        formData.append('imagen', this.imagenSeleccionada, this.imagenSeleccionada.name);
      }

      fetch(URL + 'eventos/' + this.idEvento, {
        method: 'PUT',
        body: formData,
        credentials: 'include', 
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error al guardar los cambios del evento.');
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
