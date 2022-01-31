import { FormEvent } from "react";
import supabase from "../utils/supabase";

export default function LogIn(): JSX.Element {
  const login = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // @ts-ignore
      await supabase.auth.signIn({ email: event.target.email.value });
      alert("Check your email box!!");
    } catch (error) {
      alert("Something went erong! Try again!");
    }
  };
  return (
    <form onSubmit={(e) => login(e)}>
      <label htmlFor="email">
        Email:
        <input type="text" id="email" name="email" />
      </label>
      <button type="submit">LogIn</button>
    </form>
  );
}
