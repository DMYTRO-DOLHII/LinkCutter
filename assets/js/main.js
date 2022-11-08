const xhr = new XMLHttpRequest();
let result

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
    data = "url=" + input.value
    sendPOST("/", data)

    if (result != null)
        text.innerHTML = "localhost:8081/" + result
    else
        alert("Current path already exists. You can't set up another name for it!")
})

setup.addEventListener("click", function () {

    let value = prompt("Enter a name for your link : ", "")
    if (value == null) {
        alert("Error, a name can not be null")
    } else {
        data = "url=" + input.value + "&name=" + value
        sendPOST("/", data)

        if (result != null || result !== "")
            text.innerHTML = "localhost:8081/" + result
        else
            alert("Current path already exists. You can't set up another name for it!")
    }
})

d = "phrase=" + window.location.pathname.slice(1)
sendPOST("/", d)
if (result != null) {
    window.location.href = r
}


function sendPOST(ULR, data) {
    xhr.open("POST", URL, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = () => { // Call a function when the state changes.
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            result = xhr.responseText.substring(xhr.responseText.indexOf("</html>") + "</html>".length)
        }
    }
    xhr.send(data);
}