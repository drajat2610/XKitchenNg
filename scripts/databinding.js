var myModule = angular.module('myModule', [])
    .controller('myController', function($scope) {
       
        $scope.title = "Employee";

        var employee = {
           firstName : "Drajat",
           middleName : "",
           lastName : "Pamuji"
       };
       
       $scope.employee = employee;
    });