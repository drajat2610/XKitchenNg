var reservationModule = angular
    .module('reservationModule', [])
    .controller('reservationController', function ($scope, $http) {
        $scope.title = "List of Reservations"
        $scope.createNew = true;
        $scope.base_url = "http://localhost:3000/api/reservations";
        $http.get($scope.base_url)
            .then(function (response) {
                $scope.reservations = response.data;
            })

        $scope.table_url = "http://localhost:3000/api/tables";
        $http.get($scope.table_url)
            .then(function (response) {
                $scope.tables = response.data;
            })

        $scope.user_url = "http://localhost:3000/api/users";
        $http.get($scope.user_url)
            .then(function (response) {
                $scope.users = response.data;
            })

        $scope.add = function () {
            $http.post($scope.base_url, $scope.reservation)
                .then(function (data, status) {
                    $http.get($scope.base_url)
                        .then(function (response) {
                            $scope.reservations = response.data;
                            $scope.createNew = true;
                            $scope.reservation = null;
                        })
                        .catch(function (response) {
                            $scope.status = response;
                        })
                });
        };
    });