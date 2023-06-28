import { Injectable } from '@nestjs/common';

@Injectable()
class AuthService {
  signup() {
    return { msg: 'I have signed up' };
  }
  signin() {
    return { msg: 'I have signed in' };
  }
}
export default AuthService;
