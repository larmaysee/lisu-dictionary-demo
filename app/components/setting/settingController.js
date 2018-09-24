angular
    .module('dictionary')
    .controller('settingCtrl', [
        '$rootScope',
        '$scope',
        'settingSrv',
        '$http',
        function ($rootScope, $scope, settingSrv, $http) {
            console.log("You are loading settings Controller");

            $scope.user = '';

            $scope.initFunction = function () {
                var onSuccess = function (res) {
                    if (res) {
                        $scope.users = res;
                        $scope.$apply();
                        console.log($scope.users);
                    }
                };

                var onError = function (err) {
                    if (err) {
                        console.log("You are in error");
                    }
                };

                settingSrv.getUsers(onSuccess, onError);
            };


            $scope.adduser = function (user) {
                console.log(user);
                var onSuccess = function (res) {
                    if (res) {
                        console.log(res);
                        Metro.toast.create("Successfully created", null, null, "success");
                    }
                };

                var onError = function (err) {
                    if (err) {
                        console.log(err);
                        Metro.toast.create("Fail create.", null, null, "alert");
                    }
                };

                settingSrv.createUser(user, onSuccess, onError);

            };

            $scope.initFunction();
            console.log("End setting controller");
        }
    ]);