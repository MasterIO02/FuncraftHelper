/* W3Data ver 1.31 by W3Schools.com */
/* Modified by MasterIO for FuncraftHelper (https://github.com/MasterIO02/FuncraftHelper) */


includeHTML = function (cb, divToInclude) {
    var z, i, elmnt, file, xhttp
    z = document.getElementsByTagName("*")
    for (i = 0; i < z.length; i++) {
        elmnt = z[i]
        file = elmnt.getAttribute(divToInclude)
        if (file) {
            xhttp = new XMLHttpRequest()
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    elmnt.innerHTML = this.responseText
                    elmnt.removeAttribute(divToInclude)
                    includeHTML(cb)
                }
            }
            xhttp.open("GET", file, true)
            xhttp.send()
            return;
        }
    }
    if (cb) cb()
}