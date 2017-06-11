angular.module('app', []);

angular
    .module('app')
    .controller('appCtrl', AppCtrl);

AppCtrl.$inject = ['$scope', '$http'];

function AppCtrl($scope, $http) {
    var vm = this;

    vm.deviceStatus = "OFF";

    var socket = io.connect('http://localhost:9004');

    socket.on('switchToggleOnUI', function (data) {
        $scope.$apply(function () {
            vm.deviceStatus = data.deviceStatus;
        });
    });
}