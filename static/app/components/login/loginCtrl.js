(function(angular){
    var app = angular.module("app");

    app.controller("loginCtrl", ["$http", "$state", "$stateParams", "$scope", function($http, $state, $stateParams, $scope){
        var that = this;
        this.status = "neprijavljen"; // Pocetni status prijave.
        this.korisnik = {
            korisnicko_ime: "",
            lozinka: ""
        }

        this.login = function() {
            $http.post("api/login", this.korisnik).then(
                function(response) {
                    that.status = "prijavljen";
                    that.korisnik = {
                        korisnicko_ime: "",
                        lozinka: ""
                    }
                    $state.go("home")
                },
                function(reason) {
                    that.status = "neuspesno";
                    that.korisnik = {
                        korisnicko_ime: "",
                        lozinka: ""
                    }
                }
            )
        }

        this.logout = function() {
            $http.get("api/logout").then(
                function(response) {
                    that.status = "neprijavljen";
                    localStorage.setItem("korpa", JSON.stringify([]))
                    $state.go("login")
                },
                function(reason) {
                    console.log(reason);
                }
            )
        }

        this.ulogovan = null;
        this.getCurrentUser = function() {
            $http.get("api/currentUser").then(
                function(response) {
                    if(response.data) {
                        that.status = "prijavljen";
                    } else {
                        that.status = "neprijavljen";
                    }
                    if(that.ulogovan != null) {
                        $state.go("home")
                    }
                    that.ulogovan = response.data
                },
                function(reason) {
                    console.log(reason);
                }
            )
        }

        this.getCurrentUser(); // Provera da li je korisnik vec prijavljen.
    }]);
})(angular);
