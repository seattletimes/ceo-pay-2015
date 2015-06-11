//Use CommonJS style via browserify to load other modules
require("./lib/social");
require("./lib/ads");
require("angular");
// require("component-responsive-frame/child");

var app = angular.module("ceos", []);

ceoData.forEach(function(row) {
  // var percentCash = Math.round(row.cash/row.total*100);
  // var percentEquity = Math.round(row.equity/row.total*100);
  // var percentOther = Math.round(row.other/row.total*100);
  var percentCash = Math.round(row.cash/row.total*10000)/100;
  var percentEquity = Math.round(row.equity/row.total*10000)/100;
  var percentOther = Math.round(row.other/row.total*10000)/100;
  row.percentCash = percentCash;
  row.percentEquity = percentEquity;
  row.percentOther = percentOther;
});

ceoData.forEach(function(row) {
  var lastname = row.name.split(' ').slice(-1).join(' ');
  row.lastname = lastname;
});

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
  };

  $scope.headers = [
    { title: "Name", short: "lastname" },
    { title: "Company", short: "company" },
    { title: "Age", short: "age" },
    { title: "Total Salary", short: "total" },
    { title: "Salary break-down", short: "salary_percents" },
  ];

  $scope.lastSort = $scope.headers[1];
  $scope.sortOrder = 1;

  $scope.sortTable = function(header) {
    if ($scope.lastSort == header) {
      $scope.sortOrder *= -1;
    } else {
      $scope.lastSort = header;
      $scope.sortOrder = 1;
    }

    $scope.ceoData.sort(function(a, b) {
      if (typeof a[header.short] == "number") {
        a = a[header.short];
      } else {
        a = a[header.short].toLowerCase();
      }
      if (typeof b[header.short] == "number") {
        b = b[header.short];
      } else {
        b = b[header.short].toLowerCase();
      }

      if (a < b) {
        return -1 * $scope.sortOrder;
      } else if (a > b) {
        return 1 * $scope.sortOrder;
      } else if (a == b) {
        return 0;
      }
    });
  };

  }]);
