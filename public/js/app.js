(function() {
  angular
    .module('BlenderApp')
    .controller('BlenderController', function($http, $state) {
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
          }
        })
        .catch(function(err) {
          console.log(err);
        })
      }

      this.login = function(user) {
        return $http({
          url: `${rootUrl}/users/login`,
          method: 'POST',
          data: {user : user}
        })
        .then(function(response) {
          // if (response.data.status === 401) {
          //   self.user.password = '';
          // }
          console.log(response, user, 'this is the current user');
          self.user = response.data.user;
          self.id = response.data.user.id;
          console.log('token ---->', response.data.token);
          localStorage.setItem('token', JSON.stringify(response.data.token))
            $state.go('blend', {url: '/blend', user: response.data.user})
        })
        .catch(function(err) {
          console.log(err);
        })
      }

      $http.get(`${rootUrl}/users`)
      .then(function(response) {
        console.log(response);
        self.users = response.data.users;
      })

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

      this.showColorSchemes = function(id) {
        console.log('user id', id);
        return $http({
          url: `${rootUrl}/users/${id}/color_schemes`,
          method: 'GET'
        })
        .then(function(response) {
          console.log(response);
          self.colorSchemes = response.data.colorSchemes;
        })
      }

      // var newColorScheme = '';
      this.addColorScheme = function(newColorScheme, user_id) {
        // newColorScheme = {
        //   color_scheme_name: color_scheme_name,
        //   color_one: color_one,
        //   color_two: color_two,
        //   color_three: color_three,
        //   color_four: color_four,
        //   color_five: color_five,
        // }
        console.log('clicked');
        return $http({
          url: `${rootUrl}/users/${user_id}/color_schemes`,
          method: 'POST',
          data: {color_scheme: newColorScheme}
        })
        .then(function(response) {
          console.log(response);
          console.log('newColorScheme ---->', newColorScheme)
          self.colorSchemes.push(newColorScheme);
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

    });
})() //IIFE
