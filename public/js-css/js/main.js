$(document).foundation();
/*funcion que emite mensaje de alerta cuando se agrega correctamente un registro*/
function showSuccessMessage(){
	alert("Agregado");
}
/*funcion que permite eliminar un caso*/
function deleteCase(id){
  $.ajax({
    url: '/case-web/' + id,
    type: 'DELETE'
  });
  location.reload();
}
/*funcion que permite eliminar un cliente*/
function deleteClient(id){
  $.ajax({
    url: '/client-web/' + id,
    type: 'DELETE'
  });
  location.reload();
}
/*funcion que permite eliminar un tribunal*/
function deleteCourt(id){
  $.ajax({
    url: '/court-web/' + id,
    type: 'DELETE'
  });
  location.reload();
}
/*aqui se permite buscar un caso y se crea un filtro que busca caso a caso*/
$("#searchCase").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#tableCase tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
/*aqui se permite buscar un cliente y se crea un filtro que busca un cliente especifico*/
$("#searchClient").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#tableClient tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
/*aqui se permite buscar un tribunal y se crea un filtro que busca cada tribunal*/
$("#searchCourt").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#tableCourt tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

/*aqui se hacen algunas validaciones para los cambios y permite cambiar el tipo de entrada llamando la funcion changeType*/
$('.unmask').on('click', function(){

  if($(this).prev('input').attr('type') == 'password')
    changeType($(this).prev('input'), 'text');

  else
    changeType($(this).prev('input'), 'password');

  return false;
});
/*esta funcion permite cambiar el tipo*/
function changeType(x, type) {
  if(x.prop('type') == type)
  return x;
  try {
    return x.prop('type', type);
  } catch(e) {
      /*Intenta volver a crear el elemento
      jQuery no tiene un método html () para el elemento, por lo que primero se debe colocar en un div*/
    var html = $("<div>").append(x.clone()).html();
    var regex = /type=(\")?([^\"\s]+)(\")?/;
    /*verifica si coincide con type = text o type = "text"
     Si no hay coincidencia, se agrega el atributo type al final; de lo contrario, se reemplaa*/
    var tmp = $(html.match(regex) == null ?
      html.replace(">", ' type="' + type + '">') :
      html.replace(regex, 'type="' + type + '"') );
      /*Copia los datos del elemento antiguo*/
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