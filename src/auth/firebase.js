import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

//* Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

//? https://firebase.google.com/docs/auth/web/start adresindeki veri çekme islemini async await ile yaptik.
export const createUser = async (email, password, navigate, displayName) => {
  // ! yeni bir kullanici olusturmak icin kullanilan firebase metodu
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    //? kullanici register olduktan hemen sonra user bilgisinin güncellenmesi gerekiyor..
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
    navigate("/");

    console.log(userCredential);
  } catch (error) {
    alert(error.message);
  }
};

export const signIn = async (email, password, navigate) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    navigate("/");
    console.log(userCredential);
  } catch (error) {
    alert(error.message);
  }
};

//? Kullanıcının signin olup olmadığını takip eden ve kullanıcı değiştiğinde yeni kullanıcıyı response olarak dönen firebase metodu
export const userObserver = (setCurrentUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const { email, displayName, photoURL } = user;
      setCurrentUser({ email, displayName, photoURL });
    } else {
      setCurrentUser(false);
      console.log("user signed out");
    }
  });
};

export const logOut = () => {
  signOut(auth);
};

//* => Authentication => settings => Authorized domains => add domain
//! Projeyi deploy ettikten sonra google sign-in çalışması için domain listesine deploy linkini ekle

export const signUpWithGoogle = (navigate) => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      navigate("/");
    })
    .catch((error) => {
      console.log(error);
    });
};

//! .env dosyasinde degisiklik yaptiktan sonra projenin kapatilip yekrar acilmasi gerekiyor.(olusan degisikliklerin yansimasi icin)
//? REACT_APP yazimi zorunlu

//* catch (error) console.log(error.message)
//? error icindeki message'ı yazdirmak icin.

//* register isleminin basarili olmasi durumunda home sayfasina yönlenmesi icin navigate hookunu try icine almamiz lazim.aksi takdirde basarili-basarisiz tüm denemelerde anasayfaya yönlenecektir ki bu da istenmeyen bir durumdur.

//! her bir metodu fonksiyon haline getirip export edip istedigimiz yerde kullanmka bir avantaj (export const ...)
