(function() {
  angular
    .module('BlenderApp')
    .controller('BlenderController', function($http, $state) {
      var self = this;
      var rootUrl = 'http://localhost:3000'

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
        console.log(id);
        return $http({
          url: `${rootUrl}/users/${id}/color_schemes`,
          method: 'GET'
        })
        .then(function(response) {
          console.log(response);
          self.colorSchemes = response.data.colorSchemes;
        })
      }

// color_scheme_name, color_one, color_two, color_three, color_four, color_five,
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
          // data: {color_scheme_name : color_scheme_name, color_one : color_one, color_two : color_two, color_three : color_three, color_four : color_four, color_five : color_five}
        })
        .then(function(response) {
          console.log(response);
          console.log('newColorScheme ---->', newColorScheme)
          // return response;
        })
        .then(function(response) {
          // for live update -- add later
          // if (response.data.status === 200) {
            // self.colorScheme.push(newColorScheme);
          // }
        })
        .catch(function(err) {
          console.log(err);
        })
      }


    });
})() //IIFE
