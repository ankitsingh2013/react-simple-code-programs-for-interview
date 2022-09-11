import React, { useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => {
        const transformedData = data.map((item) => {
          //console.log(item);
          return {
            id: item.id,
            title: item.title,
            body: item.body,
          };
        });
        //console.log(transformedData);
        setPosts(transformedData);
        setLoading(false);
      })
      .catch((error) => setError(error.message));
  }, []);
  if (loading) {
    return <p>Loading....</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div className="App">
      <table>
        <tr>
          <th>#SlNo</th>
          <th>Title</th>
          <th>Body</th>
          <th>Add Next</th>
        </tr>
        {posts.map((post) => {
          const { id, title, body } = post;
          return (
            <tr>
              <td>{id}</td>
              <td>{title}</td>
              <td>{body}</td>
              <td>
                <button>X</button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
