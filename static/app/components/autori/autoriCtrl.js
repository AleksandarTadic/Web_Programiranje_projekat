(function(angular){
    var app = angular.module("app");

    app.controller("autoriCtrl", ["$http" , "$state", function($http, $state) {
        var that = this;

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

        this.ukloniAutora = function(id) {
            $http.delete("api/autor/" + id).then(function(response){
                console.log(response);
                that.dobaviAutore();
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

        this.dobaviAutore();
        this.getCurrentUser();
    }]);
})(angular);