var app = require('../../index.js');
var db = app.get('db');

module.exports = {

  getBikesHome: function(req, res) {
    db.get_home_info(function(err, bikes) {
      res.send(bikes);
    });
  }

};
