import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "../src/reducers";
import thunkMiddleware from "redux-thunk";
import Ti from "./ti";
import Navigation from "../src/components/communComponents/Navigation";
import Footer from "../src/components/communComponents/Footer";

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

const TiPage = () => (
  <Provider store={store}>
    <div style={{ minHeight: "100%", backgroundColor: "#cad4de" }}>
      <Navigation logout />
      <div className="container">
        <h1>Chercher au plus proche du majeur à protéger</h1>
        <br />
      </div>
      <Ti style={{ marginTop: "100%" }} />
      <Footer />
    </div>
  </Provider>
);

export default TiPage;
