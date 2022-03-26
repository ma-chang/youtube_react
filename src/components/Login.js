import React, { useReducer } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withCookies } from 'react-cookie';
import { ERROR_CATCHED, FETCH_SUCCESS, INPUT_EDITED, START_FETCH, TOGGLE_MODE } from './actionTypes';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3),
  },
  span: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'teal',
  },
  spanError: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'fuchsia',
    marginTop: 10,
  },
}));

const initialState = {
  isLoding: false,
  isLoginView: true,
  error: '',
  credentialsLog: {
    email: '',
    password: '',
  },
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case START_FETCH: {
      return {
        ...state,
        isLoding: true,
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...state,
        isLoding: false,
      };
    }
    case ERROR_CATCHED: {
      return {
        ...state,
        error: 'Email or Password is not valid',
        isLoding: false,
      };
    }
    case INPUT_EDITED: {
      return {
        ...state,
        credentialsLog: {
          ...state.credentialsLog,
          [action.inputName]: action.payload,
        },
        error: '',
      };
    }
    case TOGGLE_MODE: {
      return {
        ...state,
        isLoginView: !state.isLoginView,
      };
    }
    default: {
      return state;
    }
  }
};

const Login = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(loginReducer, initialState);
  return <div></div>;
};

export default Login;
