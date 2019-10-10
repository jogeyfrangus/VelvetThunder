// Main Variables
var points = 0;
var clickPoints = 1;
var clickerWidth = 125;
var clickerHeight = 84;
var PPS = minWageEmps * 3 + grandmas + startups * 5;

// Store Variables
var grandmas = 0;
var grandmaPrice = 100;
var pNessToBuyGrandma = Math.round(grandmaPrice * 100 - Math.round(points * 100)) / 100;
var minWageEmps = 0;
var minWageEmpPrice = 800;
var pNessToBuyMinWageEmp = Math.round(minWageEmpPrice * 100 - Math.round(points * 100)) / 100;
var startups = 0;
var startupPrice = 3500;
var pNessToBuyStartup = Math.round(startupPrice * 100 - Math.round(points * 100)) / 100;
var powerclicks = 0;
var powerclickPrice = 50;
var pNessToBuyPowerclick = Math.round(powerclickPrice * 100 - Math.round(points * 100)) / 100;
var negotiators = 0;
var negotiatorsPrev = negotiators - 1;
var negotiatorsDoubled = negotiators * 2;
var negotiatorPrice = 3000;
var pNessToBuyNegotiator = Math.round(negotiatorPrice * 100 - Math.round(points * 100)) / 100;

// Options and Sound Variables
var menuIsOpen = false;
var mobile = false;
var popups = true;
var soundOn = true;
var growPumkin = true;
var cursor = 0;
var nomnomnomaudio = new Audio('nomnomnom.mp3');
var imveryhungryaudio = new Audio('imveryhungry.mp3');
var nomaudio = new Audio('nom.mp3');
var noaudio = new Audio('no.mp3');
var noidontwantthataudio = new Audio('noidontwantthat.mp3');

// Randomizer
if (mobile == false) {
    setInterval(function(){if (document.getElementById('randomizer').innerHTML == "<!-- 1 -->") {
		    document.getElementById('randomizer').innerHTML = "<!-- 2 -->";
	    } else if (document.getElementById('randomizer').innerHTML == "<!-- 2 -->") {
		    document.getElementById('randomizer').innerHTML = "<!-- 3 -->";
	    } else if (document.getElementById('randomizer').innerHTML == "<!-- 3 -->") {
		    document.getElementById('randomizer').innerHTML = "<!-- 1 -->";
	    }},77);
    setInterval(function(){if (document.getElementById('randomizer2').innerHTML == "<!-- 1 -->") {
		    document.getElementById('randomizer2').innerHTML = "<!-- 2 -->";
	    } else if (document.getElementById('randomizer2').innerHTML == "<!-- 2 -->") {
		    document.getElementById('randomizer2').innerHTML = "<!-- 3 -->";
	    } else if (document.getElementById('randomizer2').innerHTML == "<!-- 3 -->") {
		    document.getElementById('randomizer2').innerHTML = "<!-- 1 -->";
	    }},55);
}

// Functions

function updatePoints() {
	document.getElementById('pointsCounter').innerHTML = `Points: ${points}`;
}

function buttonPress(event) {
    if (event.keyCode == 32) {
        document.getElementById('clickerImage').click();
    }
}

