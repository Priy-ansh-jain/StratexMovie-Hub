import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import Movies from "./components/Movies";
import "./index.css";
import Favorites from "./components/Favorites";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Movies />
        <Favorites />
      </div>
    </Provider>
  );
}

export default App;
