function clicked() {

let minutes = parseInt(document.getElementById("mins").value) * 60000;
let seconds = parseInt(document.getElementById("secs").value) * 1000;
console.log(minutes, seconds);
dataGraph(minutes + seconds);
}

function agclicked() {
    document.getElementById("agtimes").innerHTML = '';
    ag_ms = (parseInt(document.getElementById("agsecs").value) * 1000) + (parseInt(document.getElementById("agmins").value) * 60000);
    while (ag_ms < 1200000) {
        let new_ag = document.createElement("p");
        new_ag.classList.add("ag_time");
        new_ag.innerHTML = beautify(ag_ms) + ' ' + beautify(ag_ms + 45000);
        document.getElementById("agtimes").appendChild(new_ag);
        ag_ms += 105000;
    }
}

function TF(ms) {
    let gums = document.getElementById("gums");
    gums.style.display = 'flex';
    dataGraph(ms);
}

var bows = ['wolf-data', 'lightning-data', 'void-data', 'fire-data']

firstTP = 5000;

var bowInfo = {
    'wolf-data':[
        ['Wolf','Arrow Grabbed','Jumped','Landed',
        'Console, Skull, TP', 'Spawn Wolf', 'Courtyard', 'Be at DT',
        'Grab Bone', 'Respawn Wolf', 'Grab 3rd bone', 'Grab Arrow',
        'Place Arrow', 'Run to TP', 'First TP'],
        
        [0, 33000, 51000, 55000,
        65000 + firstTP, 77000 + firstTP, 84000 + firstTP, 170000 + firstTP,
        205000 + firstTP, 225000 + firstTP, 270000 + firstTP, 285000 + firstTP,
        290000 + firstTP, 340000 + firstTP, 349000 + firstTP
        ]
    ],
    'lightning-data':[
        ['Lightning', 'First Predict', 'Shoot Void Wall', 'Last Bonfire',
        'TP', 'Landing Spawn', 'Landing Courtyard', 'Jump From Courtyard',
        'Land DT', 'Hit First Bonfire', 'Crackle', 'Grab Arrow',
        'Place Arrow', '20 Finished', 'Grab Bow', 'First TP'],
        
        [0, 15000, 35000 - 5000, 40000 - 5000,
        65000 + firstTP, 100000 + firstTP, 113000 + firstTP, 116000 + firstTP,
        119000 + firstTP, 126000 + firstTP, 135000 + firstTP, 154000 + firstTP,
        170000 + firstTP, 225000 + firstTP, 233000 + firstTP, 233000 + firstTP + 120000 - 4000
        ]
    ],
    'void-data':[
        ['Void', 'TP', 'Arrived', 'Lever ABH',
         'Grabs arrow', 'In void room', 'Knife Kill', 'Courtyard Skull',
         'Jump', 'Land', 'DT Skull', 'SAMS Skull',
         'Feed fire at DR', 'Jump to RP', 'Be in UC', 'Activate Wisps',
         'Leave UC', 'Finish crawlers', 'Check Symbols', 'Jump', 'First TP'
    ],
        [0, -4000, 1000, 13000,
        31000, 46000, 61000, 71000,
        76000, 78000, 83000, 128000 + firstTP,
        140000 + firstTP, 150000 + firstTP, 170000 + firstTP, 225000 + firstTP,
        245000 + firstTP, 280000 + firstTP, 295000 + firstTP, 339000 + firstTP,
        349000 + firstTP
    ]
    ],
    'fire-data':[
        ['Fire', 'Finished Paintings', 'Grab Arrow','Shot Rocket',
        '3 in 1', 'Go in clocktower', 'Death Ray Circle', 'Leave for DT',
        'Be at DT', 'Start DT Circle', 'Finish DT Circle', 'Interact Clocktower',
        'Dependant on Circle: Help Void or Rush Fireplace', 'Grab arrow at Bastion and jump', 'First TP'
    ],
        [0, 25000, 35000, 51000,
        71000, 100000 + firstTP, 120000 + firstTP, 160000 + firstTP,
        170000 + firstTP, 200000 + firstTP, 225000 + firstTP, 245000 + firstTP,
        250000 + firstTP, 339000 + firstTP, 349000 + firstTP 
    ]
    ]
}

// 3:17
// 9 Seconds