function clickedButton(event) {
	// Add point(s)
	points += clickPoints
	document.getElementById('pointsCounter').innerHTML = `Points: ${points}`;
	if (mobile == false) {
	    // Get new cursor number and clicker size
	    if (cursor < 21 && cursor > 0) {
	        var cursorNum = cursor;
	    } else {
	        var cursorNum = Math.floor(Math.random() * (20 - 1) + 1);
	    }
	    if (growPumkin == true) {
	        clickerWidth += 0.25 * clickPoints;
	        clickerHeight += 0.168 * clickPoints;
	    }
	    if (popups == true) {
	        // Create point addition popup
    	        var popupX = (Math.random() * (document.getElementById('clickerImage').getBoundingClientRect().right - 36 - document.getElementById('clickerImage').getBoundingClientRect().left)) + document.getElementById('clickerImage').getBoundingClientRect().left;
    	        var popupY = (Math.random() * (document.getElementById('clickerImage').getBoundingClientRect().bottom - 38 - document.getElementById('clickerImage').getBoundingClientRect().top)) + document.getElementById('clickerImage').getBoundingClientRect().top;
	        var pointPopup = document.createElement('P');
	        var pointText = document.createTextNode(`+${clickPoints}`);
	        pointPopup.appendChild(pointText);
    	        pointPopup.style.position = "absolute";
	        pointPopup.style.left = popupX + "px";
	        pointPopup.style.top = popupY + "px";
	        pointPopup.style.textAlign = "center";
	        pointPopup.style.fontFamily = "sans-serif";
	        pointPopup.style.opacity = 1;
	        pointPopup.onclick = function(event) {clickedButton(event)};
	        pointPopup.style.cursor = `url(cursors/${cursorNum}.png), auto`;
	        document.getElementsByTagName('BODY')[0].appendChild(pointPopup);
	        setTimeout(function() {
	            var fadeOut = setInterval(function() {
	                if (pointPopup.style.opacity > 0) {
	                    pointPopup.style.opacity -= 0.01;
	                } else {
	                    pointPopup.remove();
	                }
	            }, 10)
	        }, 0);
	    }
	    // Apply cursor and clicker size
	    document.getElementById('clicker').innerHTML = `<img id='clickerImage' src='Hungry Pumkin Face.png' width='${clickerWidth}' height='${clickerHeight}' style='cursor: url(cursors/${cursorNum}.png), auto' onclick='clickedButton(event);' ondragstart='return false;'>`;
	}
	if (soundOn == true && mobile == false) {
		if (document.getElementById('randomizer').innerHTML == "<!-- 1 -->") {
			if (document.getElementById('randomizer2').innerHTML == "<!-- 1 -->") {
				var nomnomnomaudio = new Audio('nomnomnom.mp3');
				nomnomnomaudio.play();
			} else {
				var nomaudio = new Audio('nom.mp3');
				nomaudio.play();
			}
		} else {
			var nomaudio = new Audio('nom.mp3');
			nomaudio.play();
		}
	}
}

function soundToggle() {
	if (soundOn == true) {
		soundOn = false;
		document.getElementById('soundToggleButton').innerHTML = "Turn Sounds On";
	} else {
		soundOn = true;
		document.getElementById('soundToggleButton').innerHTML = "Turn Sounds Off";
	}
}

function growPumkinToggle() {
	if (growPumkin == true && mobile == false) {
		growPumkin = false;
		document.getElementById('growPumkinToggleButton').innerHTML = "Let Pumkin Grow";
	} else {
		growPumkin = true
		document.getElementById('growPumkinToggleButton').innerHTML = "Stop Pumkin from Growing";
	}
}

function mobileToggle() {
	if (mobile == true) {
		mobile = false;
		document.getElementById('mobileToggleButton').innerHTML = "Anti-Lag Mode Off";
	} else {
		mobile = true;
		document.getElementById('mobileToggleButton').innerHTML = "Anti-Lag Mode On";
	}
}

function popupToggle() {
	if (popups == true) {
		popups = false;
		document.getElementById('popupToggleButton').innerHTML = "Point Popups Off";
	} else {
		popups = true;
		document.getElementById('popupToggleButton').innerHTML = "Point Popups On";
	}
}

function resetPumkinSize() {
	var confirmResetPumkinSize = confirm("Are you sure you want to reset the size of Pumkin?");
	if (confirmResetPumkinSize == true) {
		clickerWidth = 125;
		clickerHeight = 84;
		document.getElementById('clicker').innerHTML = `<img id='clickerImage' src='Hungry Pumkin Face.png' width='${clickerWidth}' height='${clickerHeight}' style='cursor: url(cursors/3.png), auto;' onclick='clickedButton(event);' ondragstart='return false;'>`;
	}
}

function openMenu() {
	if (menuIsOpen == false) {
        var menuButtonsVar = document.getElementById('menuButtons');
        menuButtonsVar.style.animationName = "menuOpen";
	    var openMenuAnim = setInterval(function() { menuButtonsVar.style.right = String(Number(menuButtonsVar.style.right.replace('px', '')) + 1) + "px"; if (Number(menuButtonsVar.style.right.replace('px', '')) >= 0) { clearInterval(openMenuAnim); } }, 1);
	    menuIsOpen = true;
	} else {
        var menuButtonsVar = document.getElementById('menuButtons');
        menuButtonsVar.style.animationName = "menuClose";
	    menuIsOpen = false;
	}
}

