'use strict';

// Organizations controller
angular.module('organizations').controller('OrganizationsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Organizations', 'Employees',
    function ($scope, $stateParams, $location, Authentication, Organizations, Employees) {
        $scope.authentication = Authentication;
        $scope.totalHeadCount = 0;
        $scope.billableHeadCount = 0;
        $scope.benchHeadCount = 0;
        $scope.employees = Employees.query();

        // Create new Organization
        $scope.create = function () {
            // Create new Organization object
            var organization = new Organizations({
                name: this.name,
                totalHeadCount: this.totalHeadCount,
                billableHeadCount: this.billableHeadCount,
                benchHeadCount: this.benchHeadCount
            });

            // Redirect after save
            organization.$save(function (response) {
                $location.path('organizations/' + response._id);

                // Clear form fields
                $scope.name = '';
                $scope.totalHeadCount = 0;
                $scope.billableHeadCount = 0;
                $scope.benchHeadCount = 0;
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Organization
        $scope.remove = function (organization) {
            if (organization) {
                organization.$remove();

                for (var i in $scope.organizations) {
                    if ($scope.organizations [i] === organization) {
                        $scope.organizations.splice(i, 1);
                    }
                }
            } else {
                $scope.organization.$remove(function () {
                    $location.path('organizations');
                });
            }
        };

        // Update existing Organization
        $scope.update = function () {
            var organization = $scope.organization;

            organization.$update(function () {
                $location.path('organizations/' + organization._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Organizations
        $scope.find = function () {
            $scope.organizations = Organizations.query(function (organizations) {
                if (organizations !== undefined) {
                    organizations.forEach(function (organization) {
                        var label = [];
                        var billable = [];
                        var bench = [];
                        var projects = organization.projects;
                        if (projects !== undefined) {
                            projects.forEach(function (project) {
                                label.push(project.name);
                                billable.push(project.billableHeadCount);
                                bench.push(project.benchHeadCount);
                            });
                        }
                        organization.series = ['Billable', 'Bench'];
                        var data = [billable, bench];
                        organization.label = label;
                        organization.data = data;
                    });
                }
            });
        };

        // Find existing Organization
        $scope.findOne = function () {
            $scope.organization = Organizations.get({
                organizationId: $stateParams.organizationId
            }, function (result) {
                var label = [];
                var billable = [];
                var bench = [];
                var projects = result.projects;
                if (projects !== undefined) {
                    projects.forEach(function (project) {
                        label.push(project.name);
                        billable.push(project.billableHeadCount);
                        bench.push(project.benchHeadCount);
                    });
                }
                result.series = ['Billable', 'Bench'];
                var data = [billable, bench];
                result.label = label;
                result.data = data;
            });
        };
    }
]);
