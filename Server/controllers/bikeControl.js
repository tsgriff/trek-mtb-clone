var app = require('../../index.js');
var db = app.get('db');

module.exports = {

  getBikeDetails: function(req, res) {
    var bike = req.params;
    db.get_bike_details([bike.id], function(err, bikes) {
      res.send(bikes);
    });
  }

};
