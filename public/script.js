document.querySelector("#loader-wrapper").style.visibility = "visible";
document.querySelector("body").style.visibility = "hidden";

window.addEventListener('load', function() {
    setTimeout(function() {
        const loader = document.querySelector("#loader-wrapper");
        loader.classList.add('fade-out');
        
        loader.addEventListener('transitionend', function() {
            loader.style.display = 'none';
            document.querySelector("body").style.visibility = "visible";
        });
    }, 1000);
});

/*
Made by @screenshake
linkedin.com/in/saranshsinha
*/