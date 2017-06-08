angular.module('app')
  .service('mainService', function($http) {

    this.getInfo = function() {
      return $http({
        method: "GET",
        url: "/api/home"
      })
      .then(function(response) {
        return response
      })
    }


      this.findBike = function(bikeId) {
        return $http({
          method: "GET",
          url: "/api/bike/" + bikeId
        })
        .then(function(response) {
          return response
        })
      }


		this.getCurrentUser = function() {
			return $http({
					method: 'GET',
					url: '/me'
				})
				.then(function(response) {
					return response.data;
				});
		}

    this.addToCart = function(bike) {
      return $http.post('/api/cart', bike)
    }

    this.getCart = function() {
    return $http.get('/api/cart')
  }

  this.deleteCart = function() {
    return $http.delete('/api/cart')
  }

});
