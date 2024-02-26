import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router, Route, Routes, Link,} from "react-router-dom"; // Allows us to wrap routes & Link to multiple views
import {useState} from "react";

import List from "./components/List.js";
import Form from "./components/Form.js"; 

function App() {
  const id = -1;
  const[post, setPost] = useState(null); // Array which will hold all "Post" objects obtained from the "Form" component
  const [fetchError, setFetchError] = useState();
  const API_URL = "https://jsonplaceholder.typicode.com/posts";

  return (
    <Router>
      <div>

        <nav>
          <ul>
            <li>
              <Link to="/">List</Link>
            </li>
            <li>
              <Link to={`/Form/${id}`}>Form</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<List
                                      API_URL={API_URL}
                                      fetchError={fetchError}
                                      setFetchError={setFetchError}
                                      post={post} 
                                      setPost={setPost}
                                      Link={Link}
                                  />
                                  } /> {/* Page 1 */}
          <Route path="/Form/:id" element={
            <Form 
              API_URL={API_URL}
              fetchError={fetchError}
              setFetchError={setFetchError}
              />
            } /> {/* Page 2 */}
        </Routes>

      </div>
    </Router>
  );
}

export default App;
