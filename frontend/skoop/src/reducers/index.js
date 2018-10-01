export default (state, action) => {
    switch (action.type) {
        case 'SHOW_LOGIN_MODAL':
            return {
                ...state,
                showLogInModal: true,
                openOptions: false,
                showSignUpModal: false,
                enterGuestMode: false
            };
        case 'SHOW_SIGNUP_MODAL':
            return {
                ...state,
                showSignUpModal: true,
                openOptions: false,
                showLogInModal: false,
                enterGuestMode: false
            }
       
        case 'SIGNIN_EMAIL_CHANGE':
            return {
                ...state,
                signInUserEmail: action.payload
            }
        case 'SIGNIN_PASSWORD_CHANGE':
            return {
                ...state,
                signInPassword: action.payload
            }
        case 'SIGNUP_EMAIL_CHANGE':
            return {
                ...state,
                signUpUserEmail: action.payload
            }
        case 'SIGNUP_PASSWORD_CHANGE':
            return {
                ...state,
                signUpPassword: action.payload
            }
        case 'SIGNUP_CONFIRM_PASSWORD_CHANGE':
            return {
                ...state,
                signUpConfirmPassword: action.payload
            }
        case 'SIGNUP_FIRSTNAME_CHANGE':
            return {
                ...state,
                signUpFirstName: action.payload
            }
        case 'SIGNUP_LASTNAME_CHANGE':
            return {
                ...state,
                signUpLastName: action.payload
            }
        case 'INITIAL_ENTRY_OPTIONS':
            return {
                ...state,
                showLogInModal: false,
                openOptions: true,
                showSignUpModal: false,
                enterGuestMode: false

            }
        case 'SIGN_UP_SUBMIT':
            return {
                ...state,
                showLogInModal: false,
                openOptions: false,
                showSignUpModal: false,
                enterGuestMode: false,
                showMainScreen: true,
                userLoggedIn: true
            }
        case 'ENTER_GUEST_MODE':
            return {
                ...state,
                showLogInModal: false,
                openOptions: false,
                showSignUpModal: false,
                enterGuestMode: true,
                showMainScreen: true,
                userLoggedIn: false
            }
        case 'LOG_IN_SUBMIT':
            
                return {
                    ...state,
                    showLogInModal: false,
                    openOptions: false,
                    showSignUpModal: false,
                    enterGuestMode: false,
                    showMainScreen: true,
                    userLoggedIn: true
            }
        case 'LOG_USER_OUT':
            return {
                ...state,
                openOptions: true,
                userLoggedIn: false,
                showMainScren: false
            }
        case 'SET_LOADING_TRUE':
            return {
                ...state,
                loading: true
            }
        case 'SEND_USER_POSITION': {
            console.log(action.payload)
            return {
                ...state,
                position: action.payload
            }
        }
        default:
            return state;
    }

}