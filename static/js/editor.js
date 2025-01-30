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
    let userInput = codeEditor.getValue();

   // Send input to the Flask backend to save the code
    fetch('/api/save-code', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: userInput }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('File saved successfully:', data.message);

            // After saving, trigger the run action
            fetch('/api/run-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(response => response.json())
            .then(runData => {
                if (runData.success) {
                    console.log('Code executed successfully:', runData.output);
                } else {
                    console.error('Error executing code:', runData.error);
                }
            })
            .catch(runError => {
                console.error('Error running code:', runError);
            });

        } else {
            console.error('Error saving file:', data.error);
        }
    })
    .catch(saveError => {
        console.error('Error:', saveError);
    });
});



resetCodeButton.addEventListener('click', () => {

    codeEditor.setValue(defaultCode);
});



editorLib.init();