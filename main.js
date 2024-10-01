const textInput = document.getElementById('textInput');
const fontSelect = document.getElementById('fontSelect');
const fontSizeRange = document.getElementById('fontSizeRange');
const colorPicker = document.getElementById('colorPicker');
const output = document.getElementById('output');
const undoButton = document.getElementById('undoButton');
const redoButton = document.getElementById('redoButton');
const boldButton = document.getElementById('boldButton');
const italicButton = document.getElementById('italicButton'); // Italic Button
const underlineButton = document.getElementById('underlineButton'); // Underline Button

let history = [];
let currentIndex = -1;
let isBold = false; // Track bold state
let isItalic = false; // Track italic state
let isUnderlined = false; // Track underline state

function updateOutput() {
    const selectedFont = fontSelect.value;
    const selectedFontSize = fontSizeRange.value + 'px';
    const selectedColor = colorPicker.value;

    output.style.fontFamily = selectedFont;
    output.style.fontSize = selectedFontSize;
    output.style.color = selectedColor;
    output.style.fontWeight = isBold ? 'bold' : 'normal'; // Set bold style
    output.style.fontStyle = isItalic ? 'italic' : 'normal'; // Set italic style
    output.style.textDecoration = isUnderlined ? 'underline' : 'none'; // Set underline style
    output.innerText = textInput.value || 'Your edited text will appear here..';
    saveState();
    updateButtons();
}

function saveState() {
    const state = {
        text: textInput.value,
        font: fontSelect.value,
        fontSize: fontSizeRange.value,
        color: colorPicker.value,
        bold: isBold,
        italic: isItalic, // Save italic state
        underline: isUnderlined // Save underline state
    };
    if (currentIndex === -1 || JSON.stringify(state) !== JSON.stringify(history[currentIndex])) {
        history = history.slice(0, currentIndex + 1); // Remove future states if new input
        history.push(state);
        currentIndex++;
    }
}

function restoreState(index) {
    const state = history[index];
    textInput.value = state.text;
    fontSelect.value = state.font;
    fontSizeRange.value = state.fontSize;
    colorPicker.value = state.color;
    isBold = state.bold; // Restore bold state
    isItalic = state.italic; // Restore italic state
    isUnderlined = state.underline; // Restore underline state
    updateOutputWithoutSave();
}

function updateOutputWithoutSave() {
    const selectedFont = fontSelect.value;
    const selectedFontSize = fontSizeRange.value + 'px';
    const selectedColor = colorPicker.value;

    output.style.fontFamily = selectedFont;
    output.style.fontSize = selectedFontSize;
    output.style.color = selectedColor;
    output.style.fontWeight = isBold ? 'bold' : 'normal'; // Set bold style
    output.style.fontStyle = isItalic ? 'italic' : 'normal'; // Set italic style
    output.style.textDecoration = isUnderlined ? 'underline' : 'none'; // Set underline style
    output.innerText = textInput.value || 'Your edited text will appear here..';
}

function undo() {
    if (currentIndex > 0) {
        currentIndex--;
        restoreState(currentIndex);
        updateButtons();
    }
}

function redo() {
    if (currentIndex < history.length - 1) {
        currentIndex++;
        restoreState(currentIndex);
        updateButtons();
    }
}

function updateButtons() {
    undoButton.disabled = currentIndex <= 0;
    redoButton.disabled = currentIndex >= history.length - 1;
}

boldButton.addEventListener('click', () => {
    isBold = !isBold; // Toggle bold state
    updateOutput();
});

italicButton.addEventListener('click', () => {
    isItalic = !isItalic; // Toggle italic state
    updateOutput();
});

underlineButton.addEventListener('click', () => {
    isUnderlined = !isUnderlined; // Toggle underline state
    updateOutput();
});

textInput.addEventListener('input', updateOutput);
fontSelect.addEventListener('change', updateOutput);
fontSizeRange.addEventListener('input', updateOutput);
colorPicker.addEventListener('input', updateOutput);
undoButton.addEventListener('click', undo);
redoButton.addEventListener('click', redo);

updateOutput();
