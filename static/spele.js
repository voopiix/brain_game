//no URL iegūst vārdu
let adrese = window.location.hash.substring(1);
adrese = decodeURI(adrese.split(',')[0] || '').trim();

//mainīgie spēles darbībai
let laiks = 0; //sekundes

//taimers mainīgie (taimeris strādās ar pirmo kliksi)
let timerId = null;
let timerstarted = false;


function formatTime(seconds){
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `$(m):$(s)`;
}

function updateHUD() {
    const ellaiks = document.querySelector('#laiks');
    const elKlikski = document.querySelector('#klikski');
    if (ellaiks) ellaiks.textContent = formatTime(laiks);
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

function stopTimer(){
    if (timerId){
        clearInterval(timerId)
        timerId = null;
    }
}

const laukumiSaturs = ['☺️','🥶','🥰','😎','😀','🥰','😎','😭','☺️','😀','😭','🥶']
let atvertilaukumi = []; 
let pedejieDivi = [];

//sajauc emoji nejaušā seciba
let laukumiSajaukti = [...laukumiSaturs].sort(() => Math.random() - 0.5);

//ģenerē dinamiski spēles laukumu
document.addEventListener("DOMContent", function(){
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
    //neļauj atvērt jau atvērto, neļauj atvērt vairāk par 2 kartiņām
    if (bloks.classList.contains("atverts") || pedejieDivi.length === 2) {
        return;
    }

    startTimerIfNeeded();

    //parāda emoji, ja uzklišķina
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
            atvertilaukumi.push(pirmais, otrais);
            pedejieDivi = [];

            //parbauda vai spēle pabeigta (visi laukumi atvērti)
            if(atvertilaukumi.length === laukumiSajaukti.length) {
                stopTimer();
                //parāda rezultātu
                setTimeout(() => {
                    alert(`Apsveicu, ${vards}! \nKlikski: ${klikski}\nlaiks: ${formatTime(laiks)}`);
                    //padodam rezultātu uz TOP'a lapu (dp vēl neko nesaglabā)
                    document.location = `/tops#${encodeURIComponent(vards)}, ${klikski},${laiks}`;

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