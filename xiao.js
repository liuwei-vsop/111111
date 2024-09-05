var url = "https://api-xh.hsyuntai.com/hs-xh-single-web/r/173/20044/001"
 
var time = 10000;
var timeout = false;
var request = new XMLHttpRequest();
var timer = setTimeout(function() {
    timeout = true;
    request.abort();
}, time);
 
request.open("GET", url);
request.onreadystatechange = function() {
 
    if (request.status === 200) {
        // 打印出网页结果
        console.log(request.responseText);
 
    }
 
}
;
 
request.send(null);
