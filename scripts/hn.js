var hnApp = angular.module('hnApp', ['infinite-scroll']);

hnApp.controller('HnController', function($scope, News) {
  $scope.news = new News();
});

hnApp.factory('News', function($http) {
  var News = function() {
    this.items = [];
    this.busy = false;
    this.page = 0;
  };

  News.prototype.nextPage = function() {
    if (this.busy) return;
    this.busy = true;

    var url = "http://hn.algolia.com/api/v1/search_by_date?tags=story&page=" + this.page +"&hitsPerPage=50" ;
    $http.get(url).success(function(data) {
      var items = data.hits;
      for (var i = 0; i < items.length; i++) {
        if (items[i].url)
          this.items.push(items[i]);
      }
      this.page++;
     
      this.busy = false;
    }.bind(this));
  };

  return News;
});