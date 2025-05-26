import admin from "firebase-admin";
// @ts-ignore
import serviceFirebase from '/etc/secrets/firebase-admin-cert.json';


if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceFirebase as admin.ServiceAccount),
    });
}

const db = admin.firestore();
const auth = admin.auth();

export { db, auth, admin };