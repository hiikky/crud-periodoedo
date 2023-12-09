const { createApp, ref, onMounted } = Vue;

createApp({
  setup() {
    const eventos = ref([]);
    const url = 'https://dh96183.pythonanywhere.com';
    const error = ref(false);
    const cargando = ref(true);

    const fetchData = () => {
      fetch(url + '/eventos')
        .then(response => response.json())
        .then(data => {
          eventos.value = data;
          cargando.value = false;
        })
        .catch(err => {
            console.error(err);
            this.error=true
        })
    };

    const eliminar = (idEvento) => {
      const deleteUrl = url + '/eventos/' + idEvento;
      var options = {
        method: 'DELETE',
      };
      fetch(deleteUrl, options)
        .then(res => res.text())
        .then(res => {
          location.reload();
        });
    };

    const grabar = () => {
      let evento = {
        nombre: this.nombre,
        descripcion: this.descripcion,
        tipo_evento: this.tipo_evento,
        fecha: this.fecha,
        ubicacion: this.ubicacion,
        detalles: this.detalles,
      };

      var options = {
        body: JSON.stringify(evento),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow',
      };

      fetch(url + '/eventos', options)
        .then(() => {
          alert("Registro grabado");
          window.location.href = "./eventos.html";
        })
        .catch(err => {
          console.error(err);
          alert("Error al Grabar");
        });
    };

    onMounted(() => {
      fetchData();
    });

    return {
      eventos,
      url,
      error,
      cargando,
      fetchData,
      eliminar,
      grabar,
    };
  },
}).mount('#app');