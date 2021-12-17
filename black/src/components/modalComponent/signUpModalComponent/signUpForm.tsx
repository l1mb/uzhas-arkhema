/* eslint-disable jsx-a11y/label-has-associated-control */
import { FormEvent, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthFormProps from "@/types/interfaces/props/formProps/authFormProps";
import styles from "./signUpForm.module.scss";
import RoutesData from "@/components/routesComponent/types/routes/RoutesData";

function SignUpForm(props: AuthFormProps): JSX.Element {
  const [emailProp, setEmail] = useState<string>("");
  const [passwordProp, setPassword] = useState<string>("");
  const [phoneProp, setPhone] = useState<string>("");
  const [usernameProp, setUsername] = useState<string>("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newUser = {
      email: emailProp,
      password: passwordProp,
      phone: phoneProp,
      username: usernameProp,
    };
    props.onSubmit(newUser);
  };

  return (
    <div className={`${styles.formWrapper} container`}>
      <form onSubmit={onSubmit} className={styles.form}>
        <h3>Sign Up</h3>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="username"
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="email"
            onChange={(e) => setEmail(e.currentTarget.value)}
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
          <label>Confirm password</label>
          <input
            type="password"
            className="form-control"
            placeholder="password"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>
        <p className="forgot-password text-right">
          Already registered <NavLink to={RoutesData.signIn.route}>sign in</NavLink>
        </p>
      </form>
    </div>
  );
}
export default SignUpForm;
