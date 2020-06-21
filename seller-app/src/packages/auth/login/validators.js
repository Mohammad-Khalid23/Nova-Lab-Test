
import { isValidEmail, isValueExist } from "../../../common/utils/form-validators";


const loginFormValidator = (type, data) => {
    let errors = { ...data.errors };
    switch (type) {
        case 'email':
        errors[type] = !isValidEmail(data.loginData.email)
            break;
        case 'password':
        errors[type] = !isValueExist(data.loginData.password)
            break;
        default:
    }
    return errors;
}

export {
    loginFormValidator
}