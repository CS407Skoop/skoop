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
    store.dispatch(getArticles());
    navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        var pos = position;
        store.dispatch(sendUserLocation(pos));

    }, error => {
        console.log(error);
        store.dispatch(noLocationGiven())
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
        type: 'LOG_IN_FAILURE',
        payload: 'Invalid credentials. Try logging in again'
    }
}

export const logInSubmit = () => {
    const currentStore = store.getState();
    var email = currentStore.signInUserEmail;
    var password = currentStore.signInPassword;
    if(!email || email.length===0) {
        var msg = 'Email cannot be left empty'
        return {
            type: 'LOG_IN_FAILURE',
            payload: msg
        }
    }
    if(!password || password.length===0) {
        var msg = 'Password cannot be left empty'
        return {
            type: 'LOG_IN_FAILURE',
            payload: msg
        }
    }

    if(!validateEmail(email)) {
            var msg  = "Invalid Email";
            return {
                type: 'LOG_IN_FAILURE',
                payload: msg
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
            if (objReceived.message === 'SUCCESS') {
                store.dispatch(storeUserLogInDetails(objReceived));
                store.dispatch(getArticles());
            }
            else {
                alert('Invalid credentials. Try logging in again')
                store.dispatch(logInFailure());
            }
        })
    })
    navigator.geolocation.getCurrentPosition(position => {
        var pos = position;
        store.dispatch(sendUserLocation(pos));

    },error => {
        console.log(error);
        store.dispatch(noLocationGiven())
    })
    return {
        type: 'LOG_IN_SUBMIT',
    }
    }

  export const signUpFailure = () => {
       return {
          type: 'SIGN_UP_FAILURE',
          payload: 'User already exists. Try another email.'
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

export const noLocationGiven = () => {
    return {
        type: 'NO_LOCATION_GIVEN'
            
    }
}

export const storeArticles = (articles) => {
    console.log("IN");
    return {
        type: 'STORE_ARTICLES',
        payload: articles
    }
}

export const getArticles = () => {
    console.log("GETART")
    var newDate = new Date();
    console.log(newDate);
    var year = newDate.getFullYear();
    var month = newDate.getMonth() + 1;
    var day = newDate.getDate()-4;
    var date = year + "-" + month + "-" + day + " 00:00:00"
    console.log(date);
    var jsonToSend = JSON.stringify({
        date: date
    })
    console.log(jsonToSend);
    var request = new Request('http://skoopnews.herokuapp.com/api/getArticles/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: jsonToSend
    });
    fetch(request).then(function (response) {
        console.log(response);
        response.text().then(function (text) {
            var objReceived = JSON.parse(text);
            console.log(objReceived);
            store.dispatch(storeArticles(objReceived.value));
            
        })
    })
    return {
        type: 'DUMMY'
    }
}

export const signUpSubmit = () => {


    const currentStore = store.getState();
    var email = currentStore.signUpUserEmail;
        var password = currentStore.signUpPassword;
        if(!email || email.length===0) {
            var msg = 'Email cannot be left empty'
            return {
                type: 'SIGN_UP_FAILURE',
                payload: msg
            }
        }
        if(!password || password.length===0) {
            var msg = 'Password cannot be left empty'

            return {
                type: 'SIGN_UP_FAILURE',
                payload: msg
            }
        }

        if(!validateEmail(email)) {
            var msg = 'Invalid Email'
                return {
                    type: 'SIGN_UP_FAILURE',
                    payload: msg
                }
            }
    var confirmPassword = currentStore.signUpConfirmPassword;
    if(!confirmPassword || confirmPassword.length===0) {
                var msg = 'Password cannot be left empty'

                return {
                    type: 'SIGN_UP_FAILURE',
                    payload: msg
                }
            }

    if(confirmPassword !== password) {
        var msg = 'Passwords do not match'
        return {
            type: 'SIGN_UP_FAILURE',
            payload: msg
        }
    }


    var firstName = currentStore.signUpFirstName;
    var lastName = currentStore.signUpLastName;

    if(!firstName || firstName.length===0) {
                var msg = 'First Name cannot be empty'

                return {
                    type: 'SIGN_UP_FAILURE',
                    payload: msg
                }
            }

     if(!lastName || lastName.length===0) {
                var msg = 'Last Name cannot be empty'
                 return {
                     type: 'SIGN_UP_FAILURE',
                     payload: msg
                 }
             }


    if (/[^a-zA-Z]/.test(firstName)) {

        var msg = 'First Name can only contain letters'
        return {
                    type: 'SIGN_UP_FAILURE',
                    payload: msg
                }
    }

    if (/[^a-zA-Z]/.test(lastName)) {

            var msg = 'Last Name can only contain letters'
            return {
                        type: 'SIGN_UP_FAILURE',
                        payload: msg
                    }
        }

    var jsonToSend = JSON.stringify({
        username: email,
        password: password,
        firstName: firstName,
        lastName: lastName
    })

    var request = new Request('http://skoopnews.herokuapp.com/api/signup/', {
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
                if (objReceived.message === 'SUCCESS') {
                    
                    console.log("SIGNED UP")
                }
                else {
                    alert('User already exists. Use a different email or sign in')
                    store.dispatch(signUpFailure())
                }
            })
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

export const loadTempCats = () => {
    return {
        type: 'LOAD_TEMP_CATS',
        payload: store.getState().categories
    }
}

export const openLeftPane = () => {
    return {
        type: 'OPEN_LEFT_PANE',
        payload: store.getState().favoriteLocations
    }
}

export const closeLeftPane = () => {
    return {
      type: 'CLOSE_LEFT_PANE'
    }
}

export const showLogOutModal = () => {
console.log("IN");
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

export const updateNewCategories = (categories) => {

    return {
        type: 'UPDATE_CATEGORIES',
        payload: categories
    }
}

export const changeFirstLocation = (location) => {
    var newArr = store.getState().tempFavoriteLocations.slice(0);

    newArr[0] = location;
    console.log(newArr);
    return {
        type: 'CHANGE_FIRST_LOCATION',
        payload: newArr

    }
}

export const changeSecondLocation = (location) => {
    var newArr = store.getState().tempFavoriteLocations.slice(0);

        newArr[1] = location;
        console.log(newArr);
    return {
        type: 'CHANGE_SECOND_LOCATION',
        payload: newArr
    }
}

export const changeThirdLocation = (location) => {
    var newArr = store.getState().tempFavoriteLocations.slice(0);

        newArr[2] = location;
        console.log(newArr);
    return {
        type: 'CHANGE_THIRD_LOCATION',
        payload: newArr
    }
}

export const updateLocations = (locations) => {
    return {
        type: 'UPDATE_LOCATIONS_SUBMIT',
        payload: locations
    }

}

export const updateAfterResponsePref = (res) => {
    return {
        type: 'UPDATE_PREF_RESPONSE',
        payload: res
    }
}

export const submitEditPref = () => {
const currentStore = store.getState();
var jsonToSend = JSON.stringify({
        username: currentStore.signInUserEmail,
        password: currentStore.signInPassword,
        favoriteArticles: currentStore.favoriteArticles,
        favoriteLocations: currentStore.tempFavoriteLocations,
        categories: currentStore.tempCategories
    })
    console.log(jsonToSend);
    var request = new Request('http://127.0.0.1:5000/api/editPreferences/', {
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
                    store.dispatch(updateAfterResponsePref(objReceived))

                })
            })


          return {
            type: 'EDIT_PREF_SUBMITTED',
            payload: store.getState().tempFavoriteCategories
          }
          }

  export const closeWarningModal =() => {
    return {
        type: 'CLOSE_WARNING_MODAL',
    }
}

export const updateZoom = (zoom) => {
    return {
        type: 'UPDATE_ZOOM',
        payload: zoom
    }
}

export const updateCenter = (center) => {
    return {
        type: 'UPDATE_CENTER',
        payload: center
    }
}

export const searchValueChange = (search) => {
    console.log(search);
    return {
        type: 'SEARCH_VALUE_CHANGE'
    }
}