function cheat() {
	var cheatCode = "";
	var cursorChange = false;
    cheatCode = encode(prompt());
    switch(cheatcode) {
        case "GGQHsDiLOpjhYUVtynRHDiLOpYrRJtYrRJtXeRPcjhYUV":
            points += 50000;
            break;
        case "oQUPQSyOzPPvHaODiLOpgKyFe":
            points = points - 50000;
            break;
        case "vWKuaZAwZDxhiVJIHrJqjhYUVGGQHsDiLOpYrRJtYrRJt":
            document.documentElement.style.filter = "invert(100%)";
	        document.getElementsByTagName('BODY')[0].style.background = "linear-gradient(white, black)";
	        document.getElementsByTagName('BODY')[0].style.backgroundRepeat = "repeat-x";
	        document.getElementsByTagName('BODY')[0].style.backgroundColor = "black";
            break;
        case "PvHaOSyOzPXeRPcDiLOpgKyFe":
			cursor = 1;
			cursorChange = true;
            break;
        case "PvHaOoQUPQSyOzPxhiVJXeRPcSyOzP":
            cursor = 2;
			cursorChange = true;
            break;
        case "PvHaOoQUPQjhYUVjhYUVXeRPcSyOzP":
            cursor = 3;
			cursorChange = true;
            break;
        case "AcAtpIHrJqXeRPcXeRPcsfdFFXeRPc":
            cursor = 4;
			cursorChange = true;
            break;
        case "AcAtpIHrJqZAwZDAcAtpnuweCXeRPcvWKua":
            cursor = 5;
			cursorChange = true;
            break;
        case "AcAtpUgUuPGGQHsGGQHsXeRPcXeRPc":
            cursor = 6;
			cursorChange = true;
            break;
        case "XeRPcxhiVJxhiVJsfdFF":
            cursor = 7;
			cursorChange = true;
            break;
        case "GGQHsZAwZDsfdFFIHrJq":
            cursor = 8;
			cursorChange = true;
            break;
        case "GGQHsSyOzPXeRPcvWKuaAcAtpIHrJqqSbsYGGQHsSyOzPZAwZDXeRPcsfdFF":
            cursor = 9;
			cursorChange = true;
            break;
        case "IHrJqUgUuPjhYUVqSbsYgKyFeUgUuPxhiVJ":
            cursor = 10;
			cursorChange = true;
            break;
        case "GuHHnDiLOpDCzzv":
            cursor = 11;
			cursorChange = true;
            break;
        case "GuHHnoQUPQZAwZDAcAtpXeRPc":
            cursor = 12;
			cursorChange = true;
            break;
        case "vWKuaUgUuPUgUuPgKyFeYrRJtXeRPcsfdFF":
            cursor = 13;
			cursorChange = true;
            break;
        case "MGCEPXeRPcMGCEPMGCEPXeRPcSyOzP":
            cursor = 14;
			cursorChange = true;
            break;
        case "MGCEPZAwZDOFbMBOFbMBDiLOp":
            cursor = 15;
			cursorChange = true;
			break;
		case "SyOzPZAwZDAcAtpXeRPc":
            cursor = 16;
			cursorChange = true;
			break;
		case "sfdFFDiLOpYrRJtjhYUV":
            cursor = 17;
			cursorChange = true;
			break;
		case "sfdFFDiLOpvWKuagKyFetynRHZAwZDAcAtpIHrJq":
            cursor = 18;
			cursorChange = true;
			break;
		case "sfdFFUgUuPgKyFeDiLOp":
            cursor = 19;
			cursorChange = true;
			break;
		case "tynRHDiLOpjhYUVXeRPcSyOzP":
            cursor = 20;
			cursorChange = true;
			break;
		case "SyOzPXeRPcsfdFFXeRPcjhYUVqSbsYAcAtpoQUPQSyOzPsfdFFUgUuPSyOzP":
            cursor = 0;
			cursorChange = true;
			break;
		default:
			grandmas += -5;
			while (grandmas > 0) { grandmas += -5; };
			document.getElementById('buyGrandma').innerHTML = `Click here to buy a grandma (${grandmaPrice} points). <span style='color: magenta'> You have ${grandmas}</span>`;
			updatePPS();
			break;
    }
    if (cursorChange) {
		document.getElementById('clicker').innerHTML = `<img id='clickerImage' src='Hungry Pumkin Face.png' width='${clickerWidth}' height='${clickerHeight}' style='cursor: url(cursors/${cursor}.png), auto' onclick='clickedButton(event);' ondragstart='return false;'>`;
		cursorChange = false;
	}
	encodedText = "";
	textToEncode = "";
}

