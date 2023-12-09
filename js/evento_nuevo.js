const { createApp, ref, onMounted } = Vue;

createApp({
  setup() {
    const url = 'https://dh96183.pythonanywhere.com';
    const nombre = ref('');
    const descripcion = ref('');
    const tipo_evento = ref('');
    const fecha = ref('');
    const ubicacion = ref('');
    const detalles = ref('');

    const grabar = () => {
        let evento = {
          nombre: nombre.value,
          descripcion: descripcion.value,
          tipo_evento: tipo_evento.value,
          fecha: fecha.value,
          ubicacion: ubicacion.value,
          detalles: detalles.value,
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

    return {
        url,
        nombre,
        descripcion,
        tipo_evento,
        fecha,
        ubicacion,
        detalles,
        grabar,  
      };
  }  
}).mount('#app');