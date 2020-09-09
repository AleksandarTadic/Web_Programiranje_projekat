(function (angular) {
    var app = angular.module("app");
    app.controller("knjigaFormCtrl", ["$http", "$state", "$stateParams", function ($http, $state, $stateParams) {
        var that = this;

        // Inicijalno podaci o novom proizvodu su popunjeni podrazumevanim vrednostima.
        this.novaKnjiga = {
            "autor_id": "",
            "naziv": "",
            "cena":0,
            "izbrisana":0,
            "slika":"",
            "opis":""
        };

        this.dobaviKnjigu = function(id) {
            $http.get("api/knjiga/" + id).then(function(result){
                that.novaKnjiga = result.data;
            }, function(reason) {
                console.log(reason);
            });
        }

        this.dobaviKnjigu = function(id) {
            $http.get("api/knjiga/" + id).then(function(result){
                that.novaKnjiga = result.data;
            }, function(reason) {
                console.log(reason);
            });
        }





        // Funkcija za dodavanje proizvoda.
        this.dodajKnjigu = function () {
            $http.post("api/knjiga", this.novaKnjiga).then(function (response) {
                console.log(response);
                $state.go("home")
            }, function (reason) {
                console.log(reason);
            });
        }

        this.izmeniKnjigu = function(id) {
            $http.put("api/knjiga/" + id, this.novaKnjiga).then(function(response) {
                console.log(response)
                $state.go("home")
            }, function(reason) {
                console.log(reason);
            });
        }

        this.sacuvaj = function() {
            if($stateParams["id"]) {
                this.izmeniKnjigu($stateParams["id"], this.novaKnjiga);
            } else {
                this.dodajKnjigu();
            }
        }

        this.ulogovan = null;
        this.getCurrentUser = function() {
            $http.get("api/currentUser").then(
                function(response) {
                    if(!response.data) {
                        $state.go("login");
                    } else {
                        if(response.data.admin != 1) {
                            $state.go("home");
                        }
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

        this.autori = [];
        this.dobaviAutore = function() {
            $http.get("api/autor").then(function(result){
                console.log(result);
                that.autori = result.data;
            },
            function(reason) {
                console.log(reason);
            });
        }


        if($stateParams["id"]) {
            this.dobaviKnjigu($stateParams["id"]);
        }

        this.dobaviAutore()
        this.getCurrentUser();
    }]);
})(angular);