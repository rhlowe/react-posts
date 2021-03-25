import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [fetchStatus, setFetchStatus] = useState('ready');
  useEffect(() => {
    if (fetchStatus === 'ready') {
      setFetchStatus('loading');

      fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(response => {
          console.log(response);
          setPosts(response);
          setFetchStatus('done');
        })
        .catch(() => setFetchStatus('error'));
    }
  }, [fetchStatus]);

  function PostList() {
    return posts.map(post =>
      <article>
        <header>
          <h2>{post.title}</h2>
        </header>

        <p>{post.body}</p>
      </article>
    );
  }

  const handleSubmit = event => {
    event.preventDefault();
    setFetchStatus('ready');
  }
  function ReloadButton() {
    return (
      <section>
      <form onSubmit={handleSubmit}>
        <button>
          {fetchStatus === 'error' ? 'Retry' : 'Reload Posts'}
        </button>
      </form>
      </section>
    )
  }

  return (
    <div className="App">
      <h1>Posts</h1>

      {fetchStatus === 'loading' &&
        <section><h2>Loading...</h2></section>
      }

      {fetchStatus === 'done' &&
        <>
          <ReloadButton />
          <PostList />
        </>
      }

      {fetchStatus === 'error' &&
        <>
          <h2>Error 😵</h2>
          <p>There was an error loading your posts, please try again.</p>
          <ReloadButton />
        </>
      }
    </div>
  );
}

export default App;
