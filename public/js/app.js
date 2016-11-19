(function() {
  angular
    .module('BlenderApp')
    .controller('BlenderController', function($http, $state, $scope) {
      var self = this;
      // var rootUrl = 'http://localhost:3000'
      var rootUrl = 'https://r-blends-backend.herokuapp.com'

// USER FUNCTIONS

      this.signup = function(user) {
        console.log(user, 'user');
        self.signed = user;
        return $http({
          url: `${rootUrl}/users`,
          method: 'POST',
          data: {user : user}
        })
        .then(function(response) {
          console.log(response);
          if (response.data.status === 200) {
            self.success = true;
            self.login(self.signed);
          } else {
            console.log(response);
            $('#input2, #input3, #input4').addClass('animated shake');
          }
        })
        .catch(function(err) {
          console.log(err);
        })
      }

      $http.get(`${rootUrl}/users`)
      .then(function(response) {
        console.log(response, 'ALL USERS');
        self.users = response.data.users;
      })

      this.login = function(user) {
        return $http({
          url: `${rootUrl}/users/login`,
          method: 'POST',
          data: {user : user}
        })
        .then(function(response) {
          if (response.data.status === 401) {
            $('#input, #input1').addClass('animated shake');
          }
          console.log(response, user, 'this is the current user');
          self.user = response.data.user;
          self.id = response.data.user.id;
          console.log(self.id, 'id of current user');
          console.log('token ---->', response.data.token);
          localStorage.setItem('token', JSON.stringify(response.data.token))
            $state.go('blend', {url: '/blend', user: response.data.user})
        })
        .then(function(response) {
          return $http({
            url: `${rootUrl}/users/${self.id}/color_schemes`,
            method: 'GET'
          })
        })
        .then(function(response) {
          console.log(response);
          self.colorSchemes = response.data.colorSchemes;
        })
        .catch(function(err) {
          console.log(err);
        })
      }

      this.logout = function(user) {
        console.log('logging out ---->', user);
        self.user = null;
        self.success = null;
        self.repeatText = "";
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('id');
        $state.go('home', {url: '/'});
      }

      this.updateSettings = function(user_id, newInformation) {
        return $http({
          url: `${rootUrl}/users/${user_id}`,
          method: 'PATCH',
          data: {update : newInformation}
        })
        .then(function(response) {
          self.newInformation = {};
          console.log(response);
        })
        .catch(function(err) {
          console.log(err);
        })
      }
      this.newInformation = {};


// COLOR SCHEME FUNCTIONS

// Get All Color Schemes From All Users
      $http.get(`${rootUrl}/color_schemes/all_color_schemes`)
      .then(function(response) {
        console.log(response, 'ALL COLOR SCHEMES');
        self.allColorSchemes = response.data.allColorSchemes;
        // self.color_id = response.data.all_color_schemes.color_id;
      })

      this.showAllColorSchemes = function(allColorSchemes) {
        console.log('allColorSchemes clicked');
        return $http({
          url: `${rootUrl}/color_schemes/all_color_schemes`,
          method: 'GET'
        })
        .then(function(response) {
          console.log(response, 'all schemes');
          self.allColorSchemes = response.data.allColorSchemes;
          // self.color_id = response.data.all_color_schemes.color_id;
        })
      }

      this.addColorScheme = function(newColorScheme, user_id) {
        console.log('clicked');
        return $http({
          url: `${rootUrl}/users/${user_id}/color_schemes`,
          method: 'POST',
          data: {color_scheme: newColorScheme}
        })
        .then(function(response) {
          if (response.data.status === 422) {
            $('#input7').addClass('animated shake');
          } else {
            console.log(response);
            console.log('newColorScheme ---->', newColorScheme)
            self.colorSchemes.push(newColorScheme);
            self.newColorScheme = '';
          }
        })
        .catch(function(err) {
          console.log(err);
        })
      }

      this.deleteColorScheme = function(user_id, color_scheme_id, index) {
        console.log('user:', user_id, 'color_scheme_id:', color_scheme_id, 'index:', index);
        self.colorSchemes.splice(index, 1);
        return $http({
          url: `${rootUrl}/users/${user_id}/color_schemes/${color_scheme_id}`,
          method: 'DELETE'
        })
        .then(function(response) {
          console.log(response);
          return response;
        })
        .catch(function(err) {
          console.log(err);
        })
      }

      this.clearHistory = function(user_id) {
        console.log('user:', user_id);
        return $http({
          url: `${rootUrl}/users/${user_id}/color_schemes`,
          method: 'DELETE'
        })
        .then(function(response) {
          return response;
        })
        .then(function(response) {
          console.log('hitting this part of promise');
          return $http({
            url: `${rootUrl}/users/${self.id}/color_schemes`,
            method: 'GET'
          })
        })
        .then(function(response) {
          console.log(response);
          self.colorSchemes = response.data.colorSchemes;
        })
        .catch(function(err) {
          console.log(err);
        })
      }

      $scope.hoverIn = function(){
          this.showName = true;
      };

      $scope.hoverOut = function(){
          this.showName = false;
      };


    });
})() //IIFE
