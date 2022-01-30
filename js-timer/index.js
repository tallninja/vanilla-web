let durationInput = document.querySelector("#duration");
let startButton = document.querySelector("#start");
let pauseButton = document.querySelector("#pause");

const circle = document.querySelector("circle");
const perimeter = circle.getAttribute("r") * 2 * Math.PI;

circle.setAttribute("stroke-dasharray", perimeter);

let duration;

let timer = new Timer(durationInput, startButton, pauseButton, {
  onStart: (totalTime) => {
    duration = totalTime;
  },
  onTick: (timeRemaining) => {
    circle.setAttribute(
      "stroke-dashoffset",
      (perimeter * timeRemaining) / duration - perimeter
    );
  },
  onComplete: () => {
    console.log("Timer has finished");
  },
});
