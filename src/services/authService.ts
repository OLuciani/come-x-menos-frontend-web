import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase-config";

export interface AuthResponse {
  user: any;
  error?: string;
}

export async function registerUserWithFirebase(email: string, password: string): Promise<AuthResponse> {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Usuario creado con éxito en Firebase:", userCredential.user);

    return { user: userCredential.user };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
}

export async function loginUserWithFirebase(email: string, password: string): Promise<AuthResponse> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Usuario autenticado con éxito en Firebase:", userCredential.user);

    return { user: userCredential.user };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
}

