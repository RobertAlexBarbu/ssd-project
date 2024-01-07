import { createAction, props } from '@ngrx/store';
import { AuthStateModel } from '../../models/auth-state.model';

export const login = createAction(
  '[Auth] Log In',
  props<{ authState: AuthStateModel }>()
);
export const signup = createAction(
  '[Auth] Sign Up',
  props<{ authState: AuthStateModel }>()
);
export const logout = createAction('[Auth] Log Out');
export const isAuth = createAction(
  '[Auth] AppUser is authenticated',
  props<{ authState: AuthStateModel }>()
);
