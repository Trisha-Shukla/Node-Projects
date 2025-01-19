import "@/styles/globals.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Navbar from "@/components/navbar";
import store, { persistor } from "@/store/store";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div>
          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <div className="container mx-auto p-4">
            <Component {...pageProps} />
          </div>
        </div>
      </PersistGate>
    </Provider>
  );
};

export default MyApp;
