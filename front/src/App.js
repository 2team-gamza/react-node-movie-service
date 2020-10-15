import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [movies, setMovies] = useState([]);

  const nameOnChange = (event) => {
    setName(event.target.value);
  };

  const priceOnChange = (event) => {
    setPrice(Number(event.target.value));
  };

  const buttonOnClick = () => {
    axios
      .post("http://localhost:5000/movie", {
        name: name,
        price: price,
      })
      .then((response) => {
        console.log(response);
      });
  };

  const loadButtonOnClick = () => {
    axios.get("http://localhost:5000/movies").then((response) => {
      setMovies(response.data);
    });
  };

  return (
    <div>
      <h2>영화 사이트! </h2>
      {movies.map((movie) => {
        return (
          <div key={movie.id}>
            <ul>
              <li>영화 제목: {movie.name}</li>
              <li>영화 가격: {movie.price}</li>
            </ul>
          </div>
        );
      })}

      <div>
        <h3>영화 등록하기!</h3>
        <input type="text" value={name} onChange={nameOnChange}></input>
        <input type="number" value={price} onChange={priceOnChange}></input>
        <button onClick={buttonOnClick}>등록하기</button>
        <button onClick={loadButtonOnClick}>불러오기</button>
      </div>
    </div>
  );
}

export default App;
