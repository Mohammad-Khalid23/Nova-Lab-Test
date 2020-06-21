

const isValidEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const isValidNumber = (value) => {
    var re = /^[0-9]\d*$/;
    return re.test(value);
}

const isValidAlphabetWord = (value) => {
    let re = /^[A-Za-z\s]+$/;
    return re.test(value);
}

const isValidPhoneNumber = (value) => {
    let re = /^[+0-9]\d*$/;
    return re.test(value);
}

const isBetweenOREqualToRange = (value, range) => {
    return value.length >= range.min && value.length <= range.max
};

const isValidText = (value) => {
    var re = /^[A-Za-z\d\s]+$/;
    return re.test(value);
}

const isValueExist = (value) => {
    return Boolean(value);
}

const isMatch = (value1, value2) => {
    return value1 === value2
}

const isLatLngExist = (coordinates) => {
    return coordinates.length !== 0
}

const isValid = (errors, data) => {
    for (var key in errors) {
        if (errors[key] || data[key] === '') {
            return false;
        }
    }
    return true;
}


export {
    isValidEmail,
    isValidNumber,
    isValid,
    isValidText,
    isValueExist,
    isMatch,
    isLatLngExist,
    isValidAlphabetWord,
    isValidPhoneNumber,
    isBetweenOREqualToRange
}