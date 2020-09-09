(function (angular) {
    var app = angular.module("app");
    app.controller("korisnikIzmenaCtrl", ["$http", "$state", "$stateParams", function ($http, $state, $stateParams) {
        var that = this;

        // Inicijalno podaci o novom proizvodu su popunjeni podrazumevanim vrednostima.
        this.izmeniKorisnika = {
            "korisnicko_ime": "",
            "lozinka": "",
            "ime": "",
            "prezime": "",
            "aktivan": 1,
            "admin": 0
        };


        this.dobaviKorisnikaIz = function(id) {
            $http.get("api/korisnik/" + id).then(function(result){
                that.izmeniKorisnika = result.data;
            }, function(reason) {
                console.log(reason);
            });
        }

        this.izmeniKorisnikaIz = function(id) {
            $http.put("api/korisnik/" + id, this.izmeniKorisnika).then(function(response) {
                console.log(response)
                $state.go("home")
            }, function(reason) {
                console.log(reason);
            });
        }

        this.sacuvaj = function() {
            if($stateParams["id"]) {
                this.izmeniKorisnikaIz($stateParams["id"], that.izmeniKorisnika);
            }
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
            this.dobaviKorisnikaIz($stateParams["id"]);
        }

        this.getCurrentUser();
    }]);
})(angular);