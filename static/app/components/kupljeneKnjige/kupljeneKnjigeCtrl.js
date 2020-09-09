(function(angular){
    var app = angular.module("app");

    app.controller("kupljeneKnjigeCtrl", ["$http" , "$state", "$stateParams", function($http, $state, $stateParams) {
        var that = this;

        this.autori = [];
        this.knjige = [];
        this.KupljeneKnjige = [];

        this.dobaviKnjige = function() {
            $http.get("api/knjiga").then(function(result){
                console.log(result);
                that.knjige = result.data;
            },
            function(reason) {
                console.log(reason);
            });
        }


        this.dobaviAutore = function() {
            $http.get("api/autor").then(function(result){
                console.log(result);
                that.autori = result.data;
            },
            function(reason) {
                console.log(reason);
            });
        }

        this.dobaviKupljeneKnjige = function(id) {
            $http.get("api/korisnik_kupljena_knjiga/" + id).then(function(result){
                that.KupljeneKnjige = result.data;
            }, function(reason) {
                console.log(reason);
            });
        }
        
        this.ulogovan = null;
        this.getCurrentUser = function() {
            $http.get("api/currentUser").then(
                function(response) {
                    if(!response.data) {
                        $state.go("login");
                    }
                    that.ulogovan = response.data;
                },
                function(reason) {
                    console.log(reason);
                }
            )
        }

        this.logout = function() {
            $http.get("api/logout").then(
                function(response) {
                    localStorage.setItem("korpa", JSON.stringify([]));
                    location.reload();
                },
                function(reason) {
                    console.log(reason);
                }
            )
        }

        if($stateParams["id"]) {
            this.dobaviKupljeneKnjige($stateParams["id"]);
        }

        this.dobaviKnjige();
        this.dobaviAutore();
        this.getCurrentUser();
    }]);
})(angular);