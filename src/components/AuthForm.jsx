import { useState } from "react";
import { supabase } from "../supabaseClient";

const AuthForm = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");

    const fn = isSigningUp ? supabase.auth.signUp : supabase.auth.signInWithPassword;
    const { data, error } = await fn({ email, password });

    if (error) {
      setError(error.message);
    } else {
      setUser(data.user);
    }
  };

  return (
    <form onSubmit={handleAuth} className="space-y-4 p-6 bg-white dark:bg-gray-800 shadow rounded w-full max-w-sm">
      <h2 className="text-xl font-bold text-center">{isSigningUp ? "Sign Up" : "Log In"}</h2>
      <input
        className="w-full p-2 border rounded dark:bg-gray-600 dark:text-white"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="w-full p-2 border rounded dark:bg-gray-600 dark:text-white"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700" type="submit">
        {isSigningUp ? "Sign Up" : "Log In"}
      </button>
      <p className="text-center text-sm cursor-pointer text-blue-500" onClick={() => setIsSigningUp(!isSigningUp)}>
        {isSigningUp ? "Already have an account? Log in" : "Don't have an account? Sign up"}
      </p>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </form>
  );
};

export default AuthForm;
