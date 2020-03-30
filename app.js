$(function () {
    $("#box").append(
        $(
            "<div class='slider' id='slider'>" +
                "<div class='slide'><img src='img/b5.png' alt=''></div>" +
                "<div class='slide'><img src='img/b1.png' alt=''></div>" +
                "<div class='slide'><img src='img/b2.png' alt=''></div>" +
                "<div class='slide'><img src='img/b3.png' alt=''></div>" +
                "<div class='slide'><img src='img/b4.png' alt=''></div>" +
                "<div class='slide'><img src='img/b5.png' alt=''></div>" +
                "<div class='slide'><img src='img/b1.png' alt=''></div>" +
            "</div>" +
            "<span id='left'><</span>" +
            "<span id='right'>></span>" +
            "<ul class='nav' id='navs'>" +
                "<li class='active'>1</li>" +
                "<li>2</li>" +
                "<li>3</li>" +
                "<li>4</li>" +
                "<li>5</li>" +
            "</ul>"
        )
    );
    var box = document.getElementById('box');
    var navs = document.getElementById('navs').children;
    var slider = document.getElementById('slider');
    var left = document.getElementById('left');
    var right = document.getElementById('right');
    var span = document.getElementsByTagName('span');
    var i = 1;
    var move = false;

     left.onclick = last;
     right.onclick = next;


    function list() {
        for (var i = 0; i < navs.length; i++) {
            navs[i].className = "";
        }
        if (i > 5) {
            navs[0].className = "active";
        } else if (i <= 0) {
            navs[4].className = "active";
        } else {
            navs[i - 1].className = "active";
        }
    }
    for (var i = 0; i < navs.length; i++) {
        (function (i) {
            navs[i].onclick = function () {
                i = i + 1;
                list();
                tach(slider, { left: -1200 * i });
            }
        })(i);
    }
    

    function last() {
        if (move) {
            return;
        }
        move = true;
        i--;
        list();
        tach(slider, { left: -1200 * i }, function () {
            if (i == 0) {
                slider.style.left = '-6000px';
                i = 5;
            }
            move = false;
        });
    }
    


    function next() {
        if (move) {
            return;
        }
        move = true;
        i++;
        list();
        tach(slider, { left: -1200 * i }, function () {
            if (i == 6) {
                slider.style.left = '-1200px';
                i = 1;
            }
            move = false;
        });
    }

    
    var timer = setInterval(next, 2000);
    


    box.onmouseover = function () {
        left.style.opacity = 0.3;
        right.style.opacity = 0.3;
        clearInterval(timer)
    }
    box.onmouseout = function () {
        left.style.opacity = 0;
        right.style.opacity = 0;
        timer();
    }
   
     
    
    function getStyle(obj, attr){
        if(obj.currentStyle){
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, null)[attr];
        }
    }
    


    function tach(obj, json, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var isStop = true;
            for (var attr in json) {
                var n = 0;
                var speed = (json[attr] - n) / 8;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                if (attr == 'opacity') {
                    n = parseInt(getStyle(obj, attr) * 100);
                    obj.style[attr] = (n + speed) / 100;
                } else {
                    n = parseInt(getStyle(obj, attr));
                    obj.style[attr] = (n + speed) + 'px';
                }
                
                // if (attr == 'opacity') {
                //     obj.style[attr] = (n + speed) / 100;
                // } 
                // else {
                //     obj.style[attr] = (n + speed) + 'px';
                // }
                if (json[attr] !== n + speed) {
                    isStop = false;
                }
            }
            if (isStop) {
                clearInterval(obj.timer);
                callback && callback();
            }
        }, 20)
    }
})