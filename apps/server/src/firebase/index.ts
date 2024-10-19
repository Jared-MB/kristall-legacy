import { User, UserCredential, createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { auth } from './config';
import { Injectable } from '@nestjs/common';

export const firebaseRegister = async (
  email: string,
  password: string,
): Promise<UserCredential> => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    return user;
  } catch (err) {
    throw new Error(err.message);
  }
};

@Injectable()
export class FirebaseService {
  async deleteUser(user: User){
    try {
      await deleteUser(user);
    }
    catch (err) {
      throw new Error(err.message);
    }
  }
}

export * from './config';