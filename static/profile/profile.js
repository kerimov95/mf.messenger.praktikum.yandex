function editProfile(status) {

    const emailField = document.getElementById('email');
    if (emailField)
        emailField.disabled = status;

    const loginField = document.getElementById('login');
    if (loginField)
        loginField.disabled = status;

    const first_nameField = document.getElementById('first_name');
    if (first_nameField)
        first_nameField.disabled = status;

    const second_nameField = document.getElementById('second_name');
    if (second_nameField)
        second_nameField.disabled = status;

    const display_nameField = document.getElementById('display_name');
    if (display_nameField)
        display_nameField.disabled = status;

    const phoneField = document.getElementById('phone');
    if (phoneField)
        phoneField.disabled = status;

    const saveButton = document.getElementById('saveButton');
    const Buttons = document.getElementById('Buttons')

    if (status) {
        if (saveButton)
            saveButton.hidden = true;

        if (Buttons)
            Buttons.hidden = false;
    }
    else {
        if (saveButton)
            saveButton.hidden = false;

        if (Buttons)
            Buttons.hidden = true;
    }
}