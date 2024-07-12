import { createUserWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth } from "../config";
import { signUp as signUpProps } from "@/lib/validators/auth";

export default async function signUp({
  email,
  password,
}: signUpProps): Promise<UserCredential> {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
}