function updatePPS() {
	PPS = minWageEmps * 3 + grandmas + startups * 5;
	document.getElementById('PPSDisplay').innerHTML = `PPS (Points Per Second): ${PPS}`;
}

function powerclick() {
	if (points >= powerclickPrice) {
		powerclicks += 1;
		clickPoints = clickPoints * 2
		points -= powerclickPrice;
		powerclickPrice = Math.floor(powerclickPrice * 3);
		document.getElementById('buyPowerclick').innerHTML = `Click here to buy a powerclick (${powerclickPrice} points). <span style='color: magenta'> You have ${powerclicks}</span>`;
		if (soundOn == true && mobile == false) {
		    var chachingaudio = new Audio('http://magmablock.x10host.com/feedhungrypumkin/cash_register_04.mp3');
		    chachingaudio.play();
		}
		document.getElementById('pointsCounter').innerHTML = `Points: ${points}`;
	} else {
		pNessToBuyPowerclick = Math.round(powerclickPrice * 100 - Math.round(points * 100)) / 100;
		var notification = document.createElement('p');
		var notificationText = document.createTextNode(`You need ${pNessToBuyPowerclick} more points to buy a powerclick`);
		notification.appendChild(notificationText);
		notification.style.opacity = 1;
		document.getElementById('notifications').insertBefore(notification, document.getElementById('notifications').childNodes[0]);
		setTimeout(function() {
		    var fadeOut = setInterval(function() {
		        if (notification.style.opacity > 0) {
		            notification.style.opacity -= 0.01;
		        } else {
		            notification.remove();
		        }
		    }, 10)
		}, 1500);
		if (soundOn == true && mobile == false) {
			var noaudio = new Audio('no.mp3');
			noaudio.play();
		}
	}
}

function grandma() {
	if (points >= grandmaPrice) {
		grandmas += 1;
		points -= grandmaPrice;
		grandmaPrice = Math.floor(grandmaPrice * 1.2);
		document.getElementById('buyGrandma').innerHTML = `Click here to buy a grandma (${grandmaPrice} points). <span style='color: magenta'> You have ${grandmas}</span>`;
		if (soundOn == true && mobile == false) {
		    var chachingaudio = new Audio('http://magmablock.x10host.com/feedhungrypumkin/cash_register_04.mp3');
		    chachingaudio.play();
		}
		document.getElementById('pointsCounter').innerHTML = `Points: ${points}`;
	} else {
		pNessToBuyGrandma = Math.round(grandmaPrice * 100 - Math.round(points * 100)) / 100;
		var notification = document.createElement('p');
		var notificationText = document.createTextNode(`You need ${pNessToBuyGrandma} more points to buy a grandma`);
		notification.appendChild(notificationText);
		notification.style.opacity = 1;
		document.getElementById('notifications').insertBefore(notification, document.getElementById('notifications').childNodes[0]);
		setTimeout(function() {
		    var fadeOut = setInterval(function() {
		        if (notification.style.opacity > 0) {
		            notification.style.opacity -= 0.01
		        } else {
		            notification.remove();
		        }
		    }, 10)
		}, 1500);
		if (soundOn == true && mobile == false) {
			var noaudio = new Audio('no.mp3');
			noaudio.play();
		}
	}
}

function minWageEmp() {
	if (points >= minWageEmpPrice) {
		minWageEmps += 1;
		points -= minWageEmpPrice;
		minWageEmpPrice = Math.floor(minWageEmpPrice * 1.2);
		document.getElementById('buyMinWageEmp').innerHTML = `Click here to buy a minimum wage employee (${minWageEmpPrice} points). <span style='color: magenta'>You have ${minWageEmps}</span>`;
		if (soundOn == true && mobile == false) {
		    var chachingaudio = new Audio('http://magmablock.x10host.com/feedhungrypumkin/cash_register_04.mp3');
		    chachingaudio.play();
		}
		document.getElementById('pointsCounter').innerHTML = `Points: ${points}`;
	} else {
		pNessToBuyMinWageEmp = Math.round(minWageEmpPrice * 100 - Math.round(points * 100)) / 100;
		var notification = document.createElement('p');
		var notificationText = document.createTextNode(`You need ${pNessToBuyMinWageEmp} more points to buy a minimum wage employee`);
		notification.appendChild(notificationText);
		notification.style.opacity = 1;
		document.getElementById('notifications').insertBefore(notification, document.getElementById('notifications').childNodes[0]);
		setTimeout(function() {
		    var fadeOut = setInterval(function() {
		        if (notification.style.opacity > 0) {
		            notification.style.opacity -= 0.01
		        } else {
		            notification.remove();
		        }
		    }, 10)
		}, 1500);
		if (soundOn == true && mobile == false) {
			var noaudio = new Audio('no.mp3');
			noaudio.play();
		}
	}
}

