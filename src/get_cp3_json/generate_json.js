
function GET(url) {
    var result = $.ajax({ url: url, async: false}).response;
    return result;
 }

function getCP3(body) {
    var url = 'http://uhunt.felix-halim.net/api/cpbook/3';
    $.ajax({ url: url, async: false}).done(function(response) {

        console.log(response);
        body.append($('<p>' + JSON.stringify(response) + '</p>'));

        var res = [];
        res = solve(response);
        body.append($('<p>' + JSON.stringify(res) + '</p>'));
    });
}

function solve(data) {

    var res = [];

    var i;
    for (i = 0; i < data.length; i++) {
        //console.log(data);
        if (data[i]['title']) {
            res.push({
                'title': data[i]['title'],
                'arr': solve(data[i]['arr'])
            });
        }
        else {
            var j;
            var aux_map = {
                'title': data[i][0]
            };
            var aux = [];
            for(j = 1; j < data[i].length; j++) {
                var abs_value = Math.abs(parseInt(data[i][j]));
                var url = 'http://uhunt.felix-halim.net/api/p/num/' + abs_value;

                $.ajax({ url: url, async: false}).done(function(response) {
                    aux.push({
                      'pid': response['pid'],
                      'title': response['title']
                    });
                });
            }
            aux_map['arr'] = aux;
            res.push(aux_map);
        }
    }

    console.log(res);
    return res;
}

$(document).ready(function() {
    getCP3($('body'));
});
