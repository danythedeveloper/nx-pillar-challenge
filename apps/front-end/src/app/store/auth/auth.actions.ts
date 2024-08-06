export class Authenticate {
  static readonly type = '[Auth] Authenticate';
  constructor(
    public payload: {
      email: string;
      password: string;
      mode: 'login' | 'register';
    }
  ) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}
