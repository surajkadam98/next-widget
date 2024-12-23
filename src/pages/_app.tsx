import { ModalProvider } from "@/@components/context/ModalContext";
import ModalWrapper from "@/layouts/ModalWrapper";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <ModalProvider>
        <Component {...pageProps} />
        <ModalWrapper />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          theme="light"
          hideProgressBar={false}
          newestOnTop={false}
          pauseOnFocusLoss={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
        />
      </ModalProvider>
  );
}
