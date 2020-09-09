(function (angular) {
    var app = angular.module("app");
    app.controller("autorFormCtrl", ["$http", "$state", "$stateParams", function ($http, $state, $stateParams) {
        var that = this;

        // Inicijalno podaci o novom proizvodu su popunjeni podrazumevanim vrednostima.
        this.noviAutor = {
            "ime": "",
            "prezime": "",
            "izbrisan":0
        };


        this.dobaviAutora = function(id) {
            $http.get("api/autor/" + id).then(function(result){
                that.noviAutor = result.data;
            }, function(reason) {
                console.log(reason);
            });
        }

        // Funkcija za dodavanje proizvoda.
        this.dodajAutora = function () {
            $http.post("api/autor", this.noviAutor).then(function (response) {
                console.log(response);
                $state.go("autori")
            }, function (reason) {
                console.log(reason);
            });
        }

        this.izmeniAutora = function(id) {
            $http.put("api/autor/" + id, this.noviAutor).then(function(response) {
                console.log(response)
                $state.go("autori")
            }, function(reason) {
                console.log(reason);
            });
        }

        this.sacuvaj = function() {
            if($stateParams["id"]) {
                this.izmeniAutora($stateParams["id"], that.noviAutor);
            } else {
                this.dodajAutora();
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

        if($stateParams["id"]) {
            this.dobaviAutora($stateParams["id"]);
        }

        this.getCurrentUser();
    }]);
})(angular);