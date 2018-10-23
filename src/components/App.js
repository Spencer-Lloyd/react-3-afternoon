import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get(`https://practiceapi.devmountain.com/api/posts`).then( results => {
      this.setState({ posts: results.data });
    });
  }

  updatePost(id, text) {
    axios.put(`practiceapi.devmountain.com/api/posts?id=${ id }`, {text}).then( results => {
      this.setState({ post: results.data});
    });
  }

  deletePost(id) {
    axios.delete(`practiceapi.devmountain.com/api/posts?id=${ id }`).then( results => {
      this.setState({posts: results.data});
    });
  }

  createPost(text) {
   axios.post(`practiceapi.devmountain.com/api/posts`, { text }).then( results => {
     this.setState({posts: results.data});
   });
  }

  render() {
    const { posts } = this.state;
  
    return (
      <div className="App__parent">
        <Header />
  
        <section className="App__content">
  
          <Compose createPostFn={this.createPost}></Compose>
          
          {
            posts.map( post => (
              <Post key={ post.id } 
                    text={post.text} 
                    date={post.date}
                    id={post.id}
                    updatePostFn={ this.updatePost }
                    deletePostFn={this.deletePost}></Post>
            ))
          }
  
        </section>
      </div>
    );
  }
}

export default App;
