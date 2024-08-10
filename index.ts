const valueRange = document.querySelector("#value-range")! as HTMLInputElement;
const valueNumber = document.querySelector("#value-number")! as HTMLInputElement;
const board = document.querySelector(".board")! as HTMLInputElement;

const MAXVALUE = 100;

const handleValueChange = (e: Event, element: HTMLInputElement) => {
  const target = e.target as HTMLInputElement;

  if (+target.value > MAXVALUE) {
    target.value = "" + MAXVALUE;
  }

  if (target) {
    element.value = target.value;
  }
};

const generateElements = () => {
  for (let i = 0; i < +valueRange.value; i++) {
    console.log("test");
    const el = document.createElement("div");
    setTimeout(() => {}, 100);
    el.classList.add("test");
    el.style.height = `${10 + i * 4}px`;
    board.appendChild(el);
  }
};

valueRange.addEventListener("input", (e) => handleValueChange(e, valueNumber));
valueNumber.addEventListener("input", (e) => handleValueChange(e, valueRange));

valueRange.addEventListener("input", generateElements);
