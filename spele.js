//no URL iegūst vārdu
let adrese = window.location.hash.substring(1);
adrese = decodeURI(adrese.split(',')[0]);