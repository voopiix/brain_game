function saktSpeli()
{
    let ievaditsVards = document.querySelector('#vards').value;
    if (ievaditsVards == '')
    {
        alert('Ievadi savu vārdu!');
    }
    else
    {
        window.location = '/spele#' + ievaditsVards;
    }
}