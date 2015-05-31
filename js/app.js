var portfolioApp = angular.module('portfolioApp', ['ngRoute','ui.bootstrap']);


//ROUTES

portfolioApp.config(function($routeProvider){

    $routeProvider

        .when('/',{
            templateUrl : 'pages/home.html',
            controller  : 'homeController'
        })
        .when('/portfolio',{
            templateUrl : 'pages/portfolio.html',
            controller  : 'portfolioController'
        })
        .when('/skills',{
            templateUrl : 'pages/skills.html',
            controller  : 'skillsController'
        })
        .when('/about',{
            templateUrl : 'pages/about.html',
            controller  : 'aboutController'
        });

});


//CONTROLLERS

portfolioApp.controller('homeController', ['$scope',
    function($scope){
            var designerHeading =   $('#designer-key');
            var developerHeading =  $('#coding-key');
            $scope.background ={};

            $scope.addDeveloperEffect = function(event){
                developerHeading.css('text-decoration','underline');
                $('#background-pic').addClass('black-filter');
                $('$designing-block').style('opacity',0.2);
            }

            $scope.removeDeveloperEffect = function(){
                developerHeading.css('text-decoration','none');
                $('#background-pic').removeClass('black-filter');
            }

            $scope.addDesignerEffect = function(event){
                designerHeading.css('text-decoration','underline');
                $('#background-pic').removeClass('black-filter');
                $('#coding-block').style('opacity',0.2);
            }

            $scope.removeDesignerEffect = function(){
                designerHeading.css('text-decoration','none');
                $('#background-pic').removeClass('black-filter');
            }





    }]);

portfolioApp.controller('portfolioController', ['$scope', '$http',
    function($scope,$http){

        $scope.filteredProjects = []
            ,$scope.currentPage = 1
            ,$scope.numPerPage =4
            ,$scope.maxSize = 5;

       $http.get("js/projects.json")
           .success(function(response){
            $scope.projects = response.projects;
               $scope.orderList = "id";
               $scope.numPages = function () {
                   return Math.ceil($scope.projects.length / $scope.numPerPage);
               };

               $scope.$watch('currentPage + numPerPage', function() {
                   var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                       , end = begin + $scope.numPerPage;

                   $scope.filteredProjects = $scope.projects.slice(begin, end);
               });


           });

        $scope.displayDescription = function () {
            var id = this.project.id;
            var currentProjectSelector = "#" + id;
            $(currentProjectSelector + ' .project-img').css('display','none');
            $(currentProjectSelector).addClass('project-description');
            $(currentProjectSelector + ' p').html('<p>' +  this.project.description +  '</p>');
//            $(currentProjectSelector + ' p').animate({
//               background : "red",
//                fontSize: "1.1em",
//                borderWidth: "10px"},2000);

        }

        $scope.hideDescription = function(){
            var id = this.project.id;
            var currentProjectSelector = "#" + id;
            $(currentProjectSelector + ' .project-img').css('display','inline-block');
            $(currentProjectSelector).removeClass('project-description');
            $(currentProjectSelector + ' p').html('');
        }

    }]);

//DIRECTIVES

portfolioApp.directive('applyGrayFilter',
    function(){
        return {
            restrict: 'A',
            link: function ($scope, $element) {
                $element.hover(function() {
                    $('#background-pic').addClass('black-filter');
                });
            }
        };
    });