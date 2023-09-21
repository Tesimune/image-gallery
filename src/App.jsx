import { useState } from "react";
import Gallery from "./components/Gallery.jsx";
import Navbar from "./components/layouts/Navbar.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";

function App() {
  const auth = sessionStorage.getItem("imageGalleryAuth");
  const [login, setLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center p-5">
          <span>Loading.....</span>
        </div>
      ) : (
        <div>
          {auth ? (
            <div>
              <Navbar
                searchFilter={searchFilter}
                setSearchFilter={setSearchFilter}
              />
              <Gallery
                auth={auth}
                searchFilter={searchFilter}
                setSearchFilter={setSearchFilter}
              />
            </div>
          ) : (
            <>
              {login ? (
                <Login setLogin={setLogin} setIsLoading={setIsLoading} />
              ) : (
                <Register setLogin={setLogin} setIsLoading={setIsLoading} />
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}

export default App;
