import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('input#datetime-picker'),
  timerBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let startTime = null;
let timerId = null;
isTimerBtnDisabled(true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    startTime = selectedDates[0].getTime();
    const defaultTime = options.defaultDate.getTime();

    if (startTime < defaultTime) {
      Notify.failure('Please choose a date in the future');
      isTimerBtnDisabled(true);
      return;
    } else {
      isTimerBtnDisabled(false);
    }
  },
};

function timer() {
  isTimerBtnDisabled(true);
  timerId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = startTime - currentTime;
    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    if (deltaTime < 0) {
      clearInterval(timerId);
    } else {
      setTimerInterface(days, hours, minutes, seconds);
    }
  }, 1000);
}

refs.timerBtn.addEventListener('click', onTimerBtn);

function onTimerBtn() {
  timer();
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function setTimerInterface(days, hours, minutes, seconds) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}
function isTimerBtnDisabled(boolean) {
  refs.timerBtn.disabled = boolean;
}

flatpickr('input#datetime-picker', options);
