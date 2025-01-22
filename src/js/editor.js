// Retrieve elements
const runCodeButton = document.querySelector('.editor__run');
const resetCodeButton = document.querySelector('.editor__reset');

// Ace setup
let codeEditor = ace.edit("editorCode");
let consoleMessages = [];

// implimenting default code:
let defaultCode = 'print("hello world")';




let editorLib = {
    init() {
        // Ace configuration
        codeEditor.commands.removeCommand("print");
        delete codeEditor.commands.commands["print"];


        // Theme
        codeEditor.setTheme("ace/theme/twilight");
        // Lang
        codeEditor.session.setMode("ace/mode/python");

        // set default code
        codeEditor.setValue(defaultCode);
    }
}

// Event listeners
runCodeButton.addEventListener('click', () => {
    // Grab input
    const fs = require('fs');
    let userInput = codeEditor.getValue();
    let storeString = userInput.toString();

    // store user input
    try {
        /**
         * This currently has some issues that I need to fix, but it stores the user input as a variable
         * and converts it into a string. 
         */
        // fs.writeFile('userInput.txt', storeString, (err) => {
        //     if (err) {
        //         console.error(err);
        //     } else {
        //         console.log('File written successfully')
        //     }
        // });
    } catch (error) {
        console.log(error);
    }
});

resetCodeButton.addEventListener('click', () => {
    // clear editor
    codeEditor.setValue('');
});



editorLib.init();