function startup() {
	if (points >= startupPrice) {
		startups += 1;
		minWageEmps += 3;
		points -= startupPrice;
		startupPrice = Math.floor(startupPrice * 1.2);
		document.getElementById('buyMinWageEmp').innerHTML = `Click here to buy a minimum wage employee (${minWageEmpPrice} points). <span style='color: magenta'>You have ${minWageEmps}</span>`;
		document.getElementById('buyStartup').innerHTML = `Click here to buy a startup (${startupPrice} points). <span style='color: magenta'>You have ${startups}</span>`;
		if (soundOn == true && mobile == false) {
		    var chachingaudio = new Audio('http://magmablock.x10host.com/feedhungrypumkin/cash_register_04.mp3');
		    chachingaudio.play();
		}
		document.getElementById('pointsCounter').innerHTML = `Points: ${points}`;
	} else {
		pNessToBuyStartup = Math.round(startupPrice * 100 - Math.round(points * 100)) / 100;
		var notification = document.createElement('p');
		var notificationText = document.createTextNode(`You need ${pNessToBuyStartup} more points to buy a startup`);
		notification.appendChild(notificationText);
		notification.style.opacity = 1;
		document.getElementById('notifications').insertBefore(notification, document.getElementById('notifications').childNodes[0]);
		setTimeout(function() {
		    var fadeOut = setInterval(function() {
		        if (notification.style.opacity > 0) {
		            notification.style.opacity -= 0.01
		        } else {
		            notification.remove();
		        }
		    }, 10)
		}, 1500);
		if (soundOn == true && mobile == false) {
			var noaudio = new Audio('no.mp3');
			noaudio.play();
		}
	}
}

function negotiator() {
	if (points >= negotiatorPrice) {
		if (negotiators > 1) {
			negotiators += 1;
			negotiatorsPrev = negotiators - 1;
			negotiatorsDoubled = negotiators * 2;
			grandmaPrice = Math.floor(grandmaPrice * negotiatorsPrev * 2);
			minWageEmpPrice = Math.floor(minWageEmpPrice * negotiatorsPrev * 2);
			startupPrice = Math.floor(startupPrice * negotiatorsPrev * 2);
			grandmaPrice = Math.floor(grandmaPrice / negotiatorsDoubled);
			minWageEmpPrice = Math.floor(minWageEmpPrice / negotiatorsDoubled);
			startupPrice = Math.floor(startupPrice / negotiatorsDoubled);
		} else {
			negotiators += 1;
			negotiatorsPrev = negotiators - 1;
			negotiatorsDoubled = negotiators * 2;
			grandmaPrice = Math.floor(grandmaPrice / negotiatorsDoubled);
			minWageEmpPrice = Math.floor(minWageEmpPrice / negotiatorsDoubled);
			startupPrice = Math.floor(startupPrice / negotiatorsDoubled);
		}
		points -= negotiatorPrice;
		negotiatorPrice = Math.floor(negotiatorPrice * 3);
		document.getElementById('buyGrandma').innerHTML = `Click here to buy a grandma (${grandmaPrice} points). <span style='color: magenta'> You have ${grandmas}</span>`; 
		document.getElementById('buyMinWageEmp').innerHTML = `Click here to buy a minimum wage employee (${minWageEmpPrice} points). <span style='color: magenta'>You have ${minWageEmps}</span>`;
		document.getElementById('buyStartup').innerHTML = `Click here to buy a startup (${startupPrice} points). <span style='color: magenta'>You have ${startups}</span>`;
		document.getElementById('buyNegotiator').innerHTML = `Click here to buy a negotiator (${negotiatorPrice} points). <span style='color: magenta'> You have ${negotiators}</span>`;
		if (soundOn == true && mobile == false) {
		    var chachingaudio = new Audio('http://magmablock.x10host.com/feedhungrypumkin/cash_register_04.mp3');
		    chachingaudio.play();
		}
		document.getElementById('pointsCounter').innerHTML = `Points: ${points}`;
	} else {
		pNessToBuyNegotiator = Math.round(negotiatorPrice * 100 - Math.round(points * 100)) / 100;
		var notification = document.createElement('p');
		var notificationText = document.createTextNode(`You need ${pNessToBuyNegotiator} more points to buy a negotiator`);
		notification.appendChild(notificationText);
		notification.style.opacity = 1;
		document.getElementById('notifications').insertBefore(notification, document.getElementById('notifications').childNodes[0]);
		setTimeout(function() {
		    var fadeOut = setInterval(function() {
		        if (notification.style.opacity > 0) {
		            notification.style.opacity -= 0.01
		        } else {
		            notification.remove();
		        }
		    }, 10)
		}, 1500);
		if (soundOn == true && mobile == false) {
			var noaudio = new Audio('no.mp3');
			noaudio.play();
		}
	}
}

