angular.module('app', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider, $sceDelegateProvider) {
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
          user: function(mainService){
            return mainService.getCurrentUser().then(function(response){
              console.log(response)
              return response;
            })
          }
        }
      })

      .state('cart', {
        url: '/cart',
        templateUrl: './app/routes/cart/cart.html',
        controller: 'cartControl'
      })

      $urlRouterProvider.otherwise('/');


      $sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$')]);

  });
