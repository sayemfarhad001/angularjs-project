(function (){
    'use strict';
    
    angular.module('myFirstApp', [])
    .controller('MyFirstController', MyFirstController)
    .filter('loves', LovesFilter)       //Register Filter Factory [Step 2: Filter]
    .filter('truth', TruthFilter)       //Register Filter Factory [Step 2: Filter] NOT INJECTED as HTML modification done
    ;

    MyFirstController.$inject = ['$scope', '$filter', 'lovesFilter'] //Inject filter [Step 3: Filter]
    function MyFirstController ($scope, $filter, lovesFilter) {
        $scope.name = "";
        $scope.totalValue = 0;
        
        $scope.upper = function(){
            var upCase = $filter('uppercase');
            $scope.name = upCase($scope.name);
        }

        $scope.displayNumeric = function () {
            var totalNameValue = calculateNumericForString($scope.name);
            $scope.totalValue = totalNameValue;
        };

        
        function calculateNumericForString (string) {
            var totalStringValue = 0;
            for (var i=0; i < string.length; i++){
                totalStringValue += string.charCodeAt(i);
            }
            return totalStringValue;
        }

        $scope.sayMessage = function (){
            var msg = "Sayem likes to eat healthy snacks at night!" 
            var output = $filter('uppercase')(msg)
            return output 
        }


        $scope.cookieCost = .45;
        $scope.sayCost = function (){
            var output = $filter('currency')($scope.cookieCost, 'BDT ', 4)
            return output 
        };

        $scope.sayLovesMessage = function (){
            var msg = "Sayem likes to eat healthy snacks at night!" 
            msg = lovesFilter(msg)
            return msg; 
        };
        


    }
    // Define Filter factory function [Step 1: Filter]
    function LovesFilter(){
        return function(input){
            input = input || "";
            input = input.replace("likes", "loves");
            return input;
        }
    }
    // Define Filter factory function [Step 1: Filter]
    function TruthFilter(){
        return function(input, target, replace){
            input = input || "";
            input = input.replace(target, replace);
            return input;
        }
    }
})();




