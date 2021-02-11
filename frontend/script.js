window.addEventListener('DOMContentLoaded', (event) => {
    const chk = document.getElementById('chk');
    chk.addEventListener('change', () => {
        document.body.classList.toggle('dark');
    });

    let memeStream = document.getElementById('meme')
    let btn = document.getElementById('submit-btn')

    btn.addEventListener("click", (e) => {
        e.preventDefault();
        var name = document.getElementById("owner").value;
        var caption = document.getElementById("caption").value;
        var url = document.getElementById("url").value;

        fetch("https://rudrakshi-xmeme.herokuapp.com/memes/", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    url,
                    caption,
                }),
            })
            .then((response) => {
                if (response.status === 409) {
                    alert("Duplicate data")
                    throw Error(response.status);
                } else if (response.status === 400) {
                    alert("Something went wrong :( ")
                    throw Error(response.status);
                }
                return response.json();
            })
            .then((data) => {
                alert("Meme submitted :)")
                window.location.reload()
            })
            .catch((err) => {
                console.log(err);
            });
    });


    const displayMeme = function(data) {
        data.forEach(meme => {
            memeStream.innerHTML += `
        <div class="meme-item">
        <div class="meme-img">
            <img src="${meme.url}" alt="meme">
        </div>
        <div class="meme-name">
            <h3>${meme.name}</h3>
            <p>${meme.caption}</p>
        </div>
    </div>
        `;
        });
    }

    fetch("https://rudrakshi-xmeme.herokuapp.com/memes/")
        .then((response) => response.json())
        .then((data) => {
            displayMeme(data);
        });
});