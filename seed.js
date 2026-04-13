import { initializeApp } from "firebase/app";
import { getFirestore, setDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSJLZ1B3NoPXOibYJRuRjtrK5xYcGdGY4",
  authDomain: "bentilzone-local.firebaseapp.com",
  projectId: "bentilzone-local",
  storageBucket: "bentilzone-local.firebasestorage.app",
  messagingSenderId: "718688542828",
  appId: "1:718688542828:web:61a36288e0138dfc957849",
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔥 mapping kategori → prefix gambar
const categories = [
  { name: "chicken", prefix: "c" },
  { name: "curry", prefix: "cu" },
  { name: "desserts", prefix: "d" },
  { name: "fruits", prefix: "f" },
  { name: "fish", prefix: "fi" },
  { name: "icecreams", prefix: "i" },
  { name: "rice", prefix: "r" },
];

const foods = [];

let id = 1;

// 🔥 generate otomatis
categories.forEach((cat) => {
  for (let i = 1; i <= 10; i++) {
    foods.push({
      id: id,
      title: `${cat.name.toUpperCase()} ${i}`,
      price: 10000 + Math.floor(Math.random() * 20000),
      calories: 100 + Math.floor(Math.random() * 300),
      category: cat.name,
      imageURL: `${cat.prefix}${i}.png`,
      description: `${cat.name} delicious item ${i}`,
    });
    id++;
  }
});

// 🔥 upload ke Firestore
const upload = async () => {
  for (let item of foods) {
    await setDoc(doc(db, "Food", item.id.toString()), item);
  }
  console.log("✅ 80+ menu berhasil dibuat!");
};

upload();