carousel = [
    ["planters-inn-charleston-sc.gif", "http://www.elegantsmallhotel.com/hotels/esh316.html", "Planters Inn - Charleston, SC", " <b>Planters Inn</b><br> Charleston, SC"],
    ["the-kimberly-hotel-ny-ny.gif", "http://www.elegantsmallhotel.com/hotels/esh1220.html", "The Kimberly Hotel - New York, NY", " <b>The Kimberly Hotel</b><br> New York, NY"],
    ["barley-sheaf-barn-holicong-.gif", "http://www.elegantsmallhotel.com/hotels/esh1821.html", "Barley Sheaf Barn - Holicong, Pennsylvania", " <b>Barley Sheaf Barn</b><br> Holicong, Pennsylvania"],
    ["grand-hotel-minerve-rome-it.gif", "http://www.elegantsmallhotel.com/hotels/eww333.html", "Grand Hotel Minerve - Rome, Italy", " <b>Grand Hotel Minerve</b><br> Rome, Italy"],
    ["marshall-house-savanah-geor.gif", "http://www.elegantsmallhotel.com/hotels/esh2022.html", "Marshall House - Savanah, Georgia", " <b>Marshall House</b><br> Savanah, Georgia"],
    ["monte-do-casal-estoi-portug.gif", "http://www.elegantsmallhotel.com/hotels/eww4632.html", "Monte do Casal - Estoi, Portugal", " <b>Monte do Casal</b><br> Estoi, Portugal"],
    ["is-morus-hotel-sardinia-ita.gif", "http://www.elegantsmallhotel.com/hotels/eww4632.html", "Is Morus Hotel - Sardinia, Italy", " <b>Is Morus Hotel</b><br> Sardinia, Italy"],
    ["8034eww.jpg", "http://www.elegantsmallhotel.com/hotels/eww8034.html", "El Tamarindo - Cihuatlan, Mexico", " <b>El Tamarindo</b><br> Cihuatlan, Mexico"]
]

dir = 0 // 0 = left 1 = right
speed = 3
imageSize = 100 // % set to zero to use fixedWidth and fixedHeight values
fixedWidth = 200 // set a fixed width
fixedHeight = 200 // set a fixed height
spacerWidth = 2 // space between images

biggest = 0
ieBorder = 0
totalWidth = 0
hs5Timer = null

lastN = 0
count = 0

preload = new Array()
for (var i = 0; i < carousel.length; i++) {
    preload[i] = []
    for (var j = 0; j < 2; j++) {
        preload[i][j] = new Image()
        preload[i][j].src = carousel[i][j]
    }
}

function initHS5() {
    scroll1 = document.getElementById("scroller1")
    for (var k = 0; k < carousel.length; k++) {

        scroll1.innerHTML += '<img id="pic' + k + '" src="' + preload[k][0].src + '" alt="' + carousel[k][2] + '" title="' + carousel[k][2] + '" onclick="showTarget(' + k + ')" onmouseover="testOver(this,this.offsetParent.id,' + k + ')" onmouseout="testOut(event)">'

        if (imageSize != 0) { // use percentage size
            newWidth = preload[k][0].width / 100 * imageSize
            newHeight = preload[k][0].height / 100 * imageSize
        } else { // use fixed size
            newWidth = fixedWidth
            newHeight = fixedHeight
        }

        document.getElementById("pic" + k).style.width = newWidth + "px"
        document.getElementById("pic" + k).style.height = newHeight + "px"

        if (document.getElementById("pic" + k).offsetHeight > biggest) {
            biggest = document.getElementById("pic" + k).offsetHeight
        }

        document.getElementById("pic" + k).style.marginLeft = spacerWidth + "px"
        totalWidth += document.getElementById("pic" + k).offsetWidth + spacerWidth
    }

    totalWidth += 1

    for (var l = 0; l < carousel.length; l++) { // vertically center images
        document.getElementById("pic" + l).style.marginBottom = (biggest - document.getElementById("pic" + l).offsetHeight) / 2 + "px"
    }

    if (document.getElementById && document.all) {
        ieBorder = parseInt(document.getElementById("scrollbox").style.borderTopWidth) * 2
    }

    document.getElementById("scrollbox").style.height = biggest + ieBorder + "px"
    scroll1.style.width = totalWidth + "px"
    scroll2 = document.getElementById("scroller2")
    scroll2.innerHTML = scroll1.innerHTML
    scroll2.style.left = (-scroll1.offsetWidth) + "px"
    scroll2.style.top = -scroll1.offsetHeight + "px"
    scroll2.style.width = totalWidth + "px"

    if (dir == 1) {
        speed = -speed
    }

    scrollHS5()
}

function scrollHS5() {
    clearTimeout(hs5Timer)
    scroll1Pos = parseInt(scroll1.style.left)
    scroll2Pos = parseInt(scroll2.style.left)
    scroll1Pos -= speed
    scroll2Pos -= speed
    scroll1.style.left = scroll1Pos + "px"
    scroll2.style.left = scroll2Pos + "px"
    hs5Timer = setTimeout("scrollHS5()", 50)

    if (dir == 0) {
        if (scroll1Pos < -scroll1.offsetWidth) {
            scroll1.style.left = scroll1.offsetWidth + "px"
        }

        if (scroll2Pos < -scroll1.offsetWidth) {
            scroll2.style.left = scroll1.offsetWidth + "px"
        }
    }

    if (dir == 1) {
        if (scroll1Pos > parseInt(document.getElementById("scrollbox").style.width)) {
            scroll1.style.left = scroll2Pos + (-scroll1.offsetWidth) + "px"
        }

        if (scroll2Pos > parseInt(document.getElementById("scrollbox").style.width)) {
            scroll2.style.left = scroll1Pos + (-scroll2.offsetWidth) + "px"
        }
    }

}

st = null

function pause() {
    clearTimeout(hs5Timer)
    clearTimeout(st)
}

function reStartHS5() {
    clearTimeout(st)
    st = setTimeout("scrollHS5()", 100)
}

function showTarget(p) {
    if (carousel[p][1] != "") {
        paused = 1
        document.location = carousel[p][1]
    }
}

function testOver(obj, par, n) {
    if (carousel[n][3] == "") {
        return
    }
    document.getElementById("qw").innerHTML = carousel[n][3]
    document.getElementById("qw").style.display = "block"
    document.getElementById("qw").style.width = obj.offsetWidth
    document.getElementById("qw").style.height = 40 //obj.offsetHeight

    bord = 0
    if (fx) {
        bord = parseInt(document.getElementById("scrollbox").style.borderLeftWidth)
    }

    document.getElementById("qw").style.left = obj.offsetLeft + document.getElementById(par).offsetLeft + bord document.getElementById("qw").style.top = (obj.offsetTop + document.getElementById(par).offsetTop) + obj.offsetHeight - document.getElementById("qw").offsetHeight + bord
}

fx = document.getElementById && !document.all

function testOut(e) {
    if (e.toElement && event.toElement.id != "qw") {
        document.getElementById("qw").style.display = "none"
    }
    if (e.relatedTarget && e.relatedTarget.id != "qw") {
        document.getElementById("qw").style.display = "none"
    }
}