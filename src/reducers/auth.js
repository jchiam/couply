import Actions from 'constants/actions';

const initialState = {
  token: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Actions.FACEBOOK_LOGGING_IN:
      return state;
    case Actions.FACEBOOK_LOGGED_IN:
      return {
        ...state,
        user: action.user,
        token: action.token
      };
    case Actions.FACEBOOK_LOGIN_ERROR:
      return state;
    default:
      return state;
  }
}
