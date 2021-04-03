import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { fetchPost } from "./api";

export default function App2() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/post/:postId" component={Post} />
      </Switch>
    </Router>
  );
}

function Home({ history }) {
  const [postId, setPostId] = React.useState("");
  return (
    <div>
      <h1>Welcome!</h1>
      <h2>Search for a post by its ID</h2>

      <label htmlFor="postId">Post ID: </label>
      <input
        id="postId"
        value={postId}
        onChange={e => setPostId(e.target.value)}
      />
      <button
        disabled={!postId}
        onClick={() => history.push(`/post/${postId}`)}
      >
        Submit
      </button>
    </div>
  );
}

function Post({ match }) {
  const { postId } = match.params;
  const [post, setPost] = React.useState();
  React.useEffect(() => {
    (async function fetch() {
      setPost(await fetchPost(postId));
    })();
  }, [postId]);
  return (
    <div>
      <h1>Post {postId}</h1>
      {!post ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </>
      )}
      <Link to="/">Back to Home</Link>
    </div>
  );
}