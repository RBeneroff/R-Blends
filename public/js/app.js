(function() {
  angular
    .module('BlenderApp')
    .controller('BlenderController', function($http, $state) {
      var self = this;
      var rootUrl = 'http://localhost:3000'

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



    });
})() //IIFE
