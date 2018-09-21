export default (state, action) => {
    switch (action.type) {
        case 'SHOW_LOGIN_MODAL':
            return {
                ...state,
                showLogInModal: true,
                openOptions: false
            };
        default:
            return state;
    }

}