'use strict';

// Employees controller
angular.module('employees').controller('EmployeesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Employees', 'Organizations', 'Projects',
    function ($scope, $stateParams, $location, Authentication, Employees, Organizations, Projects) {
        $scope.authentication = Authentication;
        $scope.experience = 0;
        $scope.organizations = Organizations.query();

        $scope.roles = [
            'Junior Software Developer', 'Software Developer', 'Senior Software Developer', 'Junior QA Engineer', 'QA Engineer', 'Senior QA Engineer', 'Tech Lead', 'QA Lead', 'Engineering Manager', 'QA Manager', 'Architect', 'BU Head'
        ];

        // Create new Employee
        $scope.create = function () {
            // Create new Employee object
            var employee = new Employees({
                firstName: this.firstName,
                lastName: this.lastName,
                skills: this.skills,
                role: this.role,
                experience: this.experience
            });

            // Redirect after save
            employee.$save(function (response) {
                $location.path('employees/' + response._id);

                // Clear form fields
                $scope.firstName = '';
                $scope.lastName = '';
                $scope.skills = '';
                $scope.role = '';
                $scope.experience = 0;
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Employee
        $scope.remove = function (employee) {
            if (employee) {
                employee.$remove();
                for (var i in $scope.employees) {
                    if ($scope.employees [i] === employee) {
                        $scope.employees.splice(i, 1);
                    }
                }
            } else {
                $scope.employee.$remove(function () {
                    $location.path('employees');
                });
            }
        };

        // Update existing Employee
        $scope.update = function () {
            var employee = $scope.employee;
            employee.$update(function () {
                $location.path('employees/' + employee._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Employees
        $scope.find = function () {
            $scope.employees = Employees.query();
        };

        // Find existing Employee
        $scope.findOne = function () {
            $scope.employee = Employees.get({
                    employeeId: $stateParams.employeeId
                }, function (result) {
                    $scope.employee.belongsToView = result.belongsTo;
                    $scope.employee.belongsTo = result.belongsTo._id;
                    $scope.projects = [];
                    var worksFor = [];
                    var worksForView = [];
                    $scope.organizations.$promise.then(function (orgs) {
                        orgs.forEach(function (org) {
                            if ((result.belongsTo != undefined) && (org._id == result.belongsTo)) {
                                org.projects.forEach(function (proj) {
                                        $scope.projects.push(proj);
                                        if ($scope.employee.worksFor != undefined) {
                                            $scope.employee.worksFor.forEach(function (p) {
                                                if (proj._id == p._id) {
                                                    worksFor.push(proj._id);
                                                    worksForView.push(proj);
                                                }
                                            });
                                        }
                                    }
                                );
                            }
                        });
                        $scope.employee.worksFor = worksFor;
                        $scope.employee.worksForView = worksForView;
                    });
                }
            );
        };

        $scope.orgSelected = function () {
            $scope.employee.worksFor = [];
            $scope.organizations.forEach(function (org) {
                if (org._id == $scope.employee.belongsTo) {
                    $scope.projects = org.projects;
                }
            });
        };
    }
])
;
