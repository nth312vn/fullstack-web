import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import handleLoginApi from "../../services/userService";
import { userLoginSuccess } from "../../store/actions";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPass: false,
      errMessage: "",
    };
  }
  handleChangeUsername = (e) => {
    this.setState({ username: e.target.value });
  };
  handleChangePass = (e) => {
    this.setState({ password: e.target.value });
  };
  handleLogin = async () => {
    this.setState({ errMessage: "" });
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({ errMessage: data.message });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
      }
    } catch (err) {
      if (err.response) {
        if (err.response.data) {
          this.setState({ errMessage: err.response.data.message });
        }
      }
    }
  };
  handleShowHide = () => {
    this.setState({ isShowPass: !this.state.isShowPass });
  };
  render() {
    return (
      <div className="login-background">
        <div className="login-container ">
          <div className="login-content row">
            <div className="col-12 login-text">Login</div>
            <div className="col-12 form-group login-input">
              <label>User name</label>
              <input
                type="text"
                value={this.state.username}
                className="form-control"
                placeholder="Enter your Username"
                onChange={(e) => this.handleChangeUsername(e)}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Password</label>
              <div className="custom-input">
                <input
                  type={this.state.isShowPass ? "text" : "password"}
                  value={this.state.password}
                  className="form-control"
                  placeholder="Enter your Password"
                  onChange={(e) => this.handleChangePass(e)}
                />
                <span onClick={() => this.handleShowHide()}>
                  <i
                    className={
                      this.state.isShowPass ? "far fa-eye-slash" : "far fa-eye"
                    }
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12">
              <button className="btn-login" onClick={() => this.handleLogin()}>
                Login
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-password">Forgot your password</span>
            </div>
            <div className="col-12 text-center mt-3">
              <span className="text-other-login">Or login with:</span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g google"></i>
              <i className="fab fa-facebook-f facebook"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),

    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