function dataGraph(ms) {
    for (let j = 0; j < bows.length; j++) {
        bow = bows[j]; 
        splitTime = bowInfo[bow][1];
        splitName = bowInfo[bow][0]
        let Data = document.getElementById(bow);
        Data.innerHTML = '';
        for (let i = 0; i < splitName.length; i++) {
            let newSplit = document.createElement("div");
            newSplit.classList.add("splits");
            let newTime = document.createElement("p");
            newTime.innerHTML = beautify(splitTime[i] + ms);
            let newName = document.createElement("p");
            newName.innerHTML = splitName[i];
            newName.classList.add("split-name");
            newSplit.appendChild(newTime);
            newSplit.appendChild(newName);
            console.log(Data);
            Data.appendChild(newSplit);
    }
    }
}

function beautify(ms) {
    let cent = Math.floor(((ms % 1000) / 10));
    let sec = Math.floor(((ms % 60000) / 1000));
    let min = Math.floor((ms % (60000 * 60)) / 60000);
    return min.toString().padStart(2, 0) + ':' + sec.toString().padStart(2, 0) + ':' + cent.toString().padStart(2, 0);
}

let split_names = ['Bow','Crackle','First TP', 'Second TP', 'Keeper', 'Boss Enter', 'Done'];
let split_no = 0;
let epoch;
let started;


document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        started = true;
        epoch = Date.now();
        timer(Date.now());
    } else if (event.code === 'KeyS' && split_no < split_names.length) {
        let split_time = document.getElementById("time").innerHTML;
        let split_holder = document.getElementById("splits");
        let newSplit = document.createElement("p")
        newSplit.innerHTML = split_time + ' - ' + split_names[split_no];
        split_holder.appendChild(newSplit);
        split_no += 1;
    } else if (started && event.code === 'KeyT') {
        teleport();
    }
})

function teleport()
 {
    let tp_time = document.getElementById("tp_time");
    tp_time.innerHTML = beautify(Date.now() - epoch + 60000);
 }
document.addEventListener('keyup', event => {
    if (started && event.code === 'KeyR') {
        rocket(Date.now() - epoch);
    }
})

document.addEventListener('keyup', event => {
    if (started && event.code === 'KeyA') {
        antigrav(Date.now() - epoch);
    }
})

function antigrav(ms) {
    let ag = document.getElementById("agtimes");
    agtimes.innerHTML = '';
    for (let i = 0; ms < 60000 * 20; i++) {
        let agT = document.createElement("h3")
        agT.innerHTML = beautify(ms);
        ag.appendChild(agT);
        ms += 105000;
    }
}

function rocket(zero) {
    let div = document.getElementById("rTrigger");
    let rTrigger = zero + 170000;
    div.innerHTML = beautify(rTrigger);
}

document.addEventListener('keyup', event => {
    if (event.code === 'KeyB' && interval) {
        let gums = document.getElementById("gums");
        gums.style.display = 'flex';
        let time = document.getElementById("time");
        let currTime = time.innerHTML;
        let times = currTime.split(':')
        let cent = parseInt(times[2]);
        let sec = parseInt(times[1]);
        let min = parseInt(times[0]);
        let ms = (cent * 10) + (sec * 1000) + (min * 60000);
        dataGraph(ms);
    }
  })


let interval;
function timer(start) {
    let time = document.getElementById("time");
    clearInterval(interval);
    interval = setInterval(() => {
            let ms = Date.now() - start;
            ellapsed = ms;
            let cent = Math.floor(((ms % 1000) / 10));
            let sec = Math.floor(((ms % 60000) / 1000));
            let min = Math.floor((ms % (60000 * 60)) / 60000);
            time.innerHTML = min.toString().padStart(2, 0) + ':' + sec.toString().padStart(2, 0) + ':' + cent.toString().padStart(2, 0);
    }, 10);
}

console.log('running');



// Wolf:
// 0:00 Bow
// 0:35 Arrow
// 0:51 Jump
// 0:54 Land
// 0:58 Skull
// 1:01 Jumps
// 1:04 Lands
// 1:15 Wolf
// 1:22 Courtyard > (4:37)

// Lightning
// 0:00 Bow
// 1:10 First TP
// 1:15 Arrived
// 

// Fire
// 0:00 Bow
// 0:26 Paintings Done (12+13 for painting duration)
// 0:51 Hit Rocket
// 

// Void
//-0:04 TP
// 0:01 At Rocket
// 0:01 Rocket Triggered
// 0:15 In Spawn
// 22.5
//
//
//
//

//28 + 12 + 20