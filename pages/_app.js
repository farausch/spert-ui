import Navigationbar from '../components/Navbar'
import 'bootstrap/dist/css/bootstrap.css';

import { useEffect } from "react";

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <>
      <Navigationbar />
      <br/>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
