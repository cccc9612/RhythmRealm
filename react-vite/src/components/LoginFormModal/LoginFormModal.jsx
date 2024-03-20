import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { FaCircleExclamation } from "react-icons/fa6";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        credential,
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
    setCredential("demo@aa.io");
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
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          placeholder="Email or username"
          required
        />
        <p>{errors.credential &&
          (<><FaCircleExclamation color="#f15e6c" />
            {" " + errors.credential} </>)
          }</p>
        <label>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <p>
          { errors.password && <><FaCircleExclamation color="#f15e6c" /> {` ${errors.password}`} </> }
        </p>
        <button className="submit-btn" type="submit">Log In</button>
        <button className="Demouser-login" onClick={DemoUserLogin} type="submit">
          Log in as Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
