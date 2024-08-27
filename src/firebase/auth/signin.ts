import {
  signInWithEmailAndPassword,
  UserCredential,
  signOut as firebaseSignOut,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from "firebase/auth";
import { auth } from "../config";
import { signIn as signInProps } from "@/lib/validators/auth";

export default async function signIn({
  email,
  password,
}: signInProps): Promise<UserCredential> {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
}

export async function signOut() {
  try {
    return await firebaseSignOut(auth);
  } catch (error) {
    throw error;
  }
}

export async function deleteAccount() {
  try {
    auth.currentUser?.delete();
  } catch (error) {
    throw error;
  }
}

export async function signInGoogle(): Promise<User> {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    throw error;
  }
}
