const keyDownHandler = (keyboardEvent) => {
    if (keyboardEvent.key.toLowerCase() === 'a') {
        document.getElementById('toggle-reveal').click();
    } else if (keyboardEvent.key.toLowerCase() === 'n') {
        document.getElementById('next-flashcard').click();
    }
};

document.getElementsByTagName('body').item(0).onkeydown = keyDownHandler;
