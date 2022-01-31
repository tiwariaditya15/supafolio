import { useEffect } from "react";
import { useRouter } from "next/router";
import LogIn from "../components/LogIn";
import supabase from "../utils/supabase";
const Login = () => {
  const router = useRouter();
  useEffect(() => {
    if (supabase.auth.user()) {
      router.push("/");
    }
  }, [router]);
  return <LogIn />;
};

export default Login;
