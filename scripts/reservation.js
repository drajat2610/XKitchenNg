var reservationModule = angular
    .module('reservationModule', [])
    .controller('reservationController', function ($scope, $http) {
        $scope.title = "List of Reservation";
        $scope.createNew = true;
        $scope.base_url = "http://localhost:3000/api/reservations";

        //tampil
        $http.get($scope.base_url)
            .then(function (response) {
                $scope.reservations = response.data
            });

        $scope.table_url = "http://localhost:3000/api/tables"
        $http.get($scope.table_url)
            .then(function (response) {
                $scope.tables = response.data;
            });

        $scope.user_url = "http://localhost:3000/api/users"
        $http.get($scope.user_url)
            .then(function (response) {
                $scope.users = response.data;
            });


        //tambahdata
        $scope.add = function () {
            $http.post($scope.base_url, $scope.reservation)
                .then(function (data, status) {
                    $http.get($scope.base_url)
                        .then(function (response) {
                            $scope.reservations = response.data;
                            $scope.createNew = true;
                            $scope.reservation = null;
                        })
                })
        }

        //editdata
        $scope.edit = function (reservation) {
            $http.get($scope.base_url + "/" + reservation._id)
                .then(function (response) {
                    $scope.reservation = response.data;
                    $scope.createNew = false;
                })

                .catch(function (reponse) {
                    $scope.status = response;
                });
        }

        //updatedtaa
        $scope.update = function () {
            let editData = [
                { 'propName': 'reference', 'value': $scope.reservation.reference },
                { 'propName': 'guest', 'value': $scope.reservation.guest },
                { 'propName': 'table', 'value': $scope.reservation.table },
                { 'propName': 'user', 'value': $scope.reservation.user },
                { 'propName': 'date', 'value': $scope.reservation.date }

            ];

            $http.patch($scope.base_url + "/" + $scope.reservation._id, editData)
                .then(function (data, status) {
                    $http.get($scope.base_url)
                        .then(function (response) {
                            $scope.reservations = response.data;
                            $scope.createNew = true;
                            $scope.reservation = null;
                        });
                });
        }

        //delete
        $scope.delete = function (reservation) {
            $http.delete($scope.base_url + "/" + reservation._id)
                .then(function (data, status) {
                    $http.get($scope.base_url)
                        .then(function (response) {
                            $scope.reservations = response.data;
                            $scope.createNew = true;
                            $scope.reservation = null;
                        });
                });
        }
    });