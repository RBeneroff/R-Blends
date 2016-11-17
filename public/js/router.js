(function() {
  angular
    .module('BlenderApp', ['ui.router', 'ngAnimate'])
    .config(MainRouter);

  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

  function MainRouter($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'login.html'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'signup.html'
    })
    .state('settings', {
      url: '/settings',
      templateUrl: 'settings.html'
    })
    .state('explore', {
      url: '/explore',
      templateUrl: 'explore.html'
    })
    .state('blend', {
      url: '/blend',
      templateUrl: 'blend.html'
    })
    .state('test', {
      url: '/test',
      templateUrl: 'test.html'
    })

    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    })


  } //MainRouter
})() //IIFE
