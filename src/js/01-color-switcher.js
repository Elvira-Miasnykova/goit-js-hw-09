const refs = {
    buttonStart: document.querySelector("[data-start]"),
    buttonStop: document.querySelector("[data-stop]"),
    body: document.body
};
refs.buttonStart.addEventListener("click", onBtnStartClick);
refs.buttonStop.addEventListener("click", onBtnStopClick);
let timerId = null;
refs.buttonStop.setAttribute("disabled", "disabled");
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function onBtnStartClick() {
    refs.buttonStart.setAttribute("disabled", "disabled");
    refs.buttonStop.removeAttribute("disabled");
    timerId = setInterval(()=>{
        refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}
function onBtnStopClick() {
    clearInterval(timerId);
    refs.buttonStop.setAttribute("disabled", "disabled");
    refs.buttonStart.removeAttribute("disabled");
}
