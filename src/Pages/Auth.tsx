import { FC, useContext, useState } from "react";
import Context from "../context";
import { useForm } from "react-hook-form";
import axios from "axios";

const AuthPage: FC = () => {
  const { user, setUser } = useContext(Context);
  const [username, setUsername] = useState(user.username);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    setUser({
      ...user,
      username,
    });

    axios
      .post("http://localhost:3001/authenticate", { username: username })
      .then((r) => {
        console.log("Response Data:", r.data);
        setUser({ ...r.data, secret: r.data.secret });
      })
      .catch((e) => console.log("Auth Error", e));
  };

  return (
    <div className="background">
      <form onSubmit={handleSubmit(onSubmit)} className="form-card">
        <div className="form-title">Welcome 👋</div>
        <div className="form-subtitle">Set a username to get started</div>
        <div className="auth">
          <div className="auth-label">Username</div>
          <input
            className="auth-input"
            id="username"
            value={username}
            {...register("username", { required: true })}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && (
            <p className="error-msg">This field is required</p>
          )}
          <button className="auth-button" type="submit">
            Enter
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
