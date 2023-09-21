import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";

function Register({ setLogin, setIsLoading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const API_KEY = import.meta.env;

  const firebaseConfig = {
    apiKey: API_KEY.VITE_REACT_APP_API_KEY,
    authDomain: API_KEY.VITE_REACT_APP_AUTH_DOMAIN,
    projectId: API_KEY.VITE_REACT_APP_PROJECT_ID,
    storageBucket: API_KEY.VITE_REACT_APP_STORAGE_BUCKET,
    messagingSenderId: API_KEY.VITE_REACT_APP_MESSAGING_SENDER_ID,
    appId: API_KEY.VITE_REACT_APP_APP_ID,
    measurementId: API_KEY.VITE_REACT_APP_MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);

  function submit(e) {
    e.preventDefault();

    if (email == "" || password == "") {
      setErrorMsg("Please fill all fields");
      } else {
        setIsLoading(true);
        const authLog = getAuth(app);
        createUserWithEmailAndPassword(authLog, email, password)
          .then((userCredential) => {
            sessionStorage.setItem(
              "imageGalleryAuth",
              userCredential.user.email
            );
            setIsLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setErrorMsg("An error has occurred");
            setIsLoading(false);
          });
        setErrorMsg("");
      }
  }
  return (
    <div>
      <div className="d-flex justify-content-center pt-5">
        <label>REGISTER</label>
      </div>
      <div className="d-grid gap-2 justify-content-center pt-5">
        <span className="text-danger">{errorMsg}</span>
      </div>
      <form className="auth" onSubmit={submit}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          placeholder="Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
          placeholder="Password"
        />
        <button type="submit">Submit</button>
      </form>
      <div className="d-flex justify-content-center">
        <span>Already have an account?</span>
        <button onClick={() => setLogin(true)} className="text-primary">
          Login
        </button>
      </div>
    </div>
  );
}

export default Register;
