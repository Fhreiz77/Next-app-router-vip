import { getFirestore } from "firebase-admin/firestore";
import { db } from "./admin";
import bcrypt from "bcrypt";

export async function retrieveData(collectionName: string) {
  const snapshot = await db.collection(collectionName).get();
  return snapshot.docs.map((d: any) => ({
    id: d.id,
    ...d.data(),
  }));
}

export async function retrieveDataById(collectionName: string, id: string) {
  const snapshot = await db.collection(collectionName).doc(id).get();
  return snapshot.data();
}

export async function register(data: {
  fullname: string;
  email: string;
  password: string;
  role?: string;
}) {
  const snapshot = await db
    .collection("users")
    .where("email", "==", data.email)
    .get();

  if (!snapshot.empty) {
    return { status: false, statusCode: 400, message: "*Email already exist" };
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);
  await db.collection("users").add({
    ...data,
    role: "admin",
    password: hashedPassword,
  });

  return { status: true, statusCode: 200, message: "Register Success" };
}

export async function login(data: { email: string }) {
  const snapshot = await db
    .collection("users")
    .where("email", "==", data.email)
    .get();

  if (snapshot.empty) return null;

  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
}

export async function loginWithGoogle(data: any) {
  const snapshot = await db
    .collection("users")
    .where("email", "==", data.email)
    .get();

  if (!snapshot.empty) {
    const docUser = snapshot.docs[0];
    data.role = docUser.data().role;
    await db.collection("users").doc(docUser.id).update(data);
    return { status: true, data };
  }

  data.role = "member";
  await db.collection("users").add(data);
  return { status: true, data };
}