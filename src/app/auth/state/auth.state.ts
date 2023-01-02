export interface AuthState {
  email: string;
  password: string;
}

export const initialState: AuthState = {
  email: '',
  password: '',
};
