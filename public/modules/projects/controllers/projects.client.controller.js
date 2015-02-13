'use strict';

// Projects controller
angular.module('projects').controller('ProjectsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Projects', 'Employees', 'Organizations',
    function ($scope, $stateParams, $location, Authentication, Projects, Employees, Organizations) {
        $scope.authentication = Authentication;
        $scope.organizations = Organizations.query();
        $scope.employees = Employees.query();
        $scope.totalHeadCount = 0;
        $scope.billableHeadCount = 0;
        $scope.benchHeadCount = 0;

        // Create new Project
        $scope.create = function () {
            // Create new Project object
            var project = new Projects({
                name: this.name,
                totalHeadCount: this.totalHeadCount,
                billableHeadCount: this.billableHeadCount,
                benchHeadCount: this.benchHeadCount,
                ongoing: this.ongoing,
                startDate: this.startDate,
                endDate: this.endDate
            });

            // Redirect after save
            project.$save(function (response) {
                $location.path('projects/' + response._id);

                // Clear form fields
                $scope.name = '';
                $scope.totalHeadCount = 0;
                $scope.billableHeadCount = 0;
                $scope.benchHeadCount = 0;
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Project
        $scope.remove = function (project) {
            if (project) {
                project.$remove();

                for (var i in $scope.projects) {
                    if ($scope.projects [i] === project) {
                        $scope.projects.splice(i, 1);
                    }
                }
            } else {
                $scope.project.$remove(function () {
                    $location.path('projects');
                });
            }
        };

        // Update existing Project
        $scope.update = function () {
            var project = $scope.project;

            project.$update(function () {
                $location.path('projects/' + project._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Projects
        $scope.find = function () {
            $scope.projects = Projects.query();
        };

        // Find existing Project
        $scope.findOne = function () {
            $scope.project = Projects.get({
                projectId: $stateParams.projectId
            });
        };
    }
]);
