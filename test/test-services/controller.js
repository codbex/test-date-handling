angular.module('test', ['blimpKit', 'platformView']).controller('testController', ($scope, $http) => {
    const Shell = new ShellHub();

    $scope.openPerspective = () => {
        if (viewData && viewData.perspectiveId) Shell.showPerspective({ id: viewData.perspectiveId });
    };

    $http.get('/services/ts/test/test-services/service.ts/test').then((response) => {
        $scope.$evalAsync(() => {
            console.log("EOPPPP: ", response.data);
            $scope.test = response.data;
        });
    }, (error) => {
        console.error(error);
    });
});