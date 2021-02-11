window.onload = function() {
    const chk = document.getElementById('chk');
    chk.addEventListener('change', () => {
        document.body.classList.toggle('dark');
    });

}

let form = document.getElementById('form')
let btn = document.getElementById('submit-btn')

btn.addEventListener('submit', function(e) {
    e.preventDefault()
    var owner = document.getElementById('owner').value
    var caption = document.getElementById('caption').value
    var url = document.getElementById('url').value

    fetch('https://rudrakshi-xmeme.herokuapp.com/memes/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                owner: owner,
                url: url,
                caption: caption
            })
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        })
})


// const displayMeme = function(data) {
//     data.forEach(meme => {
//         html += `
//         <div class="meme-item">
//         <div class="meme-img">
//             <img src="${meme.url}" alt="meme">
//         </div>
//         <div class="meme-name">
//             <h3>${meme.name}</h3>
//             <p>${meme.caption}</p>
//         </div>
//     </div>
//         `;
//     });
// }



// const memeList = fetch("https://rudrakshi-xmeme.herokuapp.com/memes/")
//     .then((response) => response.json())
//     .then((data) => {
//         displayMeme(data);
//     });