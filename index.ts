const valueRange = document.querySelector("#value-range")! as HTMLInputElement;
const valueNumber = document.querySelector("#value-number")! as HTMLInputElement;
const board = document.querySelector(".board")! as HTMLInputElement;
const selectButtons = document.querySelectorAll(".algo")! as NodeListOf<HTMLButtonElement>;
const runButton = document.querySelector(".run")! as HTMLButtonElement;

const MAXVALUE = 100;

//init
const main = () => {
  generateElements();
};

const handleValueChange = (e: Event, element: HTMLInputElement) => {
  const target = e.target as HTMLInputElement;

  if (+target.value > MAXVALUE) {
    target.value = "" + MAXVALUE;
  }

  if (target) {
    element.value = target.value;
  }
};

const handleButtonClick = (e: Event) => {
  const target = e.target as HTMLInputElement;

  // one button can has selected class
  selectButtons.forEach((button) => {
    if (button.classList.contains("selected") && button.id !== target.id) {
      button.classList.remove("selected");
    }
  });

  target.classList.toggle("selected");
};

const generateElements = () => {
  board.replaceChildren();
  let elements: Array<HTMLDivElement> = [];

  for (let i = 0; i < +valueRange.value; i++) {
    const el = document.createElement("div");
    el.classList.add("column");
    el.style.height = `${10 + i * 4}px`;
    elements.push(el);
  }

  // shuffle
  // elements.sort(() => Math.random() - 0.5);

  // Durstenfeld shuffle
  for (let i = elements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [elements[i], elements[j]] = [elements[j], elements[i]];
  }

  for (const node of elements) {
    board.appendChild(node);
  }
};

const handleRun = () => {
  // let selectedAlgo = "";
  // selectButtons.forEach((button) => {
  //   if (button.classList.contains("selected")) {
  //     console.log(button.id);
  //     selectedAlgo = button.id;
  //   }
  // });

  // get type
  const selectedAlgo = document.querySelector(".selected");
  // get value
  const selectedValue = +valueRange.value;

  if (!selectedAlgo) {
    return;
  }

  switch (selectedAlgo.id) {
    case "selection-sort":
      selectionSort(selectedValue);
      break;
    default:
      return;
  }
};

const wait = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const selectionSort = async (value: number) => {
  // console.log(value);
  const columns = board.children as HTMLCollectionOf<HTMLElement>;
  // console.log(columns.length);
  for (let i = 0; i < columns.length; i++) {
    console.log(i, "iii");
    let min = 1000;
    let lastMinIndex;
    for (let j = i; j < columns.length; j++) {
      console.log(j, "j");
      await wait(1000);

      if (j > i) {
        const prevColumn = j - 1;
        columns[prevColumn].classList.remove("column-active");
        const value = +columns[prevColumn].style.height.replace("px", "");

        if (value < min) {
          //remove class form last one
          if (lastMinIndex !== undefined) {
            columns[lastMinIndex].classList.remove("column-min");
          }
          min = value;
          lastMinIndex = prevColumn;
          columns[prevColumn].classList.add("column-min");
          // columns[prevColumn];
        }
      }
      columns[j].classList.add("column-active");
    }
    await wait(100);
    columns[columns.length - 1].classList.remove("column-active");

    if (lastMinIndex !== undefined) {
      columns[lastMinIndex].classList.remove("column-min");
      columns[lastMinIndex].classList.add("column-sorted");
      columns[lastMinIndex].style.order = `${-(columns.length - i)}`;
    }
  }
};

valueRange.addEventListener("input", (e) => handleValueChange(e, valueNumber));
valueNumber.addEventListener("input", (e) => handleValueChange(e, valueRange));

valueRange.addEventListener("input", generateElements);
valueNumber.addEventListener("input", generateElements);
selectButtons.forEach((button) => button.addEventListener("click", (e) => handleButtonClick(e)));
runButton.addEventListener("click", handleRun);

main();
