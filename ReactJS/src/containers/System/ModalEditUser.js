import _ from "lodash";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",

      firstName: "",
      lastName: "",
      address: "",
    };
  }

  componentDidMount() {
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        email: user.email,
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      });
    }
  }
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
    let arrInput = ["email", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter:" + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleSaveUser = () => {
    let isValid = this.checkValidInput();

    if (isValid) {
      this.props.editUser(this.state);
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
        <ModalHeader toggle={() => this.toggle()}>Edit user</ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input
                type="text"
                value={this.state.email}
                onChange={(e) => this.handleChangeInput(e, "email")}
                disabled
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
          <Button color="primary" onClick={() => this.handleSaveUser()}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
