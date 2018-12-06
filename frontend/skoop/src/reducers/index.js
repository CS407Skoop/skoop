import {store} from '../store';

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
                showLogInModal: true,
                openOptions: false,
                showSignUpModal: true,
                enterGuestMode: false,
                showMainScreen: false,
                userLoggedIn: false,
                openLeftPane: false,
            }
        case 'ENTER_GUEST_MODE':
            return {
                ...state,
                showLogInModal: false,
                openOptions: false,
                showSignUpModal: false,
                enterGuestMode: true,
                showMainScreen: true,
                userLoggedIn: false,
                openLeftPane: false,
                mapLoading: true,
                zoom: 1,
                toggle: false,
                center: {
                    lat: 40.424546,
                    lng: -86.921826
                }


            }
        case 'LOG_IN_SUBMIT':

                return {
                    ...state,
                    showLogInModal: false,
                    openOptions: false,
                    showSignUpModal: false,
                    enterGuestMode: false,
                    showMainScreen: true,
                    userLoggedIn: true,
                    openLeftPane: false,
                    allCategories: ['Auto', 'Business', 'Education', 'Entertainment', 'Food', 'Health', 'Military', 'Politics', 'Product', 'Product', 'Real Estate', 'Science', 'Sport', 'World'],
                    mapLoading: true,
                    zoom: 1,
                    toggle: false,
                    callGA: 7,
                    center: {
                        lat: 40.424546,
                        lng: -86.921826
                    }

            }
        case 'LOG_USER_OUT':
            return {
                ...state,
                openOptions: true,
                userLoggedIn: false,
                showMainScreen: false,
                firstName: '',
                callGA: 7,
                lastName: '',
                                            email: '',
                                            favoriteLocations: '',
                                            favoriteArticles: '',
                                            categories: '',
                                            blockedCategories: '',
                                            showLogOutModal: false


            }
        case 'SET_LOADING_TRUE':
            return {
                ...state,
                loading: true
            }
        case 'SEND_USER_POSITION': {

            return {
                ...state,
                locationGiven: true,
                position: action.payload,
                mapLoading: false,
            }
        }
        case 'STORE_USER_DETAILS': {
            return {
                ...state,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                                            email: action.payload.email,
                                            favoriteLocations: action.payload.favoriteLocations,
                                            favoriteArticleTitles: action.payload.favoriteArticleTitles,
                                            favoriteArticleLinks: action.payload.favoriteArticleLinks,
                                            favoriteArticleIDs: action.payload.favoriteArticleIDs,
                                            categories: action.payload.categories,
                                            blockedCategories: action.payload.blockedCategories
            }
        }

        case 'LOG_IN_FAILURE':
            return {
                ...state,
                signInPassword: '',
                showLogInModal: true,
                openOptions: false,
                showSignUpModal: false,
                enterGuestMode: false,
                showMainScreen: false,
                userLoggedIn: false,
                warning: true,
                warningMsg: action.payload

            }
         case 'STORE_SIGNUP_DETAILS':
            return {
                            ...state,
                            firstName: action.payload.firstName,
                            lastName: action.payload.lastName,
                                            email: action.payload.email,
                            categories: ''
                        }
         case 'SIGN_UP_FAILURE':
            return {
                ...state,
                                signInPassword: '',
                                showLogInModal: false,
                                showSignUpModal: true,
                                openOptions: false,
                                enterGuestMode: false,
                                showMainScreen: false,
                                userLoggedIn: false,
                                warning: true,
                                warningMsg: action.payload
            }
        case 'OPEN_LEFT_PANE':
            return {
                ...state,
                openLeftPane: true,
                openPreferencesModal: false,
                tempFavoriteLocations: action.payload,
                tempCategories: state.categories

            }
        case 'CLOSE_LEFT_PANE':
            return {
                ...state,
                openLeftPane: false
            }
        case 'OPEN_PREFERENCES_MODAL':
            return {
                ...state,
                openPreferencesModal: true
            }

        case 'OPEN_RIGHT_PANE':
            return {
              ...state,
              openRightPane: true
            }

        case 'CLOSE_RIGHT_PANE':
            return {
              ...state,
              openRightPane: false
            }

        case 'SHOW_LOGOUT_MODAL':
            return {
                ...state,
                showLogOutModal: true
            }

        case 'REMOVE_LOGOUT_MODAL':
            return {
                ...state,
                showLogOutModal: false
            }

        case 'CLOSE_PREFERENCES_MODAL':
            return {
                ...state,
                openPreferencesModal: false
            }
        case 'CHANGE_FIRST_LOCATION':
            return {
                ...state,
                tempFavoriteLocations: action.payload
             }
        case 'CHANGE_SECOND_LOCATION':
                    return {
                        ...state,
                        tempFavoriteLocations: action.payload
                     }
        case 'CHANGE_THIRD_LOCATION':
                    return {
                        ...state,
                        tempFavoriteLocations: action.payload
                     }
         case 'UPDATE_CATEGORIES':
                return {
                    ...state,
                    tempCategories: action.payload
                }


          case 'UPDATE_PREF_RESPONSE':
            return {
                ...state,
                favoriteLocations: action.payload.favoriteLocations,
                categories: action.payload.categories,
                blockedCategories: action.payload.blockedCategories


            }

            case 'LOAD_TEMP_CATS':
                return {
                    ...state,
                    tempCategories: action.payload

                }
             case 'EDIT_PREF_SUBMITTED':
                return {
                    ...state,
                    openPreferencesModal: false
            }

        case 'NO_LOCATION_GIVEN':
            return {
                ...state,
                locationGiven: false,
                mapLoading: false,
                center: {
                    lat: 40.424546,
                    lng: -86.921826
                }
            }
        case 'CLOSE_WARNING_MODAL':
            return {
                ...state,
                warning: false,
                warningMsg: ''
            }
        case 'UPDATE_ZOOM':
            return {
                ...state,
                zoom: action.payload
            }
        case 'UPDATE_CENTER':
            return {
                ...state,
                center: action.payload
            }
        case 'STORE_ARTICLES': {
            return {
                ...state,
                articles: action.payload
            }
        }
        case 'STORE_ARTICLE_DETAILS': {
            console.log(action.payload);
            return {
                ...state,
                articleDetails: action.payload,
                showArticleFrame: true
            }
        }
        case 'HIDE_ARTICLE_INFORMATION': {
            return {
                ...state,
                articleDetails: false,
                showArticleFrame: false
            }
        }
        case 'STORE_POSITIONS': {
            return {
                ...state,
                positions: action.payload
            }
        }
        case 'SEARCH_VALUE_CHANGE': {
            return {
                ...state,
                searchValue: action.payload
            }
        }

        case 'CHANGE_TOGGLE': {
            return {
                ...state,
                toggle: action.payload
            }
        }
        case 'CALL_GA': {
            return {
                ...state,
                callGA: action.payload 
            }
        }

        case 'STORE_FAVARTICLES_DETAILS': {
            return {
                ...state,
                favoriteArticleIDs: action.payload.favoriteArticleIDs,
                favoriteArticleLinks: action.payload.favoriteArticleLinks,
                favoriteArticleTitles: action.payload.favoriteArticleTitles
            }
        }

        default:
            return state;



    }

}
