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

    if (input.value == "" || input.value == null) {
        alert("ULR can't be empty string")
        return
    }

    xhr.open("POST", "/cut", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = () => { // Call a function when the state changes.
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            if (xhr.responseText !== "") {
                text.innerHTML = "localhost:8081/" + xhr.responseText
            } else
                alert("Current url already exists. You can't set up another name for it. You can delete it and then set up.")
        }
    }
    xhr.send(data);
})

setup.addEventListener("click", function () {
    let value = prompt("Enter a name for your link : ", "")

    if (value == null || input.value == "" || input.value == null) {
        alert("ULR or Name can't be empty string")
    } else {
        data = "url=" + input.value + "&name=" + value

        xhr.open("POST", "/set", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = () => { // Call a function when the state changes.
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                if (xhr.responseText !== "")
                    text.innerHTML = "localhost:8081/" + xhr.responseText
                else
                    alert("Current url already exists. You can't set up another name for it. You can delete it and then set up.")
            }
        }
        xhr.send(data);
    }
})

del.addEventListener("click", function () {
    data = "string=" + input.value
    xhr.open("POST", "/delete", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = () => { // Call a function when the state changes.
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            input.value = ""
            copy.innerHTML = ""
        }
    }
    xhr.send(data);
})

d = "phrase=" + window.location.pathname.slice(1)
xhr.open("POST", "/goto", true);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.onreadystatechange = () => { // Call a function when the state changes.
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        if (xhr.responseText !== "") {
            window.location.href = xhr.responseText
        }
    }
}
xhr.send(d);

