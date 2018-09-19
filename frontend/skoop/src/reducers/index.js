export default (state, action) => {
    switch (action.type) {
        case 'OPEN_LOGIN_MODAL':
            return {
                ...state,
                logInModal: true
            };
        default:
            return state;
    }

}