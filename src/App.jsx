import { useState } from "react";
import Gallery from "./components/gallery";
import Navbar from "./components/layouts/Navbar";
import Login from "./components/login";
import Register from "./components/Register"

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
              <Gallery auth={auth} searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
            </div>
          ) : (
            <>
              {login ? (
                <Login setLogin={setLogin} setIsLoading={setIsLoading} />
              ):(
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
