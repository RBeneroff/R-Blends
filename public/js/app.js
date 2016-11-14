(function() {
  angular
    .module('BlenderApp')
    .controller('BlenderController', function($http, $state, $scope) {
      var self = this;
      var rootUrl = 'http://localhost:3000'
      // var rootUrl = 'https://r-blends-backend.herokuapp.com'

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
            self.user.password = '';
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

      this.logout = function(user) {
        console.log('logging out ---->', user);
        self.user = null;
        self.success = null;
        self.repeatText = "";
        localStorage.removeItem('token');
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
      $http.get(`${rootUrl}/all_color_schemes`)
      .then(function(response) {
        console.log(response, 'ALL COLOR SCHEMES');
        self.allColorSchemes = response.data.allColorSchemes;
      })

      this.showAllColorSchemes = function(all_color_schemes) {
        console.log('allColorSchemes clicked');
        return $http({
          url: `${rootUrl}/all_color_schemes`,
          method: 'GET'
        })
        .then(function(response) {
          console.log(response, 'all schemes');
          self.all_color_schemes = response.data.all_color_schemes;
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
          return $http({
            url: `${rootUrl}/all_color_schemes`,
            method: 'POST',
            data: {all_color_scheme: newColorScheme}
          })
        })
        .then(function(response) {
          console.log(response);
          console.log('newColorScheme ---->', newColorScheme)
          self.colorSchemes.push(newColorScheme);
          self.newColorScheme = '';
        })
        .catch(function(err) {
          console.log(err);
        })
      }

      this.deleteColorScheme = function(user_id, color_scheme_id, index) {
        console.log('user:', user_id, 'color_scheme_id:', color_scheme_id, 'index:', index);
        self.colorSchemes.splice(index, 1);
        // self.all_color_schemes.splice(index, 1);
        return $http({
          url: `${rootUrl}/users/${user_id}/color_schemes/${color_scheme_id}`,
          method: 'DELETE'
        })
        // .then(function(response) {
        //   return $http({
        //     url: `${rootUrl}/all_color_schemes/${id}`,
        //     method: 'GET'
        //   })
        // })
        // .then(function(response) {
        //   return $http({
        //     url: `${rootUrl}/all_color_schemes/${id}`,
        //     method: 'DELETE',
        //   })
        // })
        .then(function(response) {
          console.log(response);
          return response;
        })
        .catch(function(err) {
          console.log(err);
        })
      }

// need to create a new route to do this
      // this.clearHistory = function(user_id) {
      //   console.log('user:', user_id);
      //   return $http({
      //     url: `${rootUrl}/users/${user_id}/color_schemes`,
      //     method: 'DELETE'
      //   })
      //   .then(function(response) {
      //     console.log(response);
      //     return response;
      //   })
      //   .catch(function(err) {
      //     console.log(err);
      //   })
      // }

      $scope.hoverIn = function(){
          this.showName = true;
      };

      $scope.hoverOut = function(){
          this.showName = false;
      };

      // $scope.random = function() {
      //   return 0.5 - Math.random();
      // }

    });
})() //IIFE


//UNUSED CODE

// this.showColorSchemes = function(id) {
//   console.log('user id', self.id);
//   return $http({
//     url: `${rootUrl}/users/${id}/color_schemes`,
//     method: 'GET'
//   })
//   .then(function(response) {
//     console.log(response);
//     self.colorSchemes = response.data.colorSchemes;
//   })
// }

// newColorScheme = {
//   color_scheme_name: color_scheme_name,
//   color_one: color_one,
//   color_two: color_two,
//   color_three: color_three,
//   color_four: color_four,
//   color_five: color_five,
// }
