$(document).ready(function() {


  function render(data) {
    $('tbody').html($(data).map(function(i, item) {

      var location = item.location ? item.location : '';
      var re = /(\d+°\d+.+\d+°.+\w)/
      
      var matchs = location.match(re);
      var latlng = '';
      if (matchs) {
        latlng = matchs[1];
      }
      var url = '#';
      if (latlng) {
        var param = 'center=' + encodeURIComponent(latlng) + '&zoom=18&size=800x800&maptype=satellite&markers=color:blue|' + encodeURIComponent(latlng) + '&scale=2';

        url = 'https://ditu.google.cn/maps/api/staticmap?'+  param;
      }
      
      return '<tr><td>' + item.name + '</td><td class="location"><a href="' + url + '">' + location + '</a></td></tr>'
    }).get().join());
  }
  render(countries);

  $('#foundFilter').change(function(b) {
    var checked = $(this).prop('checked');
    if (checked) {
      render(countries.filter(function(c) {
        return !c.found;
      }));
    } else {
      render(countries);
    }
  });

  $('#total').text(countries.length);
  $('#found').text(countries.filter(function(c) {
    return c.found;
  }).length);
  $('#notfound').text(countries.filter(function(c) {
    return !c.found;
  }).length);
  $('#refreshedat').text(new Date(date));

});