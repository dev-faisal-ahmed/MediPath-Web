import mongoose from 'mongoose';
import { User } from '../modules/user/model';
import { encryptPassword } from '../helpers';
import { ADMIN_ID, ADMIN_PASSWORD, MONGO_URI } from '../app/config';

export const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI!);
    const password = await encryptPassword(ADMIN_PASSWORD);
    await User.create({ userId: ADMIN_ID, password, name: 'Saidur Rahman' });

    console.log('************* START *************');
    console.log('UserId :', ADMIN_ID);
    console.log('Password :', ADMIN_PASSWORD);
    console.log('************* END *************');
  } catch (error) {
    console.log('************* ERROR *************');
    console.log('Error :', error.message);
    console.log('************* END *************');
  } finally {
    await mongoose.disconnect();
  }
};

seedAdmin();
