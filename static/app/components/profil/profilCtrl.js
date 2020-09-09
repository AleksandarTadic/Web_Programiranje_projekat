(function (angular) {
    var app = angular.module("app");
    app.controller("profilCtrl", ["$http", "$state", "$stateParams", function ($http, $state, $stateParams) {
        var that = this;

        // Inicijalno podaci o novom proizvodu su popunjeni podrazumevanim vrednostima.
        this.korisnik = {
            "korisnicko_ime": "",
            "ime": "",
            "prezime":""
        };


        this.dobaviKorisnika = function(id) {
            $http.get("api/korisnik/" + id).then(function(result){
                that.korisnik = result.data;
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
                    that.ulogovan = response.data
                },
                function(reason) {
                    console.log(reason);
                }
            )
        }

        this.logout = function() {
            $http.get("api/logout").then(
                function(response) {
                    that.status = "neprijavljen";
                    localStorage.setItem("korpa", JSON.stringify([]))
                    location.reload()
                },
                function(reason) {
                    console.log(reason);
                }
            )
        }

        if($stateParams["id"]) {
            this.dobaviKorisnika($stateParams["id"]);
        } else {
            $state.go("home")
        }

        this.getCurrentUser();
    }]);
})(angular);