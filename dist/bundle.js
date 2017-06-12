angular.module('app', ['ui.router'])
  .config(["$stateProvider", "$urlRouterProvider", "$sceDelegateProvider", function($stateProvider, $urlRouterProvider, $sceDelegateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: './app/routes/home/home.html',
        controller: 'homeControl'
      })

      .state('bike', {
        url: '/bike/:id',
        templateUrl: './app/routes/bike/bike.html',
        controller: 'bikeControl'
      })

      .state('profile', {
        url: '/profile',
        templateUrl: "./app/routes/profile/profile.html",
        controller: 'profileControl',
        resolve: {
          user: ["mainService", function(mainService){
            return mainService.getCurrentUser().then(function(response){
              console.log(response)
              return response;
            })
          }]
        }
      })

      .state('cart', {
        url: '/cart',
        templateUrl: './app/routes/cart/cart.html',
        controller: 'cartControl'
      })

      $urlRouterProvider.otherwise('/');


      $sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$')]);

  }]);

angular.module('app')
  .service('mainService', ["$http", function($http) {

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

}]);

angular.module('app')
  .directive('carouselDirective', ["$timeout", function($timeout) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        $timeout(function () {
          $(element).slick(scope.$eval(attrs.carouselDirective));
        })
      }
    }
  }])

angular.module('app')
.controller('cartControl', ["$scope", "$stateParams", "mainService", function($scope, $stateParams, mainService) {

// $scope.bike = mainService.bike;

mainService.getCart().then(function(res) {

  $scope.cart = res.data;

  $scope.totalPrice = 0
  for (var i = 0; i < $scope.cart.length; i++) {
      let price = $scope.cart[i].price;
      let newStr = price.replace(/[, ]+/g, "").trim();
      let correctPrice = parseFloat(newStr);

    $scope.totalPrice += correctPrice * $scope.cart[i].order.quantity;
  }
})

$scope.deleteCart = () => {
  mainService.deleteCart().then(() => {
    $scope.cart = [];
    $scope.totalPrice = 0;

  });
  }
}]);

angular.module("app")
  .controller("bikeControl", ["$scope", "mainService", "$stateParams", function($scope, mainService, $stateParams) {

  $scope.getBikeDetails = () => {
      let bikeId = $stateParams.id;
      mainService.findBike(bikeId).then(function(response) {
      $scope.bike = response.data[0];
      mainService.bike = $scope.bike;
    })
  }

$scope.getBikeDetails();


$scope.addToCart = function(bike) {
  mainService.addToCart(bike).then( () => {
    // Get the latest cart from the server. It has been updated.
    mainService.getCart().then(function(res) {
      $scope.cart = res.data;
    })
  })
}


}]);

angular.module('app')
  .controller('homeControl', ["$http", "$scope", "mainService", "$state", "$anchorScroll", "$location", function($http, $scope, mainService, $state, $anchorScroll, $location) {

      $scope.getHomeDetails = () => {

        mainService.getInfo().then((response) => {
          $scope.info = response.data;
        })
      };

      $scope.getHomeDetails();

      $scope.scrollTo = (id) => {
        $location.hash(id);
      };


}]);

angular.module('app')
  .controller('profileControl', ["mainService", "$scope", "user", function(mainService, $scope, user) {

    $scope.getUserInfo = function() {
      mainService.getCurrentUser().then(function(response) {
        $scope.user = response;
      })
    };

    $scope.getUserInfo();

  }]);
