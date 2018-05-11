import { UserModel } from './user-model';

describe('UserModelModule', () => {
  let userModelModule: UserModel;

  beforeEach(() => {
    userModelModule = new UserModel();
  });

  it('should create an instance', () => {
    expect(userModelModule).toBeTruthy();
  });
});
