window.addEventListener('DOMContentLoaded', (event) => {
    const chk = document.getElementById('chk');
    chk.addEventListener('change', () => {
        document.body.classList.toggle('dark');
    });


    let memeStream = document.getElementById('meme')
    let btn = document.getElementById('submit-btn')
    const searchBar = document.getElementById('searchBar');
    let memeList = [];

    searchBar.addEventListener('keyup', (e) => {
        const searchString = e.target.value.toLowerCase();
        const filteredCharacters = memeList.filter((meme) => {
            return (
                meme.name.toLowerCase().includes(searchString) ||
                meme.caption.toLowerCase().includes(searchString)
            );
        });
        displayCharacters(filteredCharacters);
    });


    memeStream.addEventListener('click', (e) => {
        e.preventDefault();
        let edit_btn = e.target.id == 'edit-btn';
        let id = e.target.parentElement.dataset.id;
        const parent = e.target.parentElement;
        console.log(parent);
        let edit_caption = parent.querySelector("caption").textContent;
        let edit_url = parent.querySelector("url").textContent;
        // console.log(edit_caption, edit_url);

    })


    const displayCharacters = (characters) => {
        const htmlString = characters
            .map((meme) => {
                return `<div class="meme-item">
                <div class="meme-img">
                    <img src="${meme.url}" alt="meme">
                </div>
                <div class="meme-name" data-id=${meme.id}>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#edit" id="edit-btn" type="button">Edit</button>
                    <h3>${meme.name}</h3>
                    <p>${meme.caption}</p>
                </div>
            </div>
                `;
            })
            .join('');
        memeStream.innerHTML = htmlString;
    };


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
        <div class="meme-name" data-id=${meme.id}>
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#edit" id="edit-btn" type="button">Edit</button>
            <h3>${meme.name}</h3>
            <p>${meme.caption}</p>
        </div>
    </div>
        `;
        });
    }

    fetch("https://rudrakshi-xmeme.herokuapp.com/memes/")
        .then((response) => {

            return response.json();
        })
        .then((data) => {
            memeList = data
            displayMeme(data);
        });
});