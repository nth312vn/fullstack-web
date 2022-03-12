import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { emitter } from "../../utils/emitter";
import ModalEditUser from "./ModalEditUser";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUser,
} from "../../services/userService";
import ModalUser from "./ModalUser";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUser: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUserFromReact();
  }
  getAllUserFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({ arrUser: response.users });
    }
  };
  handleAddNewUser = () => {
    this.setState({ isOpenModalUser: true });
  };
  toggleUserModal = () => {
    this.setState({ isOpenModalUser: !this.state.isOpenModalUser });
  };
  createNewUser = async (data) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errCode !== 0) {
        alert(res.errMessage);
      } else {
        await this.getAllUserFromReact();
        this.setState({ isOpenModalUser: false });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleDelelteUser = async (user) => {
    try {
      let res = await deleteUserService(user.id);
      console.log(res);
      if (res && res.errCode === 0) {
        await this.getAllUserFromReact();
      } else {
        alert(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleEditUser = (user) => {
    this.setState({ isOpenModalEditUser: true });
    this.setState({ userEdit: user });
  };
  toggleEditModal = () => {
    this.setState({ isOpenModalEditUser: !this.state.isOpenModalEditUser });
  };
  doEditUser = async (user) => {
    try {
      let res = await editUser(user);

      if (res && res.message.errCode === 0) {
        this.setState({
          isOpenModalEditUser: false,
        });
        await this.getAllUserFromReact();
      } else {
        alert(res.message.message);
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    const arrUser = this.state.arrUser;
    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            toggleFromParent={this.toggleEditModal}
            currentUser={this.state.userEdit}
            editUser={this.doEditUser}
          />
        )}
        <div className="title text-center">Manage users</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus"></i>Add new user
          </button>

          <div className="user-table mt-3 mx-1">
            <table id="customers">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Adress</th>

                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {arrUser &&
                  arrUser.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.email}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>

                        <td>{item.address}</td>
                        <td>
                          <button
                            className="btn-edit"
                            onClick={() => this.handleEditUser(item)}
                          >
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => this.handleDelelteUser(item)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
