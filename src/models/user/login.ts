import { User } from "./user";

type UserLoginPequest = {
  email: string;
  password: string;
};

export class Login {
  login: (UserLoginPequest) => string;
}
