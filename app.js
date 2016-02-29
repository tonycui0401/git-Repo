'use strict';
 var App = angular.module('repoApp', ['ui.router'])
.config(['$stateProvider',
    function($stateProvider) {

      $stateProvider
        .state('repos', {
          url: '/repos',
          templateUrl: 'repos.list.html',
          controller: 'repoListCtrl'
        })
       
        .state('repos.detailAsRoot', {
          url: '^/repos/:id',
          views: {
            '@': {
              templateUrl: 'repos.detail.html',
              controller: 'repoAsRootCtrl'
            }
          },
        });

    }
  ])
  .controller('repoAsRootCtrl', function($scope, $state, $stateParams, $http) {
  
    $http({method: 'GET', url: 'gitRepo.json'}).success(function(data) {
     $scope.repos = data;
     $scope.repos.sort(function(a, b){return b.designation-a.designation}); 
    $scope.repo = $scope.repos[$stateParams.id];
     });

  })
.config(['$urlRouterProvider',
  function($urlRouterProvider) {

    $urlRouterProvider.otherwise('/repos');
  }
]).controller('repoListCtrl', ['$scope', '$http', function ($scope, $http) {
      

    $http({method: 'GET', url: 'gitRepo.json'}).success(function(data) {
     $scope.repos = data;
     });


}]);



App.run(function ($rootScope, $location) {

    var history = [];

    $rootScope.$on('$routeChangeSuccess', function() {
        history.push($location.$$path);
    });

    $rootScope.back = function () {
        var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
        $location.path(prevUrl);
    };

});









