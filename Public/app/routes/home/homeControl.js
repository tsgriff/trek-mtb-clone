angular.module('app')
  .controller('homeControl', function($scope, mainService, $state, $anchorScroll, $location) {

      $scope.getHomeDetails = () => {
        mainService.getInfo().then((response) => {
          $scope.info = response.data;
        })
      };

      $scope.getHomeDetails();

      $scope.scrollTo = (id) => {
        $location.hash(id);
      };
});
