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

const algoRunning = new Event("running");

const notRunning = new Event("notRunning");

const handleRunning = () => {
  running = true;
  valueNumber.disabled = true;
  valueRange.disabled = true;
};

const handleNotRunning = () => {
  valueNumber.disabled = false;
  valueRange.disabled = false;
  running = false;
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
  if (running) {
    reset = true;
  } else {
    generateElements();
  }
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

  if (!selectedAlgo) {
    return;
  }

  if (running) {
    return;
  }

  switch (selectedAlgo.id) {
    case "selection-sort":
      selectionSort();
      break;
    case "bubble-sort":
      bubbleSort();
      break;
    case "merge-sort":
      mergeSort();
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

const selectionSort = async () => {
  const columns = Array.from(board.children as HTMLCollectionOf<HTMLElement>);
  runButton.dispatchEvent(algoRunning);
  const columnsLength = columns.length;

  for (let i = 0; i < columnsLength; i++) {
    let min = 1000;
    let lastMinIndex;
    for (let j = i; j < columnsLength; j++) {
      if (reset) {
        generateElements();
        reset = false;
        runButton.dispatchEvent(notRunning);
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
  runButton.dispatchEvent(notRunning);
};

const bubbleSort = async () => {
  const columns = Array.from(board.children as HTMLCollectionOf<HTMLElement>);
  runButton.dispatchEvent(algoRunning);
  const columnsLength = columns.length;

  for (let i = 0; i < columnsLength; i++) {
    let sorted = true;
    for (let j = 0; j < columnsLength - i; j++) {
      if (j >= 1) {
        if (reset) {
          generateElements();
          reset = false;
          runButton.dispatchEvent(notRunning);
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
      runButton.dispatchEvent(notRunning);
      return;
    }

    columns[columnsLength - 1 - i].classList.remove("column-active");
    columns[columnsLength - 1 - i].classList.add("column-sorted");
  }
  runButton.dispatchEvent(notRunning);
};

const mergeSort = async () => {
  let columns = Array.from(board.children as HTMLCollectionOf<HTMLElement>);
  runButton.dispatchEvent(algoRunning);
  const merge = async (left: HTMLElement[], right: HTMLElement[]) => {
    const colIndex = (element: HTMLElement) => columns.findIndex((el) => el.clientHeight === element.clientHeight);
    let result: HTMLElement[] = [];
    let leftIndex = 0;
    let rightIndex = 0;
    let startIndex = colIndex(left[0]);
    let combine = [...left, ...right];

    const manageColumns = (lastIndex: number) => {
      let temp = columns[leftIndex + rightIndex + startIndex];
      columns[leftIndex + rightIndex + startIndex] = result[leftIndex + rightIndex];
      columns[lastIndex] = temp;
      board.replaceChildren(...columns);
    };

    combine.forEach((column) => column.classList.add("column-active"));

    if (reset) {
      reset = false;
      generateElements();
      throw new Error("Reset");
    }

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex].clientHeight < right[rightIndex].clientHeight) {
        result.push(left[leftIndex]);
        await wait(PACE);
        let lastIndex = colIndex(left[leftIndex]);
        manageColumns(lastIndex);
        leftIndex++;
      } else {
        await wait(PACE);
        result.push(right[rightIndex]);
        let lastIndex = colIndex(right[rightIndex]);
        manageColumns(lastIndex);
        rightIndex++;
      }
    }

    while (leftIndex < left.length) {
      result.push(left[leftIndex]);
      columns[leftIndex + rightIndex + startIndex] = result[leftIndex + rightIndex];
      board.replaceChildren(...columns);
      leftIndex++;
    }

    while (rightIndex < right.length) {
      result.push(right[rightIndex]);
      columns[leftIndex + rightIndex + startIndex] = result[leftIndex + rightIndex];
      board.replaceChildren(...columns);
      rightIndex++;
    }

    combine.forEach((column) => column.classList.remove("column-active"));

    // handle colors on last iteration
    if (combine.length === columns.length) {
      combine.forEach((column) => column.classList.add("column-sorted"));
      columns = result;
    }

    return result;
  };

  const divide = async (cols: HTMLElement[]): Promise<HTMLElement[]> => {
    if (cols.length <= 1) {
      return cols;
    }

    const mid = Math.floor(cols.length / 2);
    const left = cols.slice(0, mid);
    const right = cols.slice(mid, cols.length);
    await wait(PACE);

    return merge(await divide(left), await divide(right));
  };

  try {
    await divide(columns);
  } finally {
    runButton.dispatchEvent(notRunning);
  }
};

runButton.addEventListener("running", handleRunning);
runButton.addEventListener("notRunning", handleNotRunning);

valueRange.addEventListener("input", (e) => handleValueChange(e, valueNumber));
valueNumber.addEventListener("input", (e) => handleValueChange(e, valueRange));

valueRange.addEventListener("input", generateElements);
valueNumber.addEventListener("input", generateElements);
selectButtons.forEach((button) => button.addEventListener("click", (e) => handleButtonClick(e)));
runButton.addEventListener("click", handleRun);
resetButton.addEventListener("click", handleReset);

main();
