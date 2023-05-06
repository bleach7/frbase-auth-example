import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";
import { ToastContainer } from "react-toastify";

export const App = () => {
  return (
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
      />
    </ReduxProvider>
  );
};
