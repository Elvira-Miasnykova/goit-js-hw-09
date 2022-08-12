import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onFormSubmit);

//let positionNumber = 0;
//let delayPr = 0;
//let step = 0;

function onFormSubmit(e) {
  e.preventDefault();

  const formElements = e.target.elements;
  let delayValue = Number(formElements.delay.value);
  const stepValue = Number(formElements.step.value);
  const amountValue = Number(formElements.amount.value);
  //console.log(formElements); 

  for (let i = 0; i <= amountValue; i += 1) {
    //positionNumber += 1;
    createPromise(i + 1, delayValue).then(onFulfilled).catch(onRejected);
    delayValue += stepValue;
  }
}

function onFulfilled(result) {
  Notify.success(`onFulfilled ${result}`);
}

function onRejected(error) {
  Notify.failure(`onRejected ${error}`);
}


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve(`Successed at ${position} with ${delay}`);
      } else {
        // Reject
        reject(`Denied at ${position} with ${delay} delay`);
      }
    }, delay);
  });
}
