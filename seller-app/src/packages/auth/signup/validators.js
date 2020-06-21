
import { isValidEmail, isValueExist, isValidText } from "../../../common/utils/form-validators";


const signupFormValidator = (type, data) => {
    let errors = { ...data.errors };
    switch (type) {
        case 'firstName':
            errors[type] = !isValidText(data.signupData.firstName)
            break;
        case 'lastName':
            errors[type] = !isValidText(data.signupData.lastName)
            break;
        case 'email':
            errors[type] = !isValidEmail(data.signupData.email)
            break;
        case 'password':
            errors[type] = !isValueExist(data.signupData.password)
            break;
        default:
    }
    return errors;
}

export {
    signupFormValidator
}