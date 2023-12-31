import { initializeApp } from "firebase/app";
// import { getStorage, getDownloadURL, ref } from "firebase/storage";
import { getFirestore, collection, getDocs, addDoc, type DocumentData } from "firebase/firestore";
import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID, FIREBASE_MEASUREMENT_ID } from '$env/static/private';
import type { Firebase_Project } from "./types";


const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const storage = getStorage(app);

export async function getProjectsData() {

    const collectionRef = collection(db, "projects");
    const querySnapshot = await getDocs(collectionRef);

    let projectList: any[] = [];

    querySnapshot.forEach((doc) => {
        projectList.push(doc.data());
        // console.log(doc.data());
        // console.log(`${doc.id} => ${doc.data()}`);
    });

    // // -- Get download reference [DEBUGGING] -- //
    // const imgRef = ref(storage, '<URL>');
    // const zeURl = await getDownloadURL(imgRef);
    // console.log(`Download URL: ${zeURl}`);
    // // ---------------------------------------- //

    return projectList as Firebase_Project[];
}