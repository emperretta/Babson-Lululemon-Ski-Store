import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    orderBy,
} from "firebase/firestore";

// Firebase config from environment variables
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Check if Firebase is configured
const isFirebaseConfigured = firebaseConfig.apiKey && firebaseConfig.projectId;

let db = null;
let ordersRef = null;

if (isFirebaseConfigured) {
    try {
        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        ordersRef = collection(db, "orders");
        console.log("✅ Firebase connected — orders sync across all devices");
    } catch (err) {
        console.warn("⚠️ Firebase init failed, using localStorage fallback:", err);
    }
} else {
    console.warn("⚠️ Firebase not configured — using localStorage (orders only visible on this device)");
}

// --- FIREBASE MODE ---

const addOrderFirebase = async (order) => {
    try {
        const docRef = await addDoc(ordersRef, order);
        return { ...order, firestoreId: docRef.id };
    } catch (err) {
        console.error("Error adding order:", err);
        return null;
    }
};

const subscribeToOrdersFirebase = (callback) => {
    const q = query(ordersRef, orderBy("date", "desc"));
    return onSnapshot(q, (snapshot) => {
        const orders = snapshot.docs.map((d) => ({
            ...d.data(),
            firestoreId: d.id,
        }));
        callback(orders);
    }, (err) => {
        console.error("Error listening to orders:", err);
    });
};

const updateOrderFirebase = async (firestoreId, updates) => {
    try {
        await updateDoc(doc(db, "orders", firestoreId), updates);
    } catch (err) {
        console.error("Error updating order:", err);
    }
};

const deleteOrderFirebase = async (firestoreId) => {
    try {
        await deleteDoc(doc(db, "orders", firestoreId));
    } catch (err) {
        console.error("Error deleting order:", err);
    }
};

// --- LOCALSTORAGE FALLBACK MODE ---

const STORAGE_KEY = "ski_store_orders";

const addOrderLocal = async (order) => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const newOrder = { ...order, firestoreId: String(order.id) };
    data.push(newOrder);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return newOrder;
};

const subscribeToOrdersLocal = (callback) => {
    // Load initial data
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    callback(data);

    // Poll for changes every 2 seconds (localStorage doesn't have real-time listeners)
    const interval = setInterval(() => {
        const freshData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        callback(freshData);
    }, 2000);

    return () => clearInterval(interval);
};

const updateOrderLocal = async (firestoreId, updates) => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const updated = data.map((o) =>
        o.firestoreId === firestoreId ? { ...o, ...updates } : o
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

const deleteOrderLocal = async (firestoreId) => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const filtered = data.filter((o) => o.firestoreId !== firestoreId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

// --- EXPORT the right functions based on config ---

export const addOrder = isFirebaseConfigured && db ? addOrderFirebase : addOrderLocal;
export const subscribeToOrders = isFirebaseConfigured && db ? subscribeToOrdersFirebase : subscribeToOrdersLocal;
export const updateOrder = isFirebaseConfigured && db ? updateOrderFirebase : updateOrderLocal;
export const deleteOrderFromDB = isFirebaseConfigured && db ? deleteOrderFirebase : deleteOrderLocal;
export const useFirebase = isFirebaseConfigured && db;
