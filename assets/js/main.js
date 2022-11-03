let input = document.getElementById("url")
let cut = document.getElementById("cut")
let setup = document.getElementById("set-up")
let copy = document.getElementById("clipboard")
let text = document.getElementById("copy-text")


copy.addEventListener("click", function () {
    try {
        navigator.clipboard.writeText(text.innerHTML);
    } catch (err) {
        console.error('Failed to copy: ', err);
    }

    copy.style.border = "2px solid rgb(29, 207, 41)"
    text.style.color = "rgb(29, 207, 41)"


    setTimeout(function () {
        copy.style.border = "2px solid white"
        text.style.color = "white"
    }, 3000)
})


cut.addEventListener("click", function () {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", '/', true);

    data = "url=" + input.value

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = () => { // Call a function when the state changes.
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            res = xhr.responseText.substring(xhr.responseText.indexOf("</html>") + "</html>".length)
            text.innerHTML = "localhost:8081/" + res
        }
    }
    xhr.send(data);
})

setup.addEventListener("click", function () {

    let value = prompt("Enter a name for your link : ", "")
    if (value == null) {
        alert("Error, a name can not be null")
    } else {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", '/', true);

        data = "url=" + input.value + "&name=" + value

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = () => { // Call a function when the state changes.
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                res = xhr.responseText.substring(xhr.responseText.indexOf("</html>") + "</html>".length)
                if (res === "") {
                    alert("Error! Current path already exists")
                } else {
                    text.innerHTML = "localhost:8081/" + value
                }
            }
        }
        xhr.send(data);
    }
})

const xhr = new XMLHttpRequest();
xhr.open("POST", '/', true);

data = "phrase=" + window.location.pathname.slice(1)
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.onreadystatechange = () => { // Call a function when the state changes.
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        res = xhr.responseText.substring(xhr.responseText.indexOf("</html>") + "</html>".length)
        if (res !== "") {
            window.location.href = res
        }
    }
}
xhr.send(data);

// var xmlHttp = new XMLHttpRequest();
// xmlHttp.open("GET", window.location.pathname, false); // false for synchronous request
// console.log(window.location.pathname)
// xmlHttp.send(null);
// res = xmlHttp.responseText.substring(xmlHttp.responseText.indexOf("</html>") + "</html>".length)
// console.log(res)