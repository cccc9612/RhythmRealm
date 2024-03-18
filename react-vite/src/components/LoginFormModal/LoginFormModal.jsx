import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  const DemoUserLogin = () => {
    setEmail("demo@aa.io");
    setPassword("password");
  }

  return (
    <div className='login-modal-container'>
      <h1>Log in to RR</h1>
      <form className='login-form-container' onSubmit={handleSubmit}>
        <label>
          Email or username
        </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <p>{errors.email}</p>}
        <label>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <p>{errors.password}</p>}
        <button className="submit-btn" type="submit">Log In</button>
        <button className="Demouser-login"  onClick={DemoUserLogin} type="submit">
          Log in as Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
