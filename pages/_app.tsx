import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import supabase from "../utils/supabase";
import "../styles/globals.css";
import { wrapper } from "../app/store";

function MyApp({ Component, pageProps }: AppProps) {
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    if (supabase.auth.user()) {
      setLogged(true);
    }
  }, []);
  return (
    <>
      <section
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          backgroundColor: "#E2E8F0",
          height: "8vh",
        }}
      >
        <p>{logged ? "You're logged." : "Please login."}</p>
      </section>
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
