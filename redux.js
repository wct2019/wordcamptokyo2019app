import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Alert } from 'react-native';
import { Linking } from 'expo';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-google-app-auth';
import { FIREBASE_AUTH_DOMAIN } from 'react-native-dotenv';
import firebase, { auth, db } from './utils/firebase';

export const signIn = (email, password) => (dispatch) => {
  dispatch({
    type: 'START_AUTH_USER',
  });
  auth.signInWithEmailAndPassword(email, password)
    .catch(({ message }) => {
      dispatch({
        type: 'FAIL_AUTH_USER',
        message,
      });
    });
};

export const authUser = (email, password) => (dispatch) => {
  dispatch({
    type: 'START_AUTH_USER',
  });
  auth.createUserWithEmailAndPassword(email, password)
    .catch(({ message }) => {
      dispatch({
        type: 'FAIL_AUTH_USER',
        message,
      });
    });
};

export const signOut = () => (dispatch) => {
  dispatch({
    type: 'START_SIGN_OUT_USER',
  });
  auth.signOut()
    .catch(({ message }) => {
      Alert.alert(message);
    });
};

export const sendPasswordResetEmail = () => (dispatch) => {
  const email = store.getState().user.data && store.getState().user.data.email;
  if (email) {
    Alert.alert(
      'Reset Password',
      'We will email you instructions on how to reset your password.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            auth.sendPasswordResetEmail(email).then(() => {
              Alert.alert('The email has been sent to your account.');
            }).catch(({ message }) => {
              Alert.alert(message);
            });
          },
        },
      ],
    );
  }
};

export const verifyEmail = () => (dispatch) => {
  const user = store.getState().user.data;
  if (user) {
    Alert.alert(
      'Email verification',
      'We will send a verification link to your email account.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            user.sendEmailVerification({ url: Linking.makeUrl(FIREBASE_AUTH_DOMAIN) }).then(() => {
              Alert.alert('The email has been sent.');
              db.collection('/users')
                .doc(user.uid)
                .onSnapshot((docSnapshot) => {
                  const dbUser = docSnapshot.data();
                  if (dbUser && dbUser.emailVerifiedAt) {
                    Alert.alert('Email verification has succeeded.');
                    dispatch({
                      type: 'SUCCESS_GET_USER',
                      data: dbUser,
                    });
                    user.reload().then(() => {
                      console.log(user);
                    });
                  }
                });
            }).catch(({ message }) => {
              Alert.alert(message);
            });
          },
        },
      ],
    );
  }
};

export const getTicketID = () => (dispatch) => {
  const user = store.getState().user.data;
  if (user) {
    const id = db.collection('/Tickets').where('email', '==', user.email)
      .get()
      .then((querySnapshot) => {
        const tid = querySnapshot[0].id.toString();
        console.log('Ticket ID : ');
        console.log(tid);
        return tid;
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
    return id;
  } else {
    return null;
  }
};

export const getPosts = (size, startAfter) => (dispatch) => {
  const user = store.getState().user.data;
  if (user) {
    const userRef = db.collection('/users').doc(user.uid);
    userRef.get()
      .then((userSnapshot) => {
        dispatch({
          type: 'SUCCESS_GET_USER',
          data: userSnapshot.data(),
        });
        let postsRef = userRef.collection('/posts')
          .orderBy('order')
          .limit(size);
        if (startAfter) {
          postsRef = postsRef.startAfter(startAfter);
        }
        return postsRef.get();
      })
      .then((querySnapshot) => {
        dispatch({
          type: 'SUCCESS_GET_POSTS',
          posts: querySnapshot.docs,
        });
      })
      .catch(({ message }) => {
        Alert.alert(message);
      });
  }
};

const INITIAL_STATE = {
  data: null,
  dbData: null,
  authError: null,
  posts: null,
  phoneNumberConfirmation: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'START_AUTH_USER':
      return { ...state, error: null };
    case 'SUCCESS_AUTH_USER':
      return { ...state, data: action.data };
    case 'SIGN_OUT_USER':
      return { ...state, data: null };
    case 'FAIL_AUTH_USER':
      return { ...state, authError: action.message };
    case 'SUCCESS_GET_USER':
      console.log(action.data);
      return { ...state, dbData: action.data };
    case 'SUCCESS_GET_POSTS':
      return {
        ...state,
        posts: (state.posts || []).concat(action.posts),
      };
    default:
      return state;
  }
};

export const reducers = combineReducers({
  user: reducer,
});

export const store = createStore(reducers, applyMiddleware(thunk));

auth.onAuthStateChanged((user) => {
  console.log('auth state changed', user);
  const current = store.getState().user.data;
  if (!current && user) {
    store.dispatch({
      type: 'SUCCESS_AUTH_USER',
      data: user,
    });
  } else if (current && !user) {
    store.dispatch({
      type: 'SIGN_OUT_USER',
    });
  }
});
