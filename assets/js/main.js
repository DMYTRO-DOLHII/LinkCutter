// const xhr = new XMLHttpRequest();
// xhr.open("POST", '/', true);

// xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

// xhr.onreadystatechange = () => { // Call a function when the state changes.
//     if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
//         res = xhr.responseText.substring(xhr.responseText.indexOf("</html>") + "</html>".length)
//         console.log(res)
//     }
// }
// xhr.send("url=https://www.coursera.org/learn/golang-functions-methods/lecture/ueDom/m3-1-1-classes-and-encapsulation");

var xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", window.location.pathname, false); // false for synchronous request
xmlHttp.send(null);
console.log(xmlHttp.responseText)