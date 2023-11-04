document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.querySelector('.dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    dropdown.addEventListener('click', function () {
        dropdownMenu.style.display = 'block';
    });

    document.addEventListener('click', function (event) {
        if (!event.target.closest('.dropdown')) {
            dropdownMenu.style.display = 'none';
        }
    });
});

window.onload = function() {

    fetch(/*'https://api.npoint.io/beecbe80379acd9a45cb')*/'res/json/posts.json')
        .then((response) => response.json())
        .then(json => {
            console.log(json);

    for (const post of json) {
        let messages = document.createElement("DIV");
        messages.className = "messages"

        let messageWrapper = document.createElement("DIV");
        messageWrapper.className = "message-wrapper";

        let messageHeader = document.createElement("DIV");
        messageHeader.className = "message-header";

        let messageBody = document.createElement("DIV");
        messageBody.className = "message-body";

        const profilePic = document.createElement("P");
        profilePic.className = "left";

        const img1 = document.createElement("IMG");
        img1.src = post.profilePicture;
        img1.height = 20;
        img1.width = 20;
        profilePic.appendChild(img1);

        const date = document.createElement("P");
        date.className = "right"
        date.innerText = post.date;

        messageHeader.appendChild(profilePic);
        messageHeader.appendChild(date);

        if (post.picture !== "") {
            const img2 = document.createElement("IMG");
            img2.src = post.picture;
            messageBody.appendChild(img2);
        }

        const message = document.createElement("P");
        message.innerText = post.text
        messageBody.appendChild(message)

        const likeButton = document.createElement("DIV");

        if (post.liked) {
            likeButton.className = "like-button-liked"
        } else {
            likeButton.className = "like-button-unliked"
        }

        likeButton.addEventListener('click', function () {
            if (likeButton.className === "like-button-liked"){
                likeButton.className = "like-button-unliked"
                post.liked=false
            } else {
                likeButton.className = "like-button-liked"
                post.liked=true
            }
        });

        const button = document.createElement("BUTTON");
        button.type = "button"
        likeButton.appendChild(button)
        messageBody.appendChild(likeButton);

        messageWrapper.appendChild(messageHeader);
        messageWrapper.appendChild(messageBody);
        messages.appendChild(messageWrapper);

        document.body.appendChild(messages)
    }
})
        .catch(err => {
            let errDiv = document.createElement("div");
            errDiv.className = 'post';
            errDiv.innerText = err;
            document.body.appendChild(errDiv);
        })
}