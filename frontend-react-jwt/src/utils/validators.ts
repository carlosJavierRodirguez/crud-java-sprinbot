//aqui se validan los campos de los formularios

export function isValidGmail(email: string): boolean {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
    return password.length >= 6;
}

export function isValidUserName(userName: string): boolean {
    return userName.length >= 3;
}

export function validateLoginForm(form: { userName: string; password: string }): string | null {

    if (!isValidUserName(form.userName)) {
        return "El nombre de usuario debe tener al menos 3 caracteres.";
    }
    if (!isValidPassword(form.password)) {
        return "La contraseña debe tener al menos 6 caracteres.";
    }

    return null;
}
