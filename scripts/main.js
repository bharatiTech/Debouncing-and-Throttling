import DebounceAndThrottling from "./hoc.js";

const debounceInputText = document.getElementById("debounce-input-text");
const throttlingInputText = document.getElementById("throttling-input-text");

let debounceTextSpan = document.getElementById("debouncedText");
let throttlingTextSpan = document.getElementById("throttlingText");

const instance = new DebounceAndThrottling();

const useDebounce = instance.debounce((text) => {
  debounceTextSpan.textContent = text;
}, 500);

debounceInputText.addEventListener("input", (event) => {
  useDebounce(event.target.value);
});

const useThrottling = instance.throttling((text) => {
  console.log({ throttledText: text });
  throttlingTextSpan.textContent = text;
}, 500);

const useLosslessThrottling = instance.losslessTrottling((text) => {
  throttlingTextSpan.textContent = text;
}, 500);

throttlingInputText.addEventListener("input", (event) => {
  // useThrottling(event.target.value);
  useLosslessThrottling(event.target.value);
});

const styledDiv = document.getElementById("changeStyle");
const scrollEvent = () => {
  let coord = window.scrollY.toFixed(0);
  console.log("scroll coordinate: ", window.scrollY);
  styledDiv.setAttribute(
    "style",
    `width: ${coord}px;
     margin-bottom: 20px;
     border: 1px solid #fff;
     padding: 1em;
     background-color: darkgoldenrod;
     position: fixed;
     bottom: 0;`
  );
};
document.addEventListener("scroll", instance.throttling(scrollEvent, 1000));
