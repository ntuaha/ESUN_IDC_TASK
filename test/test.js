let gsa = require('../modules/google_spreadsheet_api')
let google = require('googleapis')
let assert = require('assert')


/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */

function testConnection(auth,task){
    var sheets = google.sheets('v4');
    sheets.spreadsheets.values.get({
      auth: auth,
      spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
      range: 'Class Data!A1:E',
    }, function(err, response) {
      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }
      task(response);
    });
}


describe('測試GCP連線服務', function() {
  describe('驗證唯讀連線', function() {
    it('應該要輸出內容,一共32筆', function(done) {
      gsa.run(['https://www.googleapis.com/auth/spreadsheets.readonly'],function(auth){
        testConnection(auth,function(r){
          assert.equal(31, r.values.length);
          done();
        });
      });
    });
  });
});
