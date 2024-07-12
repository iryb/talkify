import {
  signInWithEmailAndPassword,
  UserCredential,
  signOut as firebaseSignOut,
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
