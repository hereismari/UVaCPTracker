function GET(url) {
    var result = $.ajax({ url: url, async: false}).response;
    return result;
}

function getSubmissions(user) {
    var url = 'http://uhunt.felix-halim.net/api/subs-user/' + user;
    return GET(url);
}

function getCP3(body) {
    var url = 'http://uhunt.felix-halim.net/api/cpbook/3';
    $.getJSON(url, function(data) { 
        console.log(data); 
        body.append($('<h2>' + data[0].title + '</h2>'));
    });
}

$(document).ready(function() {
    getCP3($('body'));
});
