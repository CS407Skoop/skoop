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
    navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        var pos = position;
        store.dispatch(sendUserLocation(pos));

    })
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

export const storeUserLogInDetails = (userDetails) => {
    return {
        type: 'STORE_USER_DETAILS',
        payload: userDetails
    }
}

export const logInFailure = () => {
    return {
        type: 'LOG_IN_FAILURE'
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
    //console.log(jsonToSend);
    var request = new Request('http://127.0.0.1:5000/api/login/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: jsonToSend
        });
    fetch(request).then(function(response){
        response.text().then(function(text) {
            var objReceived = JSON.parse(text);
            if(objReceived.message === 'SUCCESS')
                store.dispatch(storeUserLogInDetails(objReceived));
            else {
                alert('Invalid credentials. Try logging in again')
                store.dispatch(logInFailure());
            }
        })
    })
    navigator.geolocation.getCurrentPosition(position => {
        var pos = position;
        store.dispatch(sendUserLocation(pos));
        
        })
    return {
        type: 'LOG_IN_SUBMIT',
    }
    }

  export const signUpFailure = () => {
       return {
          type: 'SIGN_UP_FAILURE'
       }
  }

  export const storeUserSignUpDetails =  (userDetails) => {
        return {
            type: 'STORE_SIGNUP_DETAILS',
            payload: userDetails
        }
  }

export const signUpSubmit = () => {
    const currentStore = store.getState();
    var email = currentStore.signUpUserEmail;
    var password = currentStore.signUpPassword;
    var firstName = currentStore.signUpFirstName;
    var lastName = currentStore.signUpLastName;
    var jsonToSend = JSON.stringify({
        username: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    })
    var request = new Request('http://127.0.0.1:5000/api/signup/', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: jsonToSend
            });
        fetch(request).then(function(response){
            response.text().then(function(text) {
                var objReceived = JSON.parse(text);
                console.log(objReceived);
                if(objReceived.message === 'SUCCESS')
                    store.dispatch(storeUserSignUpDetails(objReceived));
                else {
                    alert('User already exists. Use a different email or sign in')
                    store.dispatch(signUpFailure());
                }
            })
        })
    console.log(jsonToSend);
    navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        var pos = position;
        store.dispatch(sendUserLocation(pos));

    })
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