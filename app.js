var express = require('express');
var fs = require('fs');
var request = require('request');
var jsdom = require('jsdom');


var env = process.env.NODE_ENV;
//console.log('env is ', env);


var app = express();
//var port = env === 'local' ? 3000 : 80;
var port = 3100;
app.set('views', __dirname);
app.set('view engine', 'jade');
app.use('port', port);
app.use('/public', express.static(__dirname + '/public'));
app.use(express.json());

var server = require('http').createServer(app).listen(port);
var jquery = fs.readFileSync("./node_modules/jquery/dist/jquery.js", "utf-8");

var allCountries = ['Afghanistan','Albania','Algeria','American Samoa','Andorra','Angola','Anguilla','Antigua and Barbuda','Argentina','Armenia','Aruba','Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bhutan','Bolivia','Bosnia Hercegovina','Botswana','Brazil','British Indian Ocean Territory','Brunei Darussalam','Bulgaria','Burkina Faso','Burundi','Cambodia','Cameroon','Canada','Cayman Islands','Central African Republic','Chad','Chile','China','Christmas Island','Cocos Islands','Colombia','Comoros','Congo','Cook Islands','Costa Rica','Croatia','Cuba','Cyprus','Czech Republic','Denmark','Djibouti','Dominica','Dominican Republic','East Timor','Ecuador','Egypt','El Salvador','Equatorial Guinea','Estonia','Ethiopia','Falkland Islands','Faroe Islands','Fiji','Finland','France','French Guiana','French Polynesia','French Southern Territories','Gambia','Georgia','Germany','Ghana','Gibraltar','Gobon','Great Britain(UK)','Greece','Greenland','Grenada','Guadeloupe','Guam','Guatemala','Guinea - Bissau','Guyana','Guynea','Haiti','Honduras','','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Israel','Italy','Ivory Coast','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kiribati','Korea - North','Korea - South','Kuwait','Kyrgyzstan','Lao People \'s Republic','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Martinique','Mauritania','Mexico','Micronesia','Moldova','Monaco','Mongolia','Montserrat','Morocco','Mozambique','Myanmar','Namibia','Nauru','Nepal','Netherlands','Netherlands Antilles','New Caledonia','New Zealand','Nicaragua','Niger','Nigeria','Niue','Norfolk Island','Northern Mariana Islands','Norway','Oman','Pakistan','Palau','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Pitcairn Island','Poland','Portugal','Puerto Rico','Qatar','Reunion Island','Romania','Russian Federation','Rwanda','Samoa','San Marino','Saudi Arabia','Senegal','Seychelles','Sierra Leone','Singapore','Slovakia','Solomon Islands','Somalia','South Africa','Spain','Sri Lanka','St. Helena','St. Lucia','Sudan','Suriname','Swaziland','Sweden','Switzerland','Syrian Arab Republic','Tajikistan','Tanzania','Thailand','Togo','tokelau','Tonga','Tunisia','Turkey','Turkmenistan','Tuvalu','Uganda','Ukrainian SSR','United Arab Emirates','United Kingdom','United States','Uruguay','Vanuatu','Vatican City State','Venezuela','Vietnam','Virgin Islands','Western Sahara','Yemen','Yugoslavia','Zaire','Zambia','Zimbabwe'];
var data = [];
var getCountries = function() {

      jsdom.env({
        url: "https://www.duosuccess.com/tcm/001new01la090512a1.htm",
        src: [jquery],
        done: function(errors, window) {
            var $ = window.$;
            var root = $('body>ul');
            var finishedCountries = {};
            root.find('div>ul>div').each(function(i, el){var id = el.id; var location = $(el).find('li').text();var res = {}; finishedCountries[id] = location;});
            console.log(finishedCountries)
            delete finishedCountries['China'];
            delete allCountries['China'];
            data = allCountries.map(function(c) {
              console.log(finishedCountries[c]);
              var found = !!finishedCountries[c];
              var item = {name: c, found: found};
              if(found){
                item.location = finishedCountries[c];
              }
              return item;
            });

            console.log(data);
        }
    });
};
getCountries();
setInterval(getCountries, 30 * 60 * 1000);


app.get('/countries', function(req, res, next) {
  res.render('countries', {countries: data});
});