// Store Item Functionality
setInterval(function(){points += grandmas;},1000);
setInterval(function(){points += minWageEmps * 3;},1000);
setInterval(function(){points += startups * 5;},1000);

// Save and Load
function save() {
	localStorage.points = points;
	localStorage.clickPoints = clickPoints;
	localStorage.clickerWidth = clickerWidth;
	localStorage.clickerHeight = clickerHeight;
	localStorage.PPS = PPS;
	localStorage.grandmas = grandmas;
	localStorage.grandmaPrice = grandmaPrice;
	localStorage.pNessToBuyGrandma = pNessToBuyGrandma;
	localStorage.minWageEmps = minWageEmps;
	localStorage.minWageEmpPrice = minWageEmpPrice;
	localStorage.pNessToBuyMinWageEmp = pNessToBuyMinWageEmp;
	localStorage.startups = startups;
	localStorage.startupPrice = startupPrice;
	localStorage.pNessToBuyStartup = pNessToBuyStartup;
	localStorage.powerclicks = powerclicks;
	localStorage.powerclickPrice = powerclickPrice;
	localStorage.pNessToBuyPowerclick = pNessToBuyPowerclick;
	localStorage.negotiators = negotiators;
	localStorage.negotiatorsPrev = negotiatorsPrev;
	localStorage.negotiatorsDoubled = negotiatorsDoubled;
	localStorage.negotiatorPrice = negotiatorPrice;
	localStorage.pNessToBuyNegotiator = pNessToBuyNegotiator;
	localStorage.menuIsOpen = menuIsOpen;
	localStorage.mobile = mobile;
	localStorage.soundOn = soundOn;
	localStorage.growPumkin = growPumkin;
	var notification = document.createElement('p');
	var notificationText = document.createTextNode("Saved game");
	notification.appendChild(notificationText);
	notification.style.opacity = 1;
	document.getElementById('notifications').insertBefore(notification, document.getElementById('notifications').childNodes[0]);
	setTimeout(function() {
	    var fadeOut = setInterval(function() {
	        if (notification.style.opacity > 0) {
	            notification.style.opacity -= 0.01
	        } else {
	            notification.remove();
	        }
	    }, 10)
	}, 1500);
}

