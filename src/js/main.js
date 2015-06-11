//Use CommonJS style via browserify to load other modules
require("./lib/social");
require("./lib/ads");
require("angular");
// require("component-responsive-frame/child");

var app = angular.module("ceos", []);

console.log(ceoData)

// app.filter("illions", ["$filter", function($filter){
//   var format = $filter("number");
//   return function(number) {
//     var display;
//     if (number > 999) {
//       display = format(number/1000, 1) + " B";
//     } else {
//       display = number + " M";
//     }
//     display = "$" + display;
//     return display.replace(/\$\-/, "-$");
//   }

// }]);

console.log(ceoData)

ceoData.forEach(function(row) {
  var percentCash = Math.round(row.cash/row.total*10000)/100;
  var percentEquity = Math.round(row.equity/row.total*10000)/100;
  var percentOther = Math.round(row.other/row.total*10000)/100;
  row.percentCash = percentCash;
  row.percentEquity = percentEquity;
  row.percentOther = percentOther;
});

console.log(ceoData)

app.controller("CEOPayController", ["$scope", function($scope) {
  $scope.ceoData = ceoData;
  $scope.filterBy = "all";

  $scope.ceoFilter = function(value) {
    if ($scope.filterBy == "all") {
      return true;
    } else if ($scope.filterBy == "under40") {
      return value.age < 40;
    } else if ($scope.filterBy == "over40"){
      return value.age >= 40;
    } else if ($scope.filterBy == "men"){
      return value.gender == "M";
    } else if ($scope.filterBy == "women"){
      return value.gender == "F";
    }
  }

  $scope.headers = [
  { title: "Name", short: "ceoname" },
  { title: "Company", short: "company" },
  { title: "Age", short: "age" },
  { title: "Total Salary", short: "salary" },
  { title: "Cash Percent", short: "cash" },
  { title: "Equity Percent", short: "equity" },
  { title: "Other Percent", short: "other" },
  ];

  }]);
