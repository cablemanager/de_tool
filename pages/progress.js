let epoch;

function findEpoch(ms) {
    if (!epoch) {
        epoch = ms;
        startTimer();
    }
}

function startTimer() {
    let time = document.getElementById("time");
    setInterval(() => {
        let currTime = Date.now() - epoch;
        time.innerHTML = beautify(currTime);
    }, 6);
}

function beautify(ms) {
    let s = Math.floor(ms / 1000) % 60;
    let m = Math.floor(ms / 60000) % 60;
    return m.toString().padStart(2,0) + ':' + s.toString().padStart(2, 0); 
}
let cum = false;
let bar = document.getElementById("h3_prog");
let i = 0;
let x = setInterval(() => {
    bar.style.width = i.toString() + '%';
    i += 0.1;
    console.log(i);
    if(  Math.floor(i) === 100) {
        clearInterval(x);
    }
}, 1);