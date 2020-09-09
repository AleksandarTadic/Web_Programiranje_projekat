(function (angular) {
    var app = angular.module("app");
    app.controller("registerCtrl", ["$http", "$state", "$stateParams", function ($http, $state, $stateParams) {
        var that = this;

        this.noviKorisnik = {
            "korisnicko_ime": "",
            "lozinka": "",
            "ime": "",
            "prezime": "",
            "aktivan": 1,
            "admin": 0
        };

        this.dobaviKorisnike = function() {
            $http.get("api/korisnik").then(function(result){
                console.log(result);
                that.korisnici = result.data;

            },
            function(reason) {
                console.log(reason);
            });
        }

        this.dodajKorisnika = function () {
            for(kor of that.korisnici) {
                if(kor.korisnicko_ime == that.noviKorisnik.korisnicko_ime) {
                    alert("Korisnicko ime je zauzeto!")
                    return false;
                }      
            }
            $http.post("api/korisnik", this.noviKorisnik).then(function (response) {
                console.log(response);
                $state.go("login")
                
            }, function (reason) {
                console.log(reason);
                
            });
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




        this.sacuvaj = function() {
            this.dodajKorisnika();
        }

        this.dobaviKorisnike();
        this.getCurrentUser();
    }]);
})(angular);