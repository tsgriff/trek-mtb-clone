angular.module("app")
  .controller("bikeControl", function($scope, mainService, $stateParams) {

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


});
