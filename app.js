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
    var oNavlist = document.getElementById('navs').children;
    var slider = document.getElementById('slider');
    var left = document.getElementById('left');
    var right = document.getElementById('right');
    var span = document.getElementsByTagName('span');
    var index = 1;
    var isMoving = false;
    var timer = setInterval(next, 3000);
    //鼠标滑入改变左右索引的透明度
    box.onmouseover = function () {
        span[0].style.opacity = 0.5;
        span[1].style.opacity = 0.5;
        clearInterval(timer)
    }
    box.onmouseout = function () {
        span[0].style.opacity = 0;
        span[1].style.opacity = 0;
        timer = setInterval(next, 3000);
    }
    //左右索引添加事件
    left.onclick = prev;
    right.onclick = next;
    //索引序号
    for (var i = 0; i < oNavlist.length; i++) {
        (function (i) {
            oNavlist[i].onclick = function () {
                index = i + 1;
                navmove();
                animate(slider, { left: -1200 * index });
            }
        })(i);
    }
    //上一张
    function prev() {
        if (isMoving) {
            return;
        }
        isMoving = true;
        index--;
        navmove();
        animate(slider, { left: -1200 * index }, function () {
            if (index == 0) {
                slider.style.left = '-6000px';
                index = 5;
            }
            isMoving = false;
        });
    }
    //下一张
    function next() {
        if (isMoving) {
            return;
        }
        isMoving = true;
        index++;
        navmove();
        animate(slider, { left: -1200 * index }, function () {
            if (index == 6) {
                slider.style.left = '-1200px';
                index = 1;
            }
            isMoving = false;
        });
    }
    //对应图片的索引序号
    function navmove() {
        for (var i = 0; i < oNavlist.length; i++) {
            oNavlist[i].className = "";
        }
        if (index > 5) {
            oNavlist[0].className = "active";
        } else if (index <= 0) {
            oNavlist[4].className = "active";
        } else {
            oNavlist[index - 1].className = "active";
        }
    }
    //获取当前标签的css属性
    function getStyle(obj, attr){
        if(obj.currentStyle){
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj, null)[attr];
        }
    }
    //轮播
    function animate(obj, json, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var isStop = true;
            for (var attr in json) {
                var now = 0;
                if (attr == 'opacity') {
                    now = parseInt(getStyle(obj, attr) * 100);
                } else {
                    now = parseInt(getStyle(obj, attr));
                }
                var speed = (json[attr] - now) / 8;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                var cur = now + speed;
                if (attr == 'opacity') {
                    obj.style[attr] = cur / 100;
                } else {
                    obj.style[attr] = cur + 'px';
                }
                if (json[attr] !== cur) {
                    isStop = false;
                }
            }
            if (isStop) {
                clearInterval(obj.timer);
                callback && callback();
            }
        }, 30)
    }
})