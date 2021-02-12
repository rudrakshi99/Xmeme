window.addEventListener('DOMContentLoaded', (event) => {

    /* ***************** Dark Mode Toggler ********************* */
    const chk = document.getElementById('chk');
    chk.addEventListener('change', () => {
        document.body.classList.toggle('dark');
    });

    /* *********************** get DOM object ******************** */
    let memeStream = document.getElementById('meme')
    let btn = document.getElementById('submit-btn')
    const searchBar = document.getElementById('searchBar');
    const edit_submit = document.getElementById('edit-submit')
    const del_btn = document.getElementById('delete-btn')
    let memeList = [];

    /* ********************** Search Bar ********************** */
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

    /* ********************** Delete and Patch request ************ */
    memeStream.addEventListener('click', (e) => {
        e.preventDefault();
        let edit_btn = e.target.id == 'edit-btn';
        let delete_btn = e.target.id == "delete-btn";
        let id = e.target.parentElement.dataset.id;
        const parent = e.target.parentElement;

        /* DELETE REQUEST */
        if (delete_btn) {

            fetch(`https://rudrakshi-xmeme.herokuapp.com/memes/${id}/`, {
                    method: "DELETE",
                })
                .then(() => location.reload())
                .catch(err => console.log(err))

        }

        if (edit_btn) {
            let edit_caption = parent.querySelector('p').textContent;
            let edit_url = parent.parentElement.children[0].children[0].getAttribute("src");
            document.getElementById("url-2").value = edit_url;
            document.getElementById("caption-2").value = edit_caption;
        }

        /* PATCH REQUEST */
        edit_submit.addEventListener('click', (e) => {
            var url = document.getElementById("url-2").value;
            var caption = document.getElementById("caption-2").value;
            var name = parent.querySelector('h3').textContent;
            console.log(url, caption, name);
            fetch(`https://rudrakshi-xmeme.herokuapp.com/memes/${id}/`, {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        name: name,
                        url: url,
                        caption: caption,
                    }),
                })
                .then(response => {
                    if (response.status === 400) {
                        alert("Invalid URL ")
                        throw Error(response.status);
                    }
                    return response.json()
                })
                .then(() => location.reload())
        })

    })

    /* Return searched elements */
    const displayCharacters = (characters) => {
        const htmlString = characters
            .map((meme) => {
                return `<div class="meme-item">
                <div class="meme-img">
                    <img src="${meme.url}" alt="meme">
                </div>
                <div class="meme-name" data-id=${meme.id}>
                <button class="btn btn-danger mx-2" data-bs-toggle="modal" id="delete-btn" type="button">Delete</button>
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

    /* POST REQUEST */
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
                /* Error Handling */
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

    /* Display Memes */
    const displayMeme = function(data) {
        data.forEach(meme => {
            memeStream.innerHTML += `
        <div class="meme-item">
        <div class="meme-img">
            <img src="${meme.url}" alt="meme">
        </div>
        <div class="meme-name" data-id=${meme.id}>
        <button class="btn btn-danger mx-2" data-bs-toggle="modal" id="delete-btn" type="button">Delete</button>
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#edit" id="edit-btn" type="button">Edit</button>
            <h3>${meme.name}</h3>
            <p>${meme.caption}</p>
        </div>
    </div>
        `;
        });
    }

    /* GET REQUEST */
    fetch("https://rudrakshi-xmeme.herokuapp.com/memes/")
        .then((response) => response.json())
        .then((data) => {
            memeList = data
            displayMeme(data);
        });
});