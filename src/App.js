import './App.css';
import { useState, useEffect } from 'react';

function App() {
  // the `posts` variable will start as an empty array
  const [posts, setPosts] = useState([]);
  // the `fetchStatus` variable will serve as a way to determine what is happening below
  const [fetchStatus, setFetchStatus] = useState('ready');

  // useEffect runs every time there's a re-render, we could have put an empty array as the second parameter to make it run only once, but then subsequent data fetches would have been weird to implement. Instead, the hook runs any time `fetchStatus` changes. It's not a perfect solution, but we bail fast if we aren't ready to load again.
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

  // `PostList` is another component to... list the posts?
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

  // The `ReloadButton` component set's the `fetchStatus` to "ready", firing the useEffect hook and re-fetching the data.
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

      // Finally, `fetchStatus` controls what is visible in every case.
      {fetchStatus === 'loading' &&
        <section>
          <h2>Loading...</h2>
        </section>
      }

      {fetchStatus === 'done' &&
        <section>
          <ReloadButton />
          <PostList />
        </section>
      }

      {fetchStatus === 'error' &&
        <section>
          <h2>Error 😵</h2>
          <p>There was an error loading your posts, please try again.</p>
          <ReloadButton />
        </section>
      }
    </div>
  );
}

export default App;
