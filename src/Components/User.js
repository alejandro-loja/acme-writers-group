import React, { Component } from "react";
import axios from "axios";
import {
  fetchAUser,
  fetchStories,
  createStory,
  deleteStory,
  favoriteStory,
} from "../api";

class User extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      stories: [],
    };
    this.createAStory = this.createAStory.bind(this);
    this.deleteAStory = this.deleteAStory.bind(this);
    this.favoriteAStory = this.favoriteAStory.bind(this);
  }
  async componentDidMount() {
    let response = await fetchAUser(this.props.userId);
    this.setState({ user: response.data });
    response = await fetchStories(this.props.userId);
    this.setState({ stories: response.data });
  }
  async componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      let response = await axios.get(`/api/users/${this.props.userId}`);
      this.setState({ user: response.data });
      response = await axios.get(`/api/users/${this.props.userId}/stories`);
      this.setState({ stories: response.data });
    }
  }

  async createAStory() {
    const userId = this.state.user.id;
    const story = await createStory(userId);
    const stories = [...this.state.stories, story];
    this.setState({ stories });
  }

  async deleteAStory(story) {
    await deleteStory(story);
    const stories = this.state.stories.filter(
      (_story) => _story.id !== story.id
    );

    this.setState({ stories });
  }

  async favoriteAStory(story) {
    const updatedStory = await favoriteStory(story);
    let stories = this.state.stories.filter((_story) => _story.id !== story.id);
    stories = [...stories, story];
    this.setState({ stories });
  }

  render() {
    const { user, stories } = this.state;
    const { createAStory, deleteAStory, favoriteAStory } = this;
    return (
      <div id="right-section">
        <div id="user-header">
          <h2> Details for {user.name}</h2>
          <h4>{user.bio}</h4>
        </div>
        <ul>
          <li>
            <button onClick={createAStory}>Create A Story</button>
          </li>
          {stories.map((story) => {
            return (
              <li key={story.id}>
                <h3>
                  <button
                    onClick={() => {
                      favoriteAStory(story);
                    }}
                    className={story.favorite ? "favorite" : "not-favorite"}
                  >
                    {story.favorite ? "fave" : "not fave"}
                  </button>{" "}
                  {story.title}{" "}
                  <button
                    onClick={() => {
                      deleteAStory(story);
                    }}
                  >
                    x
                  </button>
                </h3>
                <p>{story.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default User;
