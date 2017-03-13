let gsa = require('./modules/google_spreadsheet_api')
let google = require('googleapis')
let fs = require('fs')

function parser(auth,id){
  var sheets = google.sheets('v4');
  sheets.spreadsheets.values.get({
    auth: auth,
    spreadsheetId: id,
    range: 'Sheet1!A:E',
  },async function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var rows = response.values;
    if (rows.length === 0) {
      console.log('No data found.');
    } else {
      for (var i = 0; i < rows.length; i++) {
        console.log(rows[i]);        
      }
    }
    
  });
}


function listMajors(auth) {
  parser(auth,fs.readFileSync(__dirname+'/ID.txt','utf8'));

}

gsa.run(['https://www.googleapis.com/auth/spreadsheets.readonly'],listMajors);