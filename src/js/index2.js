/**
 * Created by ASUS on 2018/7/31.
 */
var start = document.getElementsByClassName('start')[0];
var box = document.getElementsByClassName('box')[0];
var over = document.getElementsByClassName('over')[0];
var close = document.getElementsByClassName('close-btn')[0];
var alertBox = document.getElementsByClassName('alertBox')[0];

var minesNum = 10;
var mineMap = new Array();
var x = 10; //横轴个数
var y = 10;//纵轴个数
var numFlag = 0; //生成的数字个数

var starGame = true;
var flagNum = 0;

bind();
function bind() {
    start.onclick = function () {
        if(starGame){
            starGame = false;
            box.style.display = 'block';
            init();
        }
    }
    box.onmousedown = function(e){
        var event = e || window.event;
        var ele=event.target || event.srcElement;
        if(event.button == 0){
            leftBtn(ele);
        }
        if(event.button == 2){
           righBtn(ele);
        }
    }
    box.oncontextmenu = function () {
        return false;
    }
    close.onclick = function () {
        starGame = true;
        alertBox.style.display = 'none';
        over.style.backgroundImage = '';
        box.innerHTML = '';
        box.style.display =  'none';
        var mineMap = new Array();
        var minesNum = 10;
        numFlag = 0;
        flagNum = 0

    }
}

function init() {

    var leiNum = minesNum
    for(var i = 1; i <= x; i ++){
        mineMap[i] = new Array();
        for(var j = 1; j <= y; j ++){
            var dom = document.createElement('div');
            dom.className = 'block';
            dom.setAttribute('id',i + '-' + j)
            box.appendChild(dom)
            mineMap[i][j] = 1;

        }
    }

    //生成雷
    while (leiNum){
        var leiI = Math.floor(Math.random() * 10 + 1);
        var LEIJ = Math.floor(Math.random() * 10 + 1);
        if(mineMap[leiI][LEIJ] != 2){
            mineMap[leiI][LEIJ] = 2;
            leiNum --
            var lei = document.getElementById(leiI+'-'+LEIJ);
            lei.classList.add('isLei');
        }

    }

}

function leftBtn(dom) {
if(!dom.innerText){
    var domId = dom.getAttribute('id').split('-');
    var i = parseInt(domId[0]);
    var j = parseInt(domId[1]);


    if(dom.className.indexOf('flag') + 1){
        return false;
    }
    if(mineMap[i][j] != 2){

        var n = 0;

        ((i - 1) > 0 && (j - 1) > 0&& mineMap[i - 1][j - 1] == 2)? n++ : null;
        ((i - 1) >0 && mineMap[i - 1][j] == 2)? n++ : null;
        ((i - 1) > 0 && (j + 1) <= 10 && mineMap[i - 1][j + 1] == 2)? n++ : null;
        ((j - 1) > 0 && mineMap[i][j - 1] == 2)? n++ : null;
        ((j + 1) <= 10 && mineMap[i][j + 1] == 2)? n++ : null;
        ((i + 1) <= 10 && (j - 1) > 0 && mineMap[i + 1][j - 1] == 2)? n++ : null;
        ((i + 1) <= 10 && mineMap[i + 1][j] == 2)? n++ : null;
        ((i + 1) <= 10 && (j + 1) <= 10 && mineMap[i + 1][j + 1] == 2)? n++ : null;

        if(n == 0){

            dom.innerText = '0'
            winOrover(x * y - numFlag)
            numFlag ++;
            dom.style.backgroundColor = '#fff';
            mineMap[i][j] = 3;
            for(var x = i - 1; x <= i + 1; x ++){
                for (var y = j - 1; y <= j + 1; y ++){
                    if(x > 0 && x <= 10 & y > 0 && y <= 10 && !(x == i && y == j)){
                        if(mineMap[x][y] != 3){
                            leftBtn(document.getElementById(x + '-' + y))
                        }
                    }
                }
            }
        }else {
            dom.innerText = n;
            numFlag ++;
            winOrover(x * y - numFlag)
            dom.style.backgroundColor = '#fff'

        }


        return numFlag;
    }

    if(mineMap[i][j] == 2){
        var lei = document.getElementsByClassName('isLei');
        for(var i = 0 ; i < minesNum ; i ++){
            lei[i].classList.add('show');
        }
        setTimeout(function () {
            alertBox.style.display = 'block';
            over.style.backgroundImage = ' url("src/image/gameover.jpg")';
        },1000)
        return false;

    }

  }
}

function righBtn(dom) {
    if(dom.className.indexOf('flag') == -1){
        dom.classList.add('flag')
        flagNum ++
    }else {
        dom.classList.remove('flag')
        flagNum --
    }
    //当旗子数等于雷数时判断是不是全部旗子都插在雷上
    if(flagNum == minesNum){
        var leis = document.getElementsByClassName('isLei');
        var n = 0;

        for(var i = 0; i < minesNum; i ++){
            if(leis[i].className.indexOf('flag') != -1){
                n ++
            }
        }
        if(n  == minesNum){
            winOrover(n);
        }
    }
}

function winOrover(num) {
    if(num == minesNum){
        setTimeout(function () {
            alertBox.style.display = 'block';
            over.style.backgroundImage = ' url("src/image/win.jpg")';
        },500)
    }
}
