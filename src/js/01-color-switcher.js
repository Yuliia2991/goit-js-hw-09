const refs = {
  btnStart: document.querySelector('button[data-start]'),
  btnStop: document.querySelector('button[data-stop]'),
  body: document.body,
};

let intervalId = null;
refs.btnStart.addEventListener('click', onBtnStart);
refs.btnStop.addEventListener('click', onBtnStop);

function onBtnStart() {
  intervalId = setInterval(changeBgColor, 1000);
  isBtnStartDisabled(true);
  isBtnStopDisabled(false);
}

function onBtnStop() {
  clearInterval(intervalId);
  isBtnStartDisabled(false);
  isBtnStopDisabled(true);
}

function isBtnStartDisabled(boolean) {
  refs.btnStart.disabled = boolean;
}
function isBtnStopDisabled(boolean) {
  refs.btnStop.disabled = boolean;
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function changeBgColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}
