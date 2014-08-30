$(document).ready(function() {
  function render(data) {
    $('tbody').html($(data).map(function(i, item) {
      var location = item.location?item.location:'';
      return '<tr><td>'+item.name+'</td><td>'+item.found+'</td><td>'+location+'</td></tr>'
    }).get().join());
  }
  render(countries);

  $('#foundFilter').change(function(b) {
    var checked = $(this).prop('checked');
    if(checked){
      render(countries.filter(function(c) {
        return !c.found;
      }));
    }else{
      render(countries);
    }
  });
});