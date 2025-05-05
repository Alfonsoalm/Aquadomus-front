import { BrowserRouter } from "react-router-dom";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import styles from "./index.module.css";
import { Central } from "./layout/Central";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.appContainer}>
        <Header />
        <Central />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;