function loadSave() {
	if (localStorage.growPumkin) {
		points = Number(localStorage.points);
		clickPoints = Number(localStorage.clickPoints);
		clickerWidth = Number(localStorage.clickerWidth);
		clickerHeight = Number(localStorage.clickerHeight);
		PPS = Number(localStorage.PPS);
		grandmas = Number(localStorage.grandmas);
		grandmaPrice = Number(localStorage.grandmaPrice);
		pNessToBuyGrandma = Number(localStorage.pNessToBuyGrandma);
		minWageEmps = Number(localStorage.minWageEmps);
		minWageEmpPrice = Number(localStorage.minWageEmpPrice);
		pNessToBuyMinWageEmp = Number(localStorage.pNessToBuyMinWageEmp);
		startups = Number(localStorage.startups);
		startupPrice = Number(localStorage.startupPrice);
		pNessToBuyStartup = Number(localStorage.pNessToBuyStartup);
		powerclicks = Number(localStorage.powerclicks);
		powerclickPrice = Number(localStorage.powerclickPrice);
		pNessToBuyPowerclick = Number(localStorage.pNessToBuyPowerclick);
		negotiators = Number(localStorage.negotiators);
		negotiatorsPrev = Number(localStorage.negotiatorsPrev);
		negotiatorsDoubled = Number(localStorage.negotiatorsDoubled);
		negotiatorPrice = Number(localStorage.negotiatorPrice);
		pNessToBuyNegotiator = Number(localStorage.pNessToBuyNegotiator);
		menuIsOpen = Boolean(localStorage.menuIsOpen);
		mobile = Boolean(localStorage.mobile);
		soundOn = Boolean(localStorage.soundOn);
		growPumkin = Boolean(localStorage.growPumkin);
	}
}

function clearSave() {
	if (confirm('WARNING: THIS WILL DELETE ALL PROGRESS!')) {
		localStorage.removeItem(points);
		localStorage.removeItem(clickPoints);
		localStorage.removeItem(clickerWidth);
		localStorage.removeItem(clickerHeight);
		localStorage.removeItem(PPS);
		localStorage.removeItem(grandmas);
		localStorage.removeItem(grandmaPrice);
		localStorage.removeItem(pNessToBuyGrandma);
		localStorage.removeItem(minWageEmps);
		localStorage.removeItem(minWageEmpPrice);
		localStorage.removeItem(pNessToBuyMinWageEmp);
		localStorage.removeItem(startups);
		localStorage.removeItem(startupPrice);
		localStorage.removeItem(pNessToBuyStartup);
		localStorage.removeItem(powerclicks);
		localStorage.removeItem(powerclickPrice);
		localStorage.removeItem(pNessToBuyPowerclick);
		localStorage.removeItem(negotiators);
		localStorage.removeItem(negotiatorsPrev);
		localStorage.removeItem(negotiatorsDoubled);
		localStorage.removeItem(negotiatorPrice);
		localStorage.removeItem(pNessToBuyNegotiator);
		localStorage.removeItem(menuIsOpen);
		localStorage.removeItem(mobile);
		localStorage.removeItem(soundOn);
		localStorage.removeItem(growPumkin);
		points = 0;
		clickPoints = 1;
		clickerWidth = 125;
		clickerHeight = 84;
		PPS = minWageEmps * 3 + grandmas + startups * 5;
		grandmas = 0;
		grandmaPrice = 100;
		pNessToBuyGrandma = Math.round(grandmaPrice * 100 - Math.round(points * 100)) / 100;
		minWageEmps = 0;
		minWageEmpPrice = 800;
		pNessToBuyMinWageEmp = Math.round(minWageEmpPrice * 100 - Math.round(points * 100)) / 100;
		startups = 0;
		startupPrice = 3500;
		pNessToBuyStartup = Math.round(startupPrice * 100 - Math.round(points * 100)) / 100;
		powerclicks = 0;
		powerclickPrice = 50;
		pNessToBuyPowerclick = Math.round(powerclickPrice * 100 - Math.round(points * 100)) / 100;
		negotiators = 0;
		negotiatorsPrev = negotiators - 1;
		negotiatorsDoubled = negotiators * 2;
		negotiatorPrice = 3000;
		pNessToBuyNegotiator = Math.round(negotiatorPrice * 100 - Math.round(points * 100)) / 100;
		menuIsOpen = false;
		mobile = false;
		soundOn = true;
		growPumkin = true;
		save();
		location.reload();
	}
}

