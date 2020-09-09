(function(angular){
    var app = angular.module("app", ["ui.router"]);

    app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider, $http) {
        $stateProvider.state({
            name: "home",
            url: "/",
            templateUrl: "app/components/pocetna/pocetna.tpl.html",
            controller: "pocetnaCtrl",
            controllerAs: "pctrl"
        }).state({
            name: "login",
            url: "/login",
            templateUrl: "app/components/login/login.tpl.html",
            controller: "loginCtrl",
            controllerAs: "pctrl"
        }).state({
            name: "register",
            url: "/register", 
            templateUrl: "app/components/register/register.tpl.html", 
            controller: "registerCtrl",
            controllerAs: "pctrl"
        }).state({
            name: "dodajAutora",
            url: "/autorForm", 
            templateUrl: "app/components/autorForm/autorForm.tpl.html", 
            controller: "autorFormCtrl",
            controllerAs: "pctrl"
        }).state({
            name: "izmeniAutora",
            url: "/autorForm/{id}", 
            templateUrl: "app/components/autorForm/autorForm.tpl.html", 
            controller: "autorFormCtrl",
            controllerAs: "pctrl"
        }).state({
            name: "autori",
            url: "/autori", 
            templateUrl: "app/components/autori/autori.tpl.html", 
            controller: "autoriCtrl",
            controllerAs: "pctrl"
        }).state({
            name: "dodajKnjigu",
            url: "/knjigaForm", 
            templateUrl: "app/components/knjigaForm/knjigaForm.tpl.html", 
            controller: "knjigaFormCtrl",
            controllerAs: "pctrl"
        }).state({
            name: "izmeniKnjigu",
            url: "/knjigaForm/{id}", 
            templateUrl: "app/components/knjigaForm/knjigaForm.tpl.html", 
            controller: "knjigaFormCtrl",
            controllerAs: "pctrl"
        }).state({
            name: "profil",
            url: "/profil/{id}", 
            templateUrl: "app/components/profil/profil.tpl.html", 
            controller: "profilCtrl",
            controllerAs: "pctrl"
        }).state({
            name: "korisnikIzmena",
            url: "/korisnikIzmena/{id}", 
            templateUrl: "app/components/korisnikIzmena/korisnikIzmena.tpl.html", 
            controller: "korisnikIzmenaCtrl",
            controllerAs: "pctrl"
        }).state({
            name: "korpa",
            url: "/korpa",
            templateUrl: "app/components/korpa/korpa.tpl.html",
            controller: "korpaCtrl", // Isti kontroler se moze koristiti vise puta.
            controllerAs: "pctrl"
        }).state({
            name: "kupljeneKnjige",
            url: "/kupljeneKnjige/{id}",
            templateUrl: "app/components/kupljeneKnjige/kupljeneKnjige.tpl.html",
            controller: "kupljeneKnjigeCtrl", // Isti kontroler se moze koristiti vise puta.
            controllerAs: "pctrl"
        });

        $urlRouterProvider.otherwise("/");
    }])


})(angular);