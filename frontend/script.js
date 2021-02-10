window.onload = function() {
    const chk = document.getElementById('chk');
    chk.addEventListener('change', () => {
        document.body.classList.toggle('dark');
    });

}