function exportSave() {
	var textness = encodeURI(`points = ${points};\nclickPoints = ${clickPoints};\nclickerWidth = ${clickerWidth};\nclickerHeight = ${clickerHeight};\nPPS = ${PPS};\ngrandmas = ${grandmas};\ngrandmaPrice = ${grandmaPrice};\npNessToBuyGrandma = ${pNessToBuyGrandma};\nminWageEmps = ${minWageEmps};\nminWageEmpPrice = ${minWageEmpPrice};\npNessToBuyMinWageEmp ${pNessToBuyMinWageEmp};\nstartups = ${startups};\nstartupPrice = ${startupPrice};\npNessToBuyStartup = ${pNessToBuyStartup};\npowerclicks = ${powerclicks};\npowerclickPrice = ${powerclickPrice};\npNessToBuyPowerclick = ${pNessToBuyPowerclick};\nnegotiators = ${negotiators};\nnegotiatorsPrev = ${negotiatorsPrev};\nnegotiatorsDoubled = ${negotiatorsDoubled};\nnegotiatorPrice = ${negotiatorPrice};\npNessToBuyNegotiator = ${pNessToBuyNegotiator};`);
	var textFileAsBlob = new Blob([textness], {type:'text/plain'});
	var fileNameToSaveAs = prompt('What would you like to call the file? (*.txt)') + ".txt";
	if (fileNameToSaveAs === "null.txt") { return; }
	var downloadLink = document.createElement("a");
	downloadLink.download = fileNameToSaveAs;
	downloadLink.innerHTML = "LELSHESHYIAY";
	window.URL = window.URL || window.webkitURL;
	downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
	downloadLink.style.display = "none";
	document.getElementsByTagName('BODY')[0].appendChild(downloadLink);
	downloadLink.click();
	downloadLink.remove();
}

function importSave(chosenFile) {
	fr = new FileReader();
	fr.readAsText(chosenFile);
	setTimeout(function(){ eval(decodeURI(fr.result)); save(); load(); }, 25)
}

// Updater & Save Timer
var updater = setInterval(function() {
	points = Math.round(points * 100) / 100;
	document.getElementById('pointsCounter').innerHTML = `Points: ${points}`;
	PPS = minWageEmps * 3 + grandmas + startups * 5;
	pNessToBuyMinWageEmp = Math.round(minWageEmpPrice * 100 - Math.round(points * 100)) / 100;
	pNessToBuyStartup = Math.round(startupPrice * 100 - Math.round(points * 100)) / 100;
	pNessToBuyGrandma = Math.round(grandmaPrice * 100 - Math.round(points * 100)) / 100;
	pNessToBuyPowerclick = Math.round(powerclickPrice * 100 - Math.round(points * 100)) / 100;
	pNessToBuyNegotiator = Math.round(negotiatorPrice * 100 - Math.round(points * 100)) / 100;
}, 0.1);

var saver = setInterval(function() { save(); }, 60000);

// Load Info
function load() {
	loadSave();
	document.getElementById('pointsCounter').innerHTML = `Points: ${points}`;
	document.getElementById('buyPowerclick').innerHTML = `Click here to buy a powerclick (${powerclickPrice} points). <span style='color: magenta'> You have ${powerclicks}</span>`;
	document.getElementById('buyGrandma').innerHTML = `Click here to buy a grandma (${grandmaPrice} points). <span style='color: magenta'> You have ${grandmas}</span>`; 
	document.getElementById('buyMinWageEmp').innerHTML = `Click here to buy a minimum wage employee (${minWageEmpPrice} points). <span style='color: magenta'>You have ${minWageEmps}</span>`;
	document.getElementById('buyStartup').innerHTML = `Click here to buy a startup (${startupPrice} points). <span style='color: magenta'>You have ${startups}</span>`;
	document.getElementById('buyNegotiator').innerHTML = `Click here to buy a negotiator (${negotiatorPrice} points). <span style='color: magenta'> You have ${negotiators}</span>`;
	document.getElementById('clicker').innerHTML = "<img id='clickerImage' src='Hungry Pumkin Face.png' width='${clickerWidth}' height='${clickerHeight}' style='cursor: url(cursors/3.png), auto;' onclick='clickedButton(event);' ondragstart='return false;'>";
	document.getElementById('soundToggleButton').innerHTML = "Turn Sounds Off";
	document.getElementById('growPumkinToggleButton').innerHTML = "Stop Pumkin from Growing";
	document.getElementById('popupToggleButton').innerHTML = "Point Popups On";
	updatePPS();
	if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
	    mobile = true;
	    document.getElementById('mobileToggleButton').innerHTML = "Anti-Lag Mode On";
	} else {
	    mobile = false;
	    document.getElementById('mobileToggleButton').innerHTML = "Anti-Lag Mode Off";
	}
	document.getElementById('menuButtonsO').width = String(document.getElementById('menuButtons').offsetWidth);
	document.getElementById('menuButtonsO').height = String(document.getElementById('menuButtons').offsetHeight);
	document.getElementById('menuOpenButton').click();
}