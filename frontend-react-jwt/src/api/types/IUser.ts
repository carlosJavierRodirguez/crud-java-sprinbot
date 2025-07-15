export interface IRequestLogin {
  userName: string;
  password: string;

}

export interface IRequestRegister {
  userName: string;
  password: string;
  email: string;
}

export interface IRequestRecoverPassword {
  userName: string;
}