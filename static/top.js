//top lapas veidošana
//parādīs TOP-5
//ja URL hash piedāvā vārdu, klikšķus, laiku -> lapā parādīs iespēju pievienoties
function formatTime(seconds) {
    seconds = Number(seconds) || 0;
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
}

function parseHash() {
    const raw = window.location.hash.replace('#', '');
    if (!raw) return null;
    const parts = decodeURI(raw).split(',');
    const vards = (parts[0] || '').trim();
    const klikski = Number(parts[1]);
    const laiks = Number(parts[2]);

    if (!vards || Number.isNaN(klikski) || Number.isNaN(laiks))
        return null;
    return {vards, klikski, laiks}
}

async function iegutDatusNoApi(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP kļūda! Statuss: ${response.status}`);
    }
    return await response.json();
}

function iztiritTabulu() {
    const tabula = document.querySelector('.tops');
    //atstāj tikai virsraksta rindu
    tabula.innerHTML = `
        <tr>
            <td>Spēlētājs</td>
            <td>Klikšķi</td>
            <td>Laiks</td>
            <td>Datums</td>
        </tr>`;
}

function aizpilditTabulu(ieraksti) {
    const tabula = document.querySelector('.tops');
    ieraksti.forEach(ieraksts => {
        tabula.innerHTML += `
            <tr>
                <td>${ieraksts.vards}</td>
                <td>${ieraksts.klikski}</td>
                <td>${formatTime(ieraksts.laiks)}</td>
                <td>${ieraksts.datums}</td>
            </tr>`;
    });
}