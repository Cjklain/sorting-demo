const valueRange = document.querySelector("#value-range")! as HTMLInputElement;
const valueNumber = document.querySelector("#value-number")! as HTMLInputElement;
const board = document.querySelector(".board")! as HTMLInputElement;
const selectButtons = document.querySelectorAll(".algo")! as NodeListOf<HTMLButtonElement>;
const runButton = document.querySelector(".run")! as HTMLButtonElement;
const resetButton = document.querySelector(".reset")! as HTMLButtonElement;

const MAXVALUE = 100;
const PACE = 50;
let reset = false;
let running = false;
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

const handleReset = () => {
  reset = true;
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
  // get type
  const selectedAlgo = document.querySelector(".selected");
  // get value
  const selectedValue = +valueRange.value;

  if (!selectedAlgo) {
    return;
  }

  if (running) {
    return;
  }

  switch (selectedAlgo.id) {
    case "selection-sort":
      selectionSort(selectedValue);
      break;
    case "bubble-sort":
      bubbleSort(selectedValue);
      break;
    case "merge-sort":
      mergeSort(selectedValue);
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
  const columns = Array.from(board.children as HTMLCollectionOf<HTMLElement>);
  running = true;
  const columnsLength = columns.length;

  for (let i = 0; i < columnsLength; i++) {
    let min = 1000;
    let lastMinIndex;
    for (let j = i; j < columnsLength; j++) {
      if (reset) {
        generateElements();
        reset = false;
        running = false;
        return;
      }

      await wait(PACE);

      if (j >= 1) {
        columns[j - 1].classList.remove("column-active");
      }
      const value = +columns[j].style.height.replace("px", "");
      if (value < min) {
        //remove class form last one
        if (lastMinIndex !== undefined) {
          columns[lastMinIndex].classList.remove("column-min");
        }

        min = value;
        lastMinIndex = j;
        columns[j].classList.add("column-min");
      }
      columns[j].classList.add("column-active");
    }
    await wait(PACE);
    columns[columnsLength - 1].classList.remove("column-active");
    if (lastMinIndex !== undefined) {
      columns[lastMinIndex].classList.remove("column-min");
      columns[lastMinIndex].classList.add("column-sorted");
      // swap place in array
      [columns[i], columns[lastMinIndex]] = [columns[lastMinIndex], columns[i]];
    }
    board.replaceChildren(...columns);
  }
  running = false;
};

const bubbleSort = async (value: number) => {
  const columns = Array.from(board.children as HTMLCollectionOf<HTMLElement>);
  running = true;
  const columnsLength = columns.length;

  for (let i = 0; i < columnsLength; i++) {
    let sorted = true;
    for (let j = 0; j < columnsLength - i; j++) {
      if (j >= 1) {
        if (reset) {
          generateElements();
          reset = false;
          running = false;
          return;
        }

        columns[j - 1].classList.add("column-active");
        await wait(50);

        const prevValue = +columns[j - 1].style.height.replace("px", "");
        const value = +columns[j].style.height.replace("px", "");

        if (prevValue > value) {
          sorted = false;
          [columns[j - 1], columns[j]] = [columns[j], columns[j - 1]];
          board.replaceChildren(...columns);
        }
        columns[j - 1].classList.remove("column-active");
      }
    }

    if (sorted) {
      columns.forEach((column) => column.classList.add("column-sorted"));
      running = false;
      return;
    }

    columns[columnsLength - 1 - i].classList.remove("column-active");
    columns[columnsLength - 1 - i].classList.add("column-sorted");
  }
  running = false;
};

const mergeSort = async (value: number) => {
  const columns = Array.from(board.children as HTMLCollectionOf<HTMLElement>);
  running = true;
  // const columnsLength = columns.length;

  const divide = (columns: HTMLElement[]) => {
    // exit condition
    // console.log(columnsLength);
    // console.log(Math.floor(columnsLength / 2));
    const columnsLength = columns.length;
    const mid = Math.floor(columnsLength / 2);
    const left = columns.slice(0, mid);
    const right = columns.slice(mid, columnsLength);
    merge(left);
    console.log(left);
    console.log(right);
    // divide(left);
  };

  const merge = (columns: HTMLElement[]) => {
    let sorted = [];
    //more then 2?
    if (columns.length > 2) {
      divide(columns);
    }

    if (columns.length === 1) {
      return [columns];
    }

    let heightZero = +columns[0].style.height.replace("px", "");
    let heightOne = +columns[1].style.height.replace("px", "");
    console.log(heightZero, heightOne);
    if (heightZero > heightOne) {
      return [columns[1], columns[0]];
    }
    // if
    // dive
    // merge
  };

  divide(columns);
  running = false;
  console.log("aszxczxcd");
};

valueRange.addEventListener("input", (e) => handleValueChange(e, valueNumber));
valueNumber.addEventListener("input", (e) => handleValueChange(e, valueRange));

valueRange.addEventListener("input", generateElements);
valueNumber.addEventListener("input", generateElements);
selectButtons.forEach((button) => button.addEventListener("click", (e) => handleButtonClick(e)));
runButton.addEventListener("click", handleRun);
resetButton.addEventListener("click", handleReset);

main();
