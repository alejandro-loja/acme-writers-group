import React, { Component } from "react";
import { render } from "react-dom";
import Users from "./Components/Users";
import User from "./Components/User";
import { fetchUsers, createUser, deleteUser } from "./api";

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      userId: "",
    };
    this.createAUser = this.createAUser.bind(this);
    this.deleteAUser = this.deleteAUser.bind(this);
  }
  async componentDidMount() {
    try {
      const userId = window.location.hash.slice(1);
      this.setState({ userId });
      const response = await fetchUsers();
      this.setState({ users: response.data });
      window.addEventListener("hashchange", () => {
        const userId = window.location.hash.slice(1);
        this.setState({ userId });
      });
    } catch (ex) {
      console.log(ex);
    }
  }

  async createAUser() {
    const user = await createUser();
    const users = [...this.state.users, user];
    this.setState({ users });
  }

  async deleteAUser(user) {
    await deleteUser(user);
    const users = this.state.users.filter((_user) => _user.id !== user.id);
    this.setState({ users });
    if (this.state.userId) {
      window.location.hash = "";
    }
  }

  render() {
    const { users, userId } = this.state;
    const { createAUser, deleteAUser } = this;
    return (
      <div>
        <h1 id="header">Acme Writers Group ({users.length})</h1>
        <section>
          <button onClick={createAUser}>Create New User</button>
        </section>
        <main>
          <Users users={users} userId={userId} deleteAUser={deleteAUser} />
          {userId ? (
            <User userId={userId} />
          ) : (
            <div id="right-section">Choose a Writer</div>
          )}
        </main>
      </div>
    );
  }
}

const root = document.querySelector("#root");
render(<App />, root);
