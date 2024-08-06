import React, { useState } from "react";
import "./App.css";
import Context from "./context";
import AuthPage from "./Pages/Auth";
import ChatsPage from "./Pages/Chats";

interface userData {
  username: string;
  secret: string;
}

function App() {
  const [user, setUser] = useState<userData>({ username: "", secret: "" });

  return (
    <Context.Provider value={{ user, setUser }}>
      {user.username ? <ChatsPage /> : <AuthPage />}
    </Context.Provider>
  );
}

export default App;
