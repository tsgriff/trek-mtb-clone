angular.module('app')
  .controller('profileControl', function(mainService, $scope, user) {

    $scope.getUserInfo = function() {
      mainService.getCurrentUser().then(function(response) {
        $scope.user = response;
      })
    };

    $scope.getUserInfo();

  });
