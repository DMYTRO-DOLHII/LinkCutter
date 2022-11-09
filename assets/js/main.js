const xhr = new XMLHttpRequest();

let input = document.getElementById("url")
let cut = document.getElementById("cut")
let setup = document.getElementById("set-up")
let copy = document.getElementById("clipboard")
let del = document.getElementById("delete")
let text = document.getElementById("copy-text")



copy.addEventListener("click", function () {
    try {
        navigator.clipboard.writeText(text.innerHTML);
    } catch (err) {
        console.error('Failed to copy: ', err);
    }

    copy.style.border = "4px solid rgb(29, 207, 41)"
    text.style.color = "rgb(29, 207, 41)"

    setTimeout(function () {
        copy.style.border = "2px solid white"
        text.style.color = "white"
    }, 3000)
})


cut.addEventListener("click", function () {
    data = "url=" + input.value

    xhr.open("POST", URL, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = () => { // Call a function when the state changes.
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            result = xhr.responseText.substring(xhr.responseText.indexOf("</html>") + "</html>".length)

            if (result !== "")
                text.innerHTML = "localhost:8081/" + result
            else
                alert("Current url already exists. You can't set up another name for it. You can delete it and then set up.")
        }
    }
    xhr.send(data);
})

setup.addEventListener("click", function () {

    let value = prompt("Enter a name for your link : ", "")
    if (value == null) {
        alert("Error, a name can not be null")
    } else {
        data = "url=" + input.value + "&name=" + value

        xhr.open("POST", URL, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = () => { // Call a function when the state changes.
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                result = xhr.responseText.substring(xhr.responseText.indexOf("</html>") + "</html>".length)

                if (result !== "")
                    text.innerHTML = "localhost:8081/" + result
                else
                    alert("Current url already exists. You can't set up another name for it. You can delete it and then set up.")
            }
        }
        xhr.send(data);
    }
})

del.addEventListener("click", function(){
    
})

d = "phrase=" + window.location.pathname.slice(1)
xhr.open("POST", URL, true);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.onreadystatechange = () => { // Call a function when the state changes.
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        let result = xhr.responseText.substring(xhr.responseText.indexOf("</html>") + "</html>".length)

        console.log(result)
        console.log(typeof result)

        if (result !== "") {
            window.location.href = result
        }
    }
}
xhr.send(d);


// function sendPOST(ULR, data) {
//     xhr.open("POST", URL, true);
//     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//     xhr.onreadystatechange = () => { // Call a function when the state changes.
//         if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
//             result = xhr.responseText.substring(xhr.responseText.indexOf("</html>") + "</html>".length)
//         }
//     }
//     xhr.send(data);
// }