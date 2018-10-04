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
    if(!email || email.length===0) {
        alert('Email cannot be left empty')
        return {
            type: 'LOG_IN_FAILURE'
        }
    }
    if(!password || password.length===0) {
        alert('Password cannot be left empty')
        return {
            type: 'LOG_IN_FAILURE'
        }
    }

    if(!validateEmail(email)) {
            alert("Invalid Email");
            return {
                type: 'LOG_IN_FAILURE',
            }
        }
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

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const signUpSubmit = () => {


    const currentStore = store.getState();
    var email = currentStore.signUpUserEmail;
        var password = currentStore.signUpPassword;
        if(!email || email.length===0) {
            alert('Email cannot be left empty')
            return {
                type: 'SIGN_UP_FAILURE'
            }
        }
        if(!password || password.length===0) {
            alert('Password cannot be left empty')
            return {
                type: 'SIGN_UP_FAILURE'
            }
        }

        if(!validateEmail(email)) {
                alert("Invalid Email");
                return {
                    type: 'SIGN_UP_FAILURE',
                }
            }
    var confirmPassword = currentStore.signUpConfirmPassword;
    if(!confirmPassword || confirmPassword.length===0) {
                alert('Password cannot be left empty')
                return {
                    type: 'SIGN_UP_FAILURE'
                }
            }

    if(confirmPassword !== password) {
        alert('Passwords do not match')
        return {
            type: 'SIGN_UP_FAILURE'
        }
    }


    var firstName = currentStore.signUpFirstName;
    var lastName = currentStore.signUpLastName;

    if(!firstName || firstName.length===0) {
                alert('First Name cannot be left empty')
                return {
                    type: 'SIGN_UP_FAILURE'
                }
            }

     if(!lastName || lastName.length===0) {
                 alert('Last Name cannot be left empty')
                 return {
                     type: 'SIGN_UP_FAILURE'
                 }
             }


    if (/[^a-zA-Z]/.test(firstName)) {

        alert('First Name can only contain letters')
        return {
                    type: 'SIGN_UP_FAILURE'
                }
    }

    if (/[^a-zA-Z]/.test(lastName)) {

            alert('Last Name can only contain letters')
            return {
                        type: 'SIGN_UP_FAILURE'
                    }
        }

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

export const openLeftPane = () => {
    return {
        type: 'OPEN_LEFT_PANE'
    }
}

export const closeLeftPane = () => {
    return {
      type: 'CLOSE_LEFT_PANE'
    }
}

export const showLogOutModal = () => {
    return {
      type: 'SHOW_LOGOUT_MODAL'
    }
}

export const removeLogOutModal = () => {
    return {
      type: 'REMOVE_LOGOUT_MODAL'
      }
      }
export const openPreferencesModal = () => {
    return {
        type: 'OPEN_PREFERENCES_MODAL'
    }
}

export const closePrefModal = () => {
    return {
        type: 'CLOSE_PREFERENCES_MODAL'
    }
}
