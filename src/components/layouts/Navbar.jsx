import { useState } from "react";

function Navbar({ setAuth, searchFilter, setSearchFilter }) {

  function signOut() {
    sessionStorage.removeItem("imageGalleryAuth");
    location.reload();
  }

  function handleSearch(event) {
    const { value } = event.target;
    setSearchFilter(value);
  }

  return (
    <div>
      <nav className="navbar bg-body-tertiary fixed-top">
        <div className="container-fluid px-3">
          <a className="navbar-brand">Navbar</a>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="text"
              placeholder="Search images"
              value={searchFilter}
              onChange={handleSearch}
              aria-label="Search"
            />
            <button onClick={signOut} className="btn btn-outline-danger">
              SignOut
            </button>
          </form>
          
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
