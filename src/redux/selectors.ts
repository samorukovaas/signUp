import { User } from '@firebase/auth-types';
import { FirebaseReducer } from 'react-redux-firebase';
import { RootState } from './store';

export const firebaseSelector = (
  state: RootState,
): FirebaseReducer.Reducer<Record<string, unknown>, Record<string, unknown>> => state.firebase;

export const currentUserSelector = (state: RootState): User | null => state.auth.currentUser;
export const isLoggedSelector = (state: RootState): boolean => state.auth.isLoggedIn;
export const codeSentSelector = (state: RootState): boolean => state.auth.codeSent;
export const isAuthLoadingSelector = (state: RootState): boolean => state.auth.loading;
export const authSelector = (state: RootState): FirebaseReducer.AuthState => state.firebase.auth;
export const profileSelector = (state: RootState): FirebaseReducer.Profile<{ [key: string]: string | string[] }> =>
  state.firebase.profile;
