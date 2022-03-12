import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };
    this.listenToEmitter();
  }
  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
      });
    });
  }

  componentDidMount() {}
  toggle = () => {
    this.props.toggleFromParent();
  };
  handleChangeInput = (e, id) => {
    const copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  checkValidInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter:" + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleAddNewUser = () => {
    let isValid = this.checkValidInput();
    console.log(isValid);
    if (isValid) {
      this.props.createNewUser(this.state);
    }
  };
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={"modal-user-container"}
        size="lg"
        centered
      >
        <ModalHeader toggle={() => this.toggle()}>Add new user</ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input
                type="text"
                value={this.state.email}
                onChange={(e) => this.handleChangeInput(e, "email")}
              />
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                value={this.state.password}
                onChange={(e) => this.handleChangeInput(e, "password")}
              />
            </div>
            <div className="input-container">
              <label>First Name</label>
              <input
                type="text"
                value={this.state.firstName}
                onChange={(e) => this.handleChangeInput(e, "firstName")}
              />
            </div>
            <div className="input-container">
              <label>Last Name</label>
              <input
                type="text"
                value={this.state.lastName}
                onChange={(e) => this.handleChangeInput(e, "lastName")}
              />
            </div>
            <div className="input-container max-width-input">
              <label>Address</label>
              <input
                type="text"
                value={this.state.address}
                onChange={(e) => this.handleChangeInput(e, "address")}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.handleAddNewUser()}>
            Save change
          </Button>{" "}
          <Button color="secondary" onClick={() => this.toggle()}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
