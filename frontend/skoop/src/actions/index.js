import { store } from '../store';

export const openLogInModal = () => {
    return {
        type: 'SHOW_LOGIN_MODAL'
    }
}

export const openSignUpModal = () => {
    return {
        type: 'SHOW_SIGNUP_MODAL'
    }
}

export const enterGuestMode = () => {
    return {
        type: 'ENTER_GUEST_MODE'
    }
}

export const signInEmailChange = (email) => {
    return {
        type: 'SIGNIN_EMAIL_CHANGE',
        payload: email
    }
}

export const signInPasswordChange = (password) => {
    return {
        type: 'SIGNIN_PASSWORD_CHANGE',
        payload: password
    }
}

export const signUpEmailChange = (email) => {
    return {
        type: 'SIGNUP_EMAIL_CHANGE',
        payload: email
    }
}

export const signUpPasswordChange = (password) => {
    return {
        type: 'SIGNUP_PASSWORD_CHANGE',
        payload: password
    }
}

export const signUpConfirmPasswordChange = (password) => {
    return {
        type: 'SIGNUP_CONFIRM_PASSWORD_CHANGE',
        payload: password
    }
}

export const signUpFirstNameChange = (firstName) => {
    return {
        type: 'SIGNUP_FIRSTNAME_CHANGE',
        payload: firstName
    }
}

export const signUpLastNameChange = (lastName) => {
    return {
        type: 'SIGNUP_LASTNAME_CHANGE',
        payload: lastName
    }
}

export const setLoadingTrue = () => {
    return {
        type: 'SET_LOAD_TRUE',
    }
}

export const sendUserLocation = (position) => {
    return {
        type: 'SEND_USER_POSITION',
        payload: position
    }
}

export const logInSubmit = () => {
    const currentStore = store.getState();
    var email = currentStore.signInUserEmail;
    var password = currentStore.signInPassword;
    var jsonToSend = JSON.stringify({
        username: email,
        password: password
    })
    console.log(jsonToSend);
    navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        var pos = position;
        store.dispatch(sendUserLocation(pos));
        
        })
    return {
        type: 'LOG_IN_SUBMIT',
    }
    }
    

export const signUpSubmit = () => {
    const currentStore = store.getState();
    var email = currentStore.signInUserEmail;
    var password = currentStore.signInPassword;
    var firstName = currentStore.signUpFirstName;
    var lastName = currentStore.signUpLastName;
    var jsonToSend = JSON.stringify({
        username: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    })
    console.log(jsonToSend);
    return {
        type: 'SIGN_UP_SUBMIT',
    }
}

export const initialModalOptions = () => {
    return {
        type: 'INITIAL_ENTRY_OPTIONS'
    }
}

export const logUserOut = () => {
    return {
        type: 'LOG_USER_OUT'
    }
}