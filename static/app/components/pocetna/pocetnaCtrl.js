(function(angular){
    var app = angular.module("app");

    app.controller("pocetnaCtrl", ["$http" , "$state", function($http, $state) {
        var that = this;

        this.knjige = [];
        
        // Funkcija za dobavljanje proizvoda.
        this.dobaviKnjige = function() {
            // Upucuje se get zahtev na relativni URL api/proizvodi.
            $http.get("api/knjiga").then(function(result){
                console.log(result);
                that.knjige = result.data;
            },
            function(reason) {
                console.log(reason);
            });
        }

        this.autori = []
        this.dobaviAutore = function() {
            $http.get("api/autor").then(function(result){
                console.log(result);
                that.autori = result.data;
            },
            function(reason) {
                console.log(reason);
            });
        }

        this.kupljenaKnjiga = []
        this.dobaviKupljeneKnjige = function() {
            $http.get("api/kupljena_knjiga").then(function(result){
                console.log(result);
                that.kupljenaKnjiga = result.data;
            },
            function(reason) {
                console.log(reason);
            });
        }

        // Funkcija za uklanjanje proizvoda.
        this.ukloniKnjigu = function(id) {
            // Pri uklanjanju proizvoda serveru se salje delete zahtev
            // na url api/proizvodi/<id> pri cemu id zavisi od proizvoda
            // koji je neophodno obrisati.
            $http.delete("api/knjiga/" + id).then(function(response){
                console.log(response);
                that.dobaviKnjige();
            },
            function(reason){
                console.log(reason);
                if(reason.status == 403) {
                    $state.go("login");
                }
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
                    console.log("RADI!!!!")
                    location.reload()
                },
                function(reason) {
                    console.log(reason);
                }
            )
        }

        var korpa = [];
        if(!("korpa" in localStorage)) {
            localStorage.setItem("korpa", JSON.stringify(korpa));
        }

        this.dodajUKorpu = function(el) {
            var k = JSON.parse(localStorage.getItem("korpa"));
            for(kupljena of that.kupljenaKnjiga) {
                if(that.ulogovan.id == kupljena.korisnik_id && kupljena.knjiga_id == el.id) {
                    alert("Ova knjiga je vec kupljena!")
                    return false;
                }
            }
            for(i of k) {
                if(el.id == i["id"]) {
                    alert("Ova knjiga se vec nalazi u korpi!")
                    return false;
                }
            }
            k.push(el);
            localStorage.setItem("korpa", JSON.stringify(k));
        }

        this.dobaviKupljeneKnjige()
        this.getCurrentUser();
        this.dobaviKnjige();
        this.dobaviAutore();
    }]);
})(angular);