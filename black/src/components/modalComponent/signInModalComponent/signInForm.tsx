import { FormEvent, useState } from "react";
import ErrorState from "@/types/interfaces/validation/errorState";
import styles from "./signInForm.module.scss";

interface inputState {
  value: string;
  error: ErrorState | null;
}

function SignInForm(props): JSX.Element {
  const [usernameProp, setusername] = useState<string>("");
  const [passwordProp, setPassword] = useState<string>("");
  const [isFormInvalid, setInvalid] = useState(true);

  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    const body = {
      username: usernameProp,
      password: passwordProp,
    };
    props.onSubmit(body);
  };

  return (
    <div className={`${styles.formWrapper} container`}>
      <form action="submit" className={styles.form} onSubmit={onSubmitForm}>
        <h3>Sign In</h3>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="username"
            onChange={(e) => setusername(e.currentTarget.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="password"
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="customCheck1" />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
        <p className="forgot-password text-right">
          Forgot <a href="https://i.pinimg.com/originals/fa/b0/90/fab0907fb49b1e0929a785b280e2a029.jpg">password?</a>
        </p>
      </form>
    </div>
  );
}

export default SignInForm;
