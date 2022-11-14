// const texts = document.querySelectorAll('p')
// let pageText = ""
// texts.forEach((text, index) => {
//     pageText += ( '\n' + `${index + 1}` + "     " + text.innerText.replace(/\s\s+/g, ' '))
//     text.remove()
// })

// const page = document.createElement('p')
// page.innerText = pageText
// document.body.appendChild(page)

const body = document.body;

const ArrayOfClasses = [
  "codeareaSolidBackground",
  "codeareaMiddle",
  "nav",
  "navTop",
  "navBottom",
  "files",
  "fileTop",
  "fileBottom",
  "codeareaLeft",
  "codeareaRightInfinite",
  "codeareaRight",
  "footer",
  "footerLeft",
  "footerRight",
];

ArrayOfClasses.forEach((clas) => {
  let div = document.createElement("div");
  div.classList.add(`${clas}`, "FakeSite");
  body.appendChild(div);
});

const texts = document.querySelectorAll("p");
let pageText = "PLACEHOLDER ";
texts.forEach((text) => {
  pageText += text.innerText.replace(/\s\s+/g, " ") + " ";
  text.remove();
});

const textArray = pageText.split(" ");
const textSize = textArray.length;

let wordsPerSecond = 4;
let wordIndex = 1;

const word = document.createElement("p");
word.innerText = textArray[1];
body.appendChild(word);

const currentIndex = document.createElement("div");
currentIndex.classList.add("wordIndex", "int");
body.appendChild(currentIndex);

const wordCount = document.createElement("div");
wordCount.classList.add("wordCount", "int");
wordCount.innerText = textSize;
body.appendChild(wordCount);

const IndexTo0 = document.createElement("div");
IndexTo0.classList.add("button", "buttonStart");
IndexTo0.innerText = '"Start"';
body.appendChild(IndexTo0);
IndexTo0.addEventListener("click", () => {
  wordIndex = 1;
  updateWord();
  updateCurrentIndex();
});

const IndexSubtract1000 = document.createElement("div");
IndexSubtract1000.classList.add("button", "buttonNeg1000");
IndexSubtract1000.innerText = "-1000";
body.appendChild(IndexSubtract1000);
IndexSubtract1000.addEventListener("click", () => {
  changeWordIndexBy(-1000);
  updateWord();
  updateCurrentIndex();
});

const IndexSubtract100 = document.createElement("div");
IndexSubtract100.classList.add("button", "buttonNeg100");
IndexSubtract100.innerText = "-100";
body.appendChild(IndexSubtract100);
IndexSubtract100.addEventListener("click", () => {
  changeWordIndexBy(-100);
  updateWord();
  updateCurrentIndex();
});

const IndexSubtract10 = document.createElement("div");
IndexSubtract10.classList.add("button", "buttonNeg10");
IndexSubtract10.innerText = "-10";
body.appendChild(IndexSubtract10);
IndexSubtract10.addEventListener("click", () => {
  changeWordIndexBy(-10);
  updateWord();
  updateCurrentIndex();
});

const IndexAdd10 = document.createElement("div");
IndexAdd10.classList.add("button", "button10");
IndexAdd10.innerText = "+10";
body.appendChild(IndexAdd10);
IndexAdd10.addEventListener("click", () => {
  changeWordIndexBy(10);
  updateWord();
  updateCurrentIndex();
});

const IndexAdd100 = document.createElement("div");
IndexAdd100.classList.add("button", "button100");
IndexAdd100.innerText = "+100";
body.appendChild(IndexAdd100);
IndexAdd100.addEventListener("click", () => {
  changeWordIndexBy(100);
  updateWord();
  updateCurrentIndex();
});

const IndexAdd1000 = document.createElement("div");
IndexAdd1000.classList.add("button", "button1000");
IndexAdd1000.innerText = "+1000";
body.appendChild(IndexAdd1000);
IndexAdd1000.addEventListener("click", () => {
  changeWordIndexBy(1000);
  updateWord();
  updateCurrentIndex();
});

let stopText = true;
let isSpaceDown = false;

body.onkeydown = function (e) {
  if ((e.key == " " || e.code == "Space" || e.keyCode == 32) && !isSpaceDown) {
    isSpaceDown = true;
    stopText = !stopText;
    if (!stopText) {
      asyncCall();
    }
  }
};

body.onkeyup = function () {
  isSpaceDown = false;
};

function newWord(i) {
  word.innerText = textArray[i];
}

function newWord() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${textArray[wordIndex]}`);
      wordIndex++;
    }, (((new_count(textArray[wordIndex - 1]) + checkPunctuation(textArray[wordIndex - 1])) * 0.7) * 1000) / wordsPerSecond);
  });
}

function checkPunctuation(word) {
  if (
    word.endsWith(".") ||
    word.endsWith("!") ||
    word.endsWith("?") ||
    word.endsWith("’") ||
    word.endsWith('"') ||
    word.endsWith("'") ||
    word.endsWith("”")
  )
    return 2;
  if (word.endsWith(",") || word.endsWith(";")) return 1;
  return 0;
}

async function asyncCall() {
  updateCurrentIndex();
  word.innerText = await newWord();

  if (!stopText) {
    asyncCall();
  }
}

function new_count(word) {
  word = word.toLowerCase();
  if (word.length <= 3) {
    return 1;
  }
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
  word = word.replace(/^y/, "");
  if (word.match(/[aeiouy]{1,2}/g) == null) return 0;
  return word.match(/[aeiouy]{1,2}/g).length;
}

function updateWord() {
  word.innerText = textArray[wordIndex];
}

function updateCurrentIndex() {
  currentIndex.innerText = wordIndex - 1;
}

function changeWordIndexBy(num) {
  if (wordIndex + num < textSize && wordIndex + num > 0) {
    wordIndex += num;
  }
}