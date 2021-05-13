import firebase from 'firebase';
import 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDvhaJt_bucxsuQoaYX5ffEOAwACfECBbQ",
  authDomain: "moviecture.firebaseapp.com",
  projectId: "moviecture",
  storageBucket: "moviecture.appspot.com",
  messagingSenderId: "44134551144",
  appId: "1:44134551144:web:ec092dc59b4a0c5a03f5dd"
};
  // Initialize Firebase

  export const db =  firebase.initializeApp(firebaseConfig).firestore();
  const Movies = db.collection('movies');
  
  export const getMovie = async imdbID => {
    const movie = await Movies.doc(imdbID).get()
    return movie.exists ? movie.data() : null;
  }

  export const updateMovie = (imdbID,movie) => {    
    return Movies.doc(imdbID).update(movie);
  }

  export const deleteMovie = imdbID => {
    return Movies.doc(imdbID).delete();
  }