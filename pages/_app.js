import Navigationbar from '../components/Navbar'
import 'bootstrap/dist/css/bootstrap.css';

import { useEffect } from "react";
import Head from 'next/head';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <>
      <Head>
        <title>EMNLP 2022 Demo</title>
      </Head>
      <Navigationbar />
      <br/>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
