angular.module('app')
.controller('cartControl', function($scope, $stateParams, mainService) {

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
});
