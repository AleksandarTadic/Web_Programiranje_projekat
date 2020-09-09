(function(angular){
    var app = angular.module("app");

    app.controller("korpaCtrl", ["$http" , "$state", function($http, $state) {
        var that = this;

        this.ulogovan = null;
        this.ukupnaCena = 0
        this.korpa = JSON.parse(localStorage.getItem("korpa"));
        this.autori = [];
        

        this.ukupnaCenaKorpe = function() {
            for(k of that.korpa) {
                that.ukupnaCena += parseInt(k.cena);
            }
        }



        this.ukloniIzKorpe = function(id) {
            for(del in that.korpa) {
                if(that.korpa[del].id == id) {
                    that.korpa.splice(del, 1);
                    localStorage.setItem("korpa", JSON.stringify(that.korpa));
                    break;
                }
            }
            location.reload()
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

        this.kupiKnjige = function() {
            if(that.korpa.length == 0) {
                alert("Korpa je prazna!")
                return false;
            }


            var date = new Date().toISOString().slice(0, 19).replace("T", " ");
            console.log(date)
            for(k of that.korpa) {
                console.log(that.ulogovan.id, " ", k.id)
                var obj = {
                    "korisnik_id":that.ulogovan.id,
                    "knjiga_id": k.id,
                    "datum_kupovine":date,
                    "cena":k.cena
                }
                $http.post("api/kupljena_knjiga", obj).then(function (response) {
                    console.log(response);
                }, function (reason) {
                    console.log(reason);
                });
            }
            that.korpa = []
            localStorage.setItem("korpa", JSON.stringify(that.korpa));
            location.reload()
        }    
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
                    that.status = "neprijavljen";
                    localStorage.setItem("korpa", JSON.stringify([]));
                    location.reload();
                },
                function(reason) {
                    console.log(reason);
                }
            )
        }

        this.ukupnaCenaKorpe();
        this.dobaviAutore();
        this.getCurrentUser();
    }]);
})(angular);