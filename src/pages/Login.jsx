import React from "react";

export default function Login() {
    return (
        <>
            <style>{`
        * {
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        body {
          margin: 0;
        }

        .login-container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(to right, #A8BDB7, #F5E7B8);
        }

        .login-card {
          width: 370px;
          padding: 30px 28px;
          border-radius: 12px;

          background: linear-gradient(
            180deg,
            #B7C6C2 0%,
            #EFE2B8 100%
          );

          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
        }

        .title {
          text-align: center;
          font-size: 24px;
          font-weight: 700;
          color: #2F5D50;
          margin-bottom: 22px;
        }

        .form label {
          font-size: 12px;
          color: #2d2d2d;
          margin-bottom: 4px;
          display: block;
        }

        .form input {
          width: 100%;
          height: 36px;
          padding: 0 10px;
          border-radius: 6px;
          border: none;
          margin-bottom: 12px;

          background: #E9E9E9;
          font-size: 12px;
          outline: none;
        }

        .form input::placeholder {
          color: #9CA3AF;
        }

        .row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
          margin-bottom: 16px;
          color: #555;
        }

        .forgot {
          cursor: pointer;
        }

        .btn-primary {
          width: 100%;
          height: 38px;
          background: #2F5D50;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
        }

        .divider {
          margin: 16px 0;
          text-align: center;
          position: relative;
        }

        .divider span {
          font-size: 11px;
          color: #777;
          padding: 0 8px;
          background: transparent;
        }

        .divider::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 0;
          width: 100%;
          height: 1px;
          background: #d1d5db;
          z-index: -1;
        }

        .btn-google {
          width: 100%;
          height: 36px;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          background: #f3f3f3;

          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;

          font-size: 12px;
          cursor: pointer;
        }

        .btn-google img {
          width: 16px;
        }

        .signup {
          text-align: center;
          font-size: 11px;
          margin-top: 14px;
          color: #444;
        }

        .signup span {
          font-weight: 600;
          cursor: pointer;
        }

        /* Custom checkbox */
        .checkbox-container {
          display: flex;
          align-items: center;
          font-size: 11px;
          position: relative;
          padding-left: 24px;
          cursor: pointer;
          user-select: none;
          color: #555;
        }

        .checkbox-container input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }

        .checkmark {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          height: 14px;
          width: 14px;
          background-color: #e9e9e9;
          border-radius: 4px;
          border: 1px solid #ccc;
        }

        /* Checked state */
        .checkbox-container input:checked ~ .checkmark {
          background-color: #2F5D50;
          border-color: #2F5D50;
        }

        /* Checkmark tick */
        .checkmark::after {
          content: "";
          position: absolute;
          display: none;
        }

        .checkbox-container input:checked ~ .checkmark::after {
          display: block;
          left: 4px;
          top: 1px;
          width: 3px;
          height: 7px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
      `}</style>
            <div className="login-container">
                <div className="login-wrapper">
                    <h1 className="title">Hai Again!</h1>
                    <div className="login-card">
                        <div className="form">
                            <label>Email Address</label>
                            <input type="email" placeholder="email@gmail.com" />

                            <label>Password</label>
                            <input type="password" placeholder="Password" />

                            <div className="row">
                                <label className="checkbox-container">
                                    <input type="checkbox" />
                                    <span className="checkmark"></span>
                                    Remember me
                                </label>
                                <span className="forgot">Forgot password?</span>
                            </div>

                            <button className="btn-primary">Sign In</button>

                            <div className="divider">
                                <span>Or</span>
                            </div>

                            <button className="btn-google">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
                                    alt="google"
                                />
                                Continue with Google
                            </button>

                            <p className="signup">
                                Don’t have an account? <span>Sign Up</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}