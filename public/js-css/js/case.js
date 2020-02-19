$(document).foundation();
/*Esta funcion se define para emitir un mensaje de alerta cuando se ha agregado correctamente*/
function showSuccessMessage(){
	alert("Agregado");
}
/*Esta funcion permite eliminar un documento a traves de su identificador*/
function deleteDoc(id){
  $.ajax({
    url: '/document-web/' + id,
    type: 'DELETE'
  });
  location.reload();
}
/*Esta funcion permite eliminar un caso a traves de su identificador*/
function deleteCase(id){
  $.ajax({
    url: '/case-web/' + id,
    type: 'DELETE'
  });
  location.reload();
}
/*Esta funcion permite buscar un caso y mostrarlo en una tabla*/
$("#searchCase").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#tableDoc tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

/*Esta funcion permite hacer modificaciones y validacion de los campos a traves de la funcion regex */
function changeType(x, type) {
  if(x.prop('type') == type)
  return x; //That was easy.
  try {
    return x.prop('type', type);
  } catch(e) {
    /*Intenta volver a crear el elemento
    jQuery no tiene un método html () para el elemento, por lo que primero se coloca en un div*/
    var html = $("<div>").append(x.clone()).html();
    var regex = /type=(\")?([^\"\s]+)(\")?/; //matches type=text or type="text"
    /*Si no hay coincidencia,  se agregamos el atributo type al final; de lo contrario, se reemplaza*/
    var tmp = $(html.match(regex) == null ?
      html.replace(">", ' type="' + type + '">') :
      html.replace(regex, 'type="' + type + '"') );
    /* aqui se copian los datos del elemento antiguo*/
    tmp.data('type', x.data('type') );
    var events = x.data('events');
    var cb = function(events) {
      return function() {
        /*Vincula todos los eventos anteriores*/
            for(i in events)
            {
              var y = events[i];
              for(j in y)
                tmp.bind(i, y[j].handler);
            }
          }
        }(events);
        x.replaceWith(tmp);
        /*Define un tiempo de espera para llamar la funcion*/
    setTimeout(cb, 10);
    return tmp;
  }
}