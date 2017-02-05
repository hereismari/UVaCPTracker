angular.module('uvacp').controller('MainController',
    ['$scope', '$location', 'WebRequest', '$route', function($scope, $location, WebRequest, $route) {

    $scope.title = '';
    $scope.chapter_data = '';

    // get cp3
    var cp3_promise = WebRequest.get("files/cp3.json");
    cp3_promise.then(function(response) {
        $scope.chapters = response.data;
        $scope.preprocessProblemStatus();
    });

    // get submissions
    chrome.storage.local.get('value', function(obj) {
        if(!obj.value) {
            $scope.changeView();
        }

        $scope.user_name = obj.value;

        var url_id = 'http://uhunt.felix-halim.net/api/uname2uid/' + obj.value;
        var url_id_promise = WebRequest.get(url_id);
        url_id_promise.then(function(response) {
            if(!response.data) {
                $scope.changeView();
            }
            var user_id = response.data;
            var url_subs = 'http://uhunt.felix-halim.net/api/subs-user/' + user_id;
            var user_subs_promise = WebRequest.get(url_subs);
            user_subs_promise.then(function(response) {
                $scope.my_data = response.data;
                $scope.calculateRate();
            });
        });
    });

    // compare cp3 problems with submissions
    $scope.problems_status = {};
    $scope.preprocessProblemStatus = function() {

        var i;
        for(i = 0; i < $scope.chapters.length; i++) {
            var res = $scope.preprocessCP3($scope.chapters[i]);
            $scope.problems_status[$scope.chapters[i].title] = {
              'arr': res,
              'total': $scope.size(res),
              'accepted': 0,
              'tried': 0,
              'index': i};
        }
    };

    $scope.preprocessCP3 = function(data) {

        var res = {};

        if (data['arr']) {
            var i;
            for(i = 0; i < data['arr'].length; i++) {
                var aux = $scope.preprocessCP3(data['arr'][i]);
                jQuery.extend(res, aux);
            }
        }
        else {
            res[data['pid']] = {
                'status': 'unknown'
            };
        }

        return res;
    };

    // make calculations
    $scope.calculateRate = function() {
        var i;
        for(i = 0; i < $scope.my_data['subs'].length; i++) {
            $scope.updateProblemStatus($scope.my_data['subs'][i]);
        }
    };

    $scope.updateProblemStatus = function(data) {
        var pid = data[1];
        var new_status = data[2];

        var i;
        for(i = 0; i < $scope.chapters.length; i++) {

            var title = $scope.chapters[i]['title'];
            var chapter_info = $scope.problems_status[title];

            var p_status = chapter_info['arr'][pid];

            if(p_status) {
                if(new_status == 90) {
                    if(p_status['status'] != 'accepted') {
                        if(p_status['status'] == 'tried') {
                            chapter_info['tried'] -= 1;
                        }
                        p_status['status'] = 'accepted';
                        chapter_info['accepted'] += 1;
                  }
                }
                else {
                    if(p_status['status'] == 'unknown') {
                        chapter_info['tried'] += 1;
                        p_status['status'] = 'tried';
                    }
                }
            }
        }
    };

    $scope.getColor = function(pid) {
        var i;
        for (i = 0; i < $scope.chapters.length; i++) {

            var title = $scope.chapters[i]['title'];
            var chapter_info = $scope.problems_status[title];

            var problem = chapter_info['arr'][pid];

            if(!problem) { continue; }

            var status = problem['status'];

            if(status == 'accepted') {
                return '#CCFFCC'; // green
            }
            else if(status == 'tried') {
                return '#f39e8b'; // red
            }
            else {
                return 'white';
            }
        }
    };

    $scope.getRate = function(title) {
        var chapter_info = $scope.problems_status[title];
        var res = ((1.0 * chapter_info['accepted'])/chapter_info['total']) * 100.0;
        var rounded_res = Math.round(res * 100) / 100;
        return rounded_res;
    };

    $scope.updateTitle = function(title) {
        $scope.title = title;
        $scope.chapter_data = $scope.getChapterData();
    };

    $scope.getChapterData = function() {
        if($scope.title) {
            return $scope.chapters[$scope.problems_status[$scope.title]['index']];
        }
        else {
            return;
        }
    };

    $scope.changeView = function(view) {
        chrome.storage.local.set({'value':''}, function(obj) {
            $location.path('/' + view);
            $route.reload(); // this fixes the 'two clicks' bug
        });
    };

    $scope.size = function(data) {
        var size = 0;
        for (key in data) { size += 1; }
        return size;
    };

}]);
