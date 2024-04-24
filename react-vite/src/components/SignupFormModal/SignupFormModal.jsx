import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import { FaCircleExclamation } from "react-icons/fa6";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirst_Name] = useState("");
  const [last_name, setLast_Name] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    if (Object.values(errors).length) {
      return null;
    }

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password must be the same as the Password",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        first_name,
        last_name,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  useEffect(() => {
    const err = {};
    setHasSubmitted(false);
    if (username.length < 4) err.username = 'It must be 4 or more characters';
    if (email.length === 0) err.email = 'Email is required';
    if (first_name.length === 0) err.first_name = 'First name is required';
    if (last_name.length === 0) err.last_name = 'Last name is required';
    if (password.length < 6) err.password = "Password must be 6 or more characters";
    if (confirmPassword.length < 6) err.confirmPassword = "Confirmed password must be 6 or more characters"
    setErrors(err);
  }, [email, username, first_name, last_name, password, confirmPassword])

  const toggleXClick = () => {
    closeModal();
  }
  
  return (
    <div className='signup-modal-container'>
      <i 
          onClick={toggleXClick}
          className="fa-solid fa-x"></i>
      <h1>Sign up to start listening</h1>
      {hasSubmitted && errors.server && <p>{errors.server}</p>}
      <form className='signup-form-container' onSubmit={handleSubmit}>
        <label>
          Email address
        </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        {hasSubmitted && errors.email && <p><FaCircleExclamation color="#f15e6c" />{" " + errors.email}</p>}
        <label>
          Username
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username (min: 4 characters)"
          required
        />
        {hasSubmitted && errors.username && <p><FaCircleExclamation color="#f15e6c" />{" " + errors.username}</p>}

        <label>
          First name
        </label>
        <input
          type="text"
          value={first_name}
          onChange={(e) => setFirst_Name(e.target.value)}
          placeholder="First name"
          required
        />
        {hasSubmitted && errors.first_name && <p><FaCircleExclamation color="#f15e6c" />{" " + errors.first_name}</p>}

        <label>
          Last name
        </label>
        <input
          type="text"
          value={last_name}
          onChange={(e) => setLast_Name(e.target.value)}
          placeholder="Last name"
          required
        />
        {hasSubmitted && errors.last_name && <p><FaCircleExclamation color="#f15e6c" />{" " + errors.last_name}</p>}

        <label>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password (min: 6 characters)"
          required
        />
        {hasSubmitted && errors.password && <p><FaCircleExclamation color="#f15e6c" />{" " + errors.password}</p>}
        <label>
          Confirm Password
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirmed password (min: 6 characters)"
          required
        />
        {hasSubmitted && errors.confirmPassword && <p><FaCircleExclamation color="#f15e6c" />{" " + errors.confirmPassword}</p>}
        <button className="submit-btn" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
