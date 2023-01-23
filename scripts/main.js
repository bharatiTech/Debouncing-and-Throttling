import DebounceAndThrottling from "./hoc.js";

const debounceInputText = document.getElementById("debounce-input-text");
const throttlingInputText = document.getElementById("throttling-input-text");

let debounceTextSpan = document.getElementById("debouncedText");
let throttlingTextSpan = document.getElementById("throttlingText");

const instance = new DebounceAndThrottling();

const useDebounce = instance.debounce((text) => {
  debounceTextSpan.textContent = text;
}, 500);

const useThrottling = instance.throttling((text) => {
  throttlingTextSpan.textContent = text;
}, 500);

debounceInputText.addEventListener("input", (event) => {
  useDebounce(event.target.value);
});

throttlingInputText.addEventListener("input", (event) => {
  useThrottling(event.target.value);
});

const scrollEvent = () => {
  console.log("scroll coordinate: ", window.scrollY);
};

document.addEventListener("scroll", instance.throttling(scrollEvent, 1000));


// const styledDiv = document.getElementById("changeStyle");
// let coord = window.scrollY.toFixed(0);
// styledDiv.setAttribute(
//   "style",
//   `width: ${coord}px;
//    margin-bottom: 20px;
//    border: 1px solid #fff;
//    padding: 1em;
//    background-color: darkgoldenrod;
//    position: fixed;
//    bottom: 0;`
// );
