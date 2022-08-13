import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
    //input: document.querySelector('#datatime-picker'),
    btnStart: document.querySelector("[data-start]"),
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    mins: document.querySelector("[data-minutes]"),
    secs: document.querySelector("[data-seconds]")
};
const input = document.querySelector("#datetime-picker");
refs.btnStart.setAttribute("disabled", "disabled");
let intervalId = null;
let targetTime = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose (selectedDates) {
        //console.log(selectedDates[0]);
        targetTime = selectedDates[0];
        if (selectedDates[0] <= options.defaultDate) {
            //window.alert("Please choose a date in the future");
            Notify.warning("Please choose a date in the future");
            refs.btnStart.setAttribute("disabled", "disabled");
        } else refs.btnStart.removeAttribute("disabled");
    //input.disabled = false;
    }
};
refs.btnStart.addEventListener("click", onBtnStartClick );
function onBtnStartClick() {
    refs.btnStart.setAttribute("disabled", "disabled");
    input.setAttribute("disabled", "disabled");
   
    const futureTime = targetTime.getTime();
    intervalId = setInterval(()=>{
        const currentTime = Date.now();
        const delta = futureTime - currentTime;
        convertMs(delta);
        if (delta <= 1000) {
            clearInterval(intervalId);
            refs.btnStart.removeAttribute("disabled");
            input.removeAttribute("disabled");
            return;
        }
    }, 1000);
    
}
flatpickr("#datetime-picker", options);
function addZero(value) {
    return String(value).padStart(2, "0");
}
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    // Remaining days
    const days = addZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addZero(Math.floor(ms % day / hour));
    // Remaining minutes
    const minutes = addZero(Math.floor(ms % day % hour / minute));
    // Remaining seconds
    const seconds = addZero(Math.floor(ms % day % hour % minute / second));
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.mins.textContent = minutes;
    refs.secs.textContent = seconds;
    // return {
    //     days,
    //     hours,
    //     minutes,
    //     seconds
    // };
}