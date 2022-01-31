import { useRouter } from "next/router";
import { useEffect } from "react";
import LogIn from "../components/LogIn";
import supabase from "../utils/supabase";

const Login = () => {
  const router = useRouter();
  useEffect(() => {
    if (supabase.auth.user()) {
      router.push("/");
    }
  }, []);
  return <LogIn />;
};

export default Login;
