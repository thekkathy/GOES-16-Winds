const { clearInterval } = require("timers");

function displayImage(t = '1401', channel = 'ClearSky8') {
    document.getElementById('img-display').src = `images/20210117_${t}_g16_CONUS_${channel}.gif`;
    document.getElementById('img-display').alt = `GOES-16 Winds, January 17th, ${t}, ${channel}`;
}

function onClearSkyChange(time = document.getElementById("time-select").value) {
    clearSkyChannel = document.getElementById("clear-sky-select").value;
    displayImage(time, clearSkyChannel);
}

function onTimeChange(clearSkyChannel = document.getElementById("clear-sky-select").value) {
    time = document.getElementById("time-select").value;
    displayImage(time, clearSkyChannel);
}

//Animations
var animationRef;

function onAnimate(time = document.getElementById("time-select").value) {
    var timeInt = parseInt(time) - 15;
    function frame() {
        timeInt += 15;
        displayImage(timeInt.toString(), document.getElementById("clear-sky-select").value);

        if (document.getElementById("loop").checked) {
            if (timeInt >= 1446) {
                timeInt = 1401 - 15;
            }
            setTimeout(() => {
                window.requestAnimationFrame(frame);
            }, 250);
        }
        else {
            if (timeInt < 1446) {
                setTimeout(() => {
                    window.requestAnimationFrame(frame);
                }, 250);
            }
        }
    }
    animationRef = requestAnimationFrame(frame);
}

function onStop(){
    location.reload();
}