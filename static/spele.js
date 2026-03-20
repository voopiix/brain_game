//no URL iegūst vārdu
let adrese = window.location.hash.substring(1);
let vards = decodeURI(adrese.split(',')[0] || '').trim();

//mainīgie spēles darbībai
let laiks = 0; //sekundes
let klikski = 0;

//taimera mainīgie (taimeris strādās ar pirmo klikski)
let timerId = null;
let timerStarted = false;

function formatTime(seconds) {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
}

function updateHUD() {
    const elLaiks = document.querySelector('#laiks');
    const elKlikski = document.querySelector('#klikski');
    if (elLaiks) elLaiks.textContent = formatTime(laiks);
    if (elKlikski) elKlikski.textContent = klikski;
}

function startTimerIfNeeded() {
    if (timerStarted) return;
    timerStarted = true;
    timerId = setInterval(() => {
        laiks++;
        updateHUD();
    }, 1000);
}

function stopTimer() {
    if (timerId) {
        clearInterval(timerId);
        timerId = null;
    }
}

const laukumiSaturs = ['😙','🥸','👽','😺','😙','🥶','😇','🥶','🥸','😺','👽','😇'];
let atvertiLaukumi = [];
let pedejieDivi = [];

//sajauc emoji nejaušā secībā
let laukumiSajaukti = [...laukumiSaturs].sort(() => Math.random() - 0.5);

//ģenerē dinamiski spēles laukumu
document.addEventListener("DOMContentLoaded", function() {
    //drošībai: ja nav vārda aizsūta uz sākumu
    if (!vards) {
        window.location.href = '/';
        return;
    }

    let spelesLauks = document.querySelector('.speles_lauk');
    spelesLauks.innerHTML = '';
    laukumiSajaukti.forEach((emoji, index) => {
        let bloks = document.createElement("div");
        bloks.classList.add("bloks");
        bloks.setAttribute("data-index", index);
        bloks.innerText = "";
        bloks.addEventListener("click", function() {
            veiktGajienu(bloks, emoji);
        });
        spelesLauks.appendChild(bloks);
    });

    const elVards = document.querySelector('#vardsHUD');
    if (elVards) elVards.textContent = vards;

    updateHUD();
});

function veiktGajienu(bloks, emoji) {
    //neļauj atvērt jau atvērto, neļauj atvērt vaitāk par 2 kartiņām
    if (bloks.classList.contains("atverts") || pedejieDivi.length === 2) {
        return;
    }

    startTimerIfNeeded();

    //parāda emoji, ja uzklikšķina
    bloks.innerText = emoji;
    bloks.classList.add("atverts");
    klikski++;
    updateHUD();

    //saglabā 2 pēdējās kartiņas
    pedejieDivi.push({bloks, emoji});

    //ja atvērtas 2 kartītes, pārbauda sakritību
    if (pedejieDivi.length === 2) {
        let [pirmais, otrais] = pedejieDivi;

        if (pirmais.emoji === otrais.emoji) {
            atvertiLaukumi.push(pirmais, otrais);
            pedejieDivi = [];

            //parbauda vai spēle pabeigta (visi laukumi atvērti)
            if (atvertiLaukumi.length === laukumiSajaukti.length) {
                stopTimer();
                //parāda rezultātu
                setTimeout(() => {
                    alert(`Apsveicu, ${vards}! \nKlikski: ${klikski}\nLaiks: ${formatTime(laiks)}`);
                    //padodam rezultātu uz TOP'a lapu (db vēl neko nesaglabā)
                    document.location = `/tops#${encodeURIComponent(vards)},${klikski},${laiks}`;

                }, 300);
            }
        } else {
            //ja atvērtie 2 laukumi nav vienādi
            setTimeout(() => {
                pirmais.bloks.innerText = "";
                otrais.bloks.innerText = "";
                pirmais.bloks.classList.remove("atverts");
                otrais.bloks.classList.remove("atverts");
                pedejieDivi = [];
            }, 800);
        }
    }
}