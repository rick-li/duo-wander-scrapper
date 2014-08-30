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

var allCountries = [
  {
    "name" : "Afghanistan"
  },
  {
    "name" : "Aland Islands"
  },
  {
    "name" : "Albania"
  },
  {
    "name" : "Algeria"
  },
  {
    "name" : "American Samoa"
  },
  {
    "name" : "Andorra"
  },
  {
    "name" : "Angola"
  },
  {
    "name" : "Anguilla"
  },
  {
    "name" : "Antarctica"
  },
  {
    "name" : "Antigua and Barbuda"
  },
  {
    "name" : "Argentina"
  },
  {
    "name" : "Armenia"
  },
  {
    "name" : "Aruba"
  },
  {
    "name" : "Australia"
  },
  {
    "name" : "Austria"
  },
  {
    "name" : "Azerbaijan"
  },
  {
    "name" : "Bahamas"
  },
  {
    "name" : "Bahrain"
  },
  {
    "name" : "Bangladesh"
  },
  {
    "name" : "Barbados"
  },
  {
    "name" : "Belarus"
  },
  {
    "name" : "Belgium"
  },
  {
    "name" : "Belize"
  },
  {
    "name" : "Benin"
  },
  {
    "name" : "Bermuda"
  },
  {
    "name" : "Bhutan"
  },
  {
    "name" : "Bolivia, Plurinational State of"
  },
  {
    "name" : "Bonaire, Sint Eustatius and Saba"
  },
  {
    "name" : "Bosnia and Herzegovina"
  },
  {
    "name" : "Botswana"
  },
  {
    "name" : "Bouvet Island"
  },
  {
    "name" : "Brazil"
  },
  {
    "name" : "British Indian Ocean Territory"
  },
  {
    "name" : "Brunei Darussalam"
  },
  {
    "name" : "Bulgaria"
  },
  {
    "name" : "Burkina Faso"
  },
  {
    "name" : "Burundi"
  },
  {
    "name" : "Cambodia"
  },
  {
    "name" : "Cameroon"
  },
  {
    "name" : "Canada"
  },
  {
    "name" : "Cape Verde"
  },
  {
    "name" : "Cayman Islands"
  },
  {
    "name" : "Central African Republic"
  },
  {
    "name" : "Chad"
  },
  {
    "name" : "Chile"
  },
  {
    "name" : "China"
  },
  {
    "name" : "Christmas Island"
  },
  {
    "name" : "Cocos (Keeling) Islands"
  },
  {
    "name" : "Colombia"
  },
  {
    "name" : "Comoros"
  },
  {
    "name" : "Congo"
  },
  {
    "name" : "Congo, The Democratic Republic of the"
  },
  {
    "name" : "Cook Islands"
  },
  {
    "name" : "Costa Rica"
  },
  {
    "name" : "Cote d\'Ivoire"
  },
  {
    "name" : "Croatia"
  },
  {
    "name" : "Cuba"
  },
  {
    "name" : "Curacao"
  },
  {
    "name" : "Cyprus"
  },
  {
    "name" : "Czech Republic"
  },
  {
    "name" : "Denmark"
  },
  {
    "name" : "Djibouti"
  },
  {
    "name" : "Dominica"
  },
  {
    "name" : "Dominican Republic"
  },
  {
    "name" : "Ecuador"
  },
  {
    "name" : "Egypt"
  },
  {
    "name" : "El Salvador"
  },
  {
    "name" : "Equatorial Guinea"
  },
  {
    "name" : "Eritrea"
  },
  {
    "name" : "Estonia"
  },
  {
    "name" : "Ethiopia"
  },
  {
    "name" : "Falkland Islands (Malvinas)"
  },
  {
    "name" : "Faroe Islands"
  },
  {
    "name" : "Fiji"
  },
  {
    "name" : "Finland"
  },
  {
    "name" : "France"
  },
  {
    "name" : "French Guiana"
  },
  {
    "name" : "French Polynesia"
  },
  {
    "name" : "French Southern Territories"
  },
  {
    "name" : "Gabon"
  },
  {
    "name" : "Gambia"
  },
  {
    "name" : "Georgia"
  },
  {
    "name" : "Germany"
  },
  {
    "name" : "Ghana"
  },
  {
    "name" : "Gibraltar"
  },
  {
    "name" : "Greece"
  },
  {
    "name" : "Greenland"
  },
  {
    "name" : "Grenada"
  },
  {
    "name" : "Guadeloupe"
  },
  {
    "name" : "Guam"
  },
  {
    "name" : "Guatemala"
  },
  {
    "name" : "Guernsey"
  },
  {
    "name" : "Guinea"
  },
  {
    "name" : "Guinea-Bissau"
  },
  {
    "name" : "Guyana"
  },
  {
    "name" : "Haiti"
  },
  {
    "name" : "Heard Island and McDonald Islands"
  },
  {
    "name" : "Holy See (Vatican City State)"
  },
  {
    "name" : "Honduras"
  },
  {
    "name" : "Hong Kong"
  },
  {
    "name" : "Hungary"
  },
  {
    "name" : "Iceland"
  },
  {
    "name" : "India"
  },
  {
    "name" : "Indonesia"
  },
  {
    "name" : "Iran, Islamic Republic of"
  },
  {
    "name" : "Iraq"
  },
  {
    "name" : "Ireland"
  },
  {
    "name" : "Isle of Man"
  },
  {
    "name" : "Israel"
  },
  {
    "name" : "Italy"
  },
  {
    "name" : "Jamaica"
  },
  {
    "name" : "Japan"
  },
  {
    "name" : "Jersey"
  },
  {
    "name" : "Jordan"
  },
  {
    "name" : "Kazakhstan"
  },
  {
    "name" : "Kenya"
  },
  {
    "name" : "Kiribati"
  },
  {
    "name" : "Korea (North)"
  },
  {
    "name" : "Korea (South)"
  },
  {
    "name" : "Kuwait"
  },
  {
    "name" : "Kyrgyzstan"
  },
  {
    "name" : "Lao People\'s Democratic Republic"
  },
  {
    "name" : "Latvia"
  },
  {
    "name" : "Lebanon"
  },
  {
    "name" : "Lesotho"
  },
  {
    "name" : "Liberia"
  },
  {
    "name" : "Libyan Arab Jamahiriya"
  },
  {
    "name" : "Liechtenstein"
  },
  {
    "name" : "Lithuania"
  },
  {
    "name" : "Luxembourg"
  },
  {
    "name" : "Macao"
  },
  {
    "name" : "Macedonia, The former Yugoslav Republic of"
  },
  {
    "name" : "Madagascar"
  },
  {
    "name" : "Malawi"
  },
  {
    "name" : "Malaysia"
  },
  {
    "name" : "Maldives"
  },
  {
    "name" : "Mali"
  },
  {
    "name" : "Malta"
  },
  {
    "name" : "Marshall Islands"
  },
  {
    "name" : "Martinique"
  },
  {
    "name" : "Mauritania"
  },
  {
    "name" : "Mauritius"
  },
  {
    "name" : "Mayotte"
  },
  {
    "name" : "Mexico"
  },
  {
    "name" : "Micronesia, Federated States of"
  },
  {
    "name" : "Moldova, Republic of"
  },
  {
    "name" : "Monaco"
  },
  {
    "name" : "Mongolia"
  },
  {
    "name" : "Montenegro"
  },
  {
    "name" : "Montserrat"
  },
  {
    "name" : "Morocco"
  },
  {
    "name" : "Mozambique"
  },
  {
    "name" : "Myanmar"
  },
  {
    "name" : "Namibia"
  },
  {
    "name" : "Nauru"
  },
  {
    "name" : "Nepal"
  },
  {
    "name" : "Netherlands"
  },
  {
    "name" : "New Caledonia"
  },
  {
    "name" : "New Zealand"
  },
  {
    "name" : "Nicaragua"
  },
  {
    "name" : "Niger"
  },
  {
    "name" : "Nigeria"
  },
  {
    "name" : "Niue"
  },
  {
    "name" : "Norfolk Island"
  },
  {
    "name" : "Northern Mariana Islands"
  },
  {
    "name" : "Norway"
  },
  {
    "name" : "Oman"
  },
  {
    "name" : "Pakistan"
  },
  {
    "name" : "Palau"
  },
  {
    "name" : "Palestinian Territory, Occupied"
  },
  {
    "name" : "Panama"
  },
  {
    "name" : "Papua New Guinea"
  },
  {
    "name" : "Paraguay"
  },
  {
    "name" : "Peru"
  },
  {
    "name" : "Philippines"
  },
  {
    "name" : "Pitcairn"
  },
  {
    "name" : "Poland"
  },
  {
    "name" : "Portugal"
  },
  {
    "name" : "Puerto Rico"
  },
  {
    "name" : "Qatar"
  },
  {
    "name" : "Reunion"
  },
  {
    "name" : "Romania"
  },
  {
    "name" : "Russian Federation"
  },
  {
    "name" : "Rwanda"
  },
  {
    "name" : "Saint Barthelemy"
  },
  {
    "name" : "Saint Helena, Ascension and Tristan Da Cunha"
  },
  {
    "name" : "Saint Kitts and Nevis"
  },
  {
    "name" : "Saint Lucia"
  },
  {
    "name" : "Saint Martin (French Part)"
  },
  {
    "name" : "Saint Pierre and Miquelon"
  },
  {
    "name" : "Saint Vincent and The Grenadines"
  },
  {
    "name" : "Samoa"
  },
  {
    "name" : "San Marino"
  },
  {
    "name" : "Sao Tome and Principe"
  },
  {
    "name" : "Saudi Arabia"
  },
  {
    "name" : "Senegal"
  },
  {
    "name" : "Serbia"
  },
  {
    "name" : "Seychelles"
  },
  {
    "name" : "Sierra Leone"
  },
  {
    "name" : "Singapore"
  },
  {
    "name" : "Sint Maarten (Dutch Part)"
  },
  {
    "name" : "Slovakia"
  },
  {
    "name" : "Slovenia"
  },
  {
    "name" : "Solomon Islands"
  },
  {
    "name" : "Somalia"
  },
  {
    "name" : "South Africa"
  },
  {
    "name" : "South Georgia and The South Sandwich Islands"
  },
  {
    "name" : "South Sudan"
  },
  {
    "name" : "Spain"
  },
  {
    "name" : "Sri Lanka"
  },
  {
    "name" : "Sudan"
  },
  {
    "name" : "Suriname"
  },
  {
    "name" : "Svalbard and Jan Mayen"
  },
  {
    "name" : "Swaziland"
  },
  {
    "name" : "Sweden"
  },
  {
    "name" : "Switzerland"
  },
  {
    "name" : "Syrian Arab Republic"
  },
  {
    "name" : "Taiwan, Province of China"
  },
  {
    "name" : "Tajikistan"
  },
  {
    "name" : "Tanzania, United Republic of"
  },
  {
    "name" : "Thailand"
  },
  {
    "name" : "Timor-Leste"
  },
  {
    "name" : "Togo"
  },
  {
    "name" : "Tokelau"
  },
  {
    "name" : "Tonga"
  },
  {
    "name" : "Trinidad and Tobago"
  },
  {
    "name" : "Tunisia"
  },
  {
    "name" : "Turkey"
  },
  {
    "name" : "Turkmenistan"
  },
  {
    "name" : "Turks and Caicos Islands"
  },
  {
    "name" : "Tuvalu"
  },
  {
    "name" : "Uganda"
  },
  {
    "name" : "Ukraine"
  },
  {
    "name" : "United Arab Emirates"
  },
  {
    "name" : "United Kingdom"
  },
  {
    "name" : "United States"
  },
  {
    "name" : "United States Minor Outlying Islands"
  },
  {
    "name" : "Uruguay"
  },
  {
    "name" : "Uzbekistan"
  },
  {
    "name" : "Vanuatu"
  },
  {
    "name" : "Venezuela, Bolivarian Republic of"
  },
  {
    "name" : "Viet Nam"
  },
  {
    "name" : "Virgin Islands, British"
  },
  {
    "name" : "Virgin Islands, U.S."
  },
  {
    "name" : "Wallis and Futuna"
  },
  {
    "name" : "Western Sahara"
  },
  {
    "name" : "Yemen"
  },
  {
    "name" : "Zambia"
  },
  {
    "name" : "Zimbabwe"
  }
];

allCountries.splice(allCountries.indexOf('China'),1);
var data = [];
var getCountries = function() {

      jsdom.env({
        url: "https://www.duosuccess.com/tcm/001new01la090512a1.htm",
        src: [jquery],
        done: function(errors, window) {
            var $ = window.$;
            var root = $('body>ul');
            var finishedCountries = {};
            root.find('div>ul>div').each(function(i, el){var id = $(el).prev().find('u').text(); var location = $(el).find('li').text();var res = {}; finishedCountries[id] = location;});
            console.log(finishedCountries)
            data = allCountries.map(function(c) {
              console.log(finishedCountries[c.name]);
              var found = !!finishedCountries[c.name];
              var item = {name: c.name, found: found};
              if(found){
                item.location = finishedCountries[c.name];
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