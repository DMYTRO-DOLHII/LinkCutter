let input = document.getElementById("url")
let cut = document.getElementById("cut")
let setup = document.getElementById("set-up")

cut.addEventListener("click", function(e) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", '/', true);

    data = "url=" + input.value
    
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xhr.onreadystatechange = () => { // Call a function when the state changes.
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            res = xhr.responseText.substring(xhr.responseText.indexOf("</html>") + "</html>".length)
            console.log(res)
        }
    }
    xhr.send("url=https://www.coursera.org/learn/golang-functions-methods/lecture/ueDom/m3-1-1-classes-and-encapsulation");
})


var xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", window.location.pathname, false); // false for synchronous request
xmlHttp.send(null);
res = xmlHttp.responseText.substring(xmlHttp.responseText.indexOf("</html>") + "</html>".length)
console.log(res)