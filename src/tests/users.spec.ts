import UserStore from "../models/user";


const userStore = new UserStore();

describe('User Model', () => {
    it('test create new user', async () => {
        const user = await userStore.create('mohamed', 'gamal', 'mohamedgamal@gmail.com', 'password1234');
        delete user['password']
        expect(user).toEqual({
            id: user.id,
            firstname: 'mohamed',
            email: 'mohamedgamal@gmail.com',
            lastname: 'gamal',

        });
    });

    it('test get user', async () => {
        const createdUser = await userStore.create('hassan', 'fahd', 'hassan@gmail.com', 'pass1234');
        const userInDb = await userStore.show(String(createdUser.id));
        delete userInDb['password']
        delete createdUser['password']
        expect(userInDb).toEqual(createdUser);
    });


});
