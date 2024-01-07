import * as AuthActions from './auth.actions';
import { createReducer, on } from '@ngrx/store';
import { AuthStateModel } from '../../models/auth-state.model';

export const initialAuthState: AuthStateModel = {
  username: '',
  id: '',
  email: '',
  role: 0
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, { authState }) => ({
    username: authState.username,
    email: authState.email,
    id: authState.id,
    role: authState.role
  })),
  on(AuthActions.signup, (state, { authState }) => ({
    username: authState.username,
    email: authState.email,
    id: authState.id,
    role: authState.role
  })),
  on(AuthActions.logout, () => ({ ...initialAuthState })),
  on(AuthActions.isAuth, (state, { authState }) => ({
    username: authState.username,
    email: authState.email,
    id: authState.id,
    role: authState.role
  }))
);
