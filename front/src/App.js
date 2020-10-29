import React, { useState, useEffect } from "react";
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

  const deleteMovieBtnOnClick = (movieId) => {
    axios
      .delete(`http://localhost:5000/movie?id=${movieId}`)
      .then((response) => {
        alert("삭제가 완료되었습니다");
      })
      .catch((error) => {
        alert("에러 발생");
      });
  };

  useEffect(() => {
    axios.get("http://localhost:5000/movies").then((response) => {
      setMovies(response.data);
    });
  }, [movies]);

  return (
    <div>
      <h2>영화 리스트! </h2>
      {movies.map((movie) => {
        return (
          <div key={movie.id}>
            <ul>
              <li>영화 제목: {movie.name}</li>
              <li>영화 가격: {movie.price}</li>
              <button
                onClick={() => {
                  deleteMovieBtnOnClick(movie.id);
                }}
              >
                삭제하기
              </button>
            </ul>
          </div>
        );
      })}

      <div>
        <h3>영화 등록하기!</h3>
        <span>영화 이름: </span>
        <input type="text" value={name} onChange={nameOnChange}></input>
        <div>
          <span>가격: </span>
          <input type="number" value={price} onChange={priceOnChange}></input>
        </div>
        <button onClick={buttonOnClick}>등록하기</button>
      </div>
    </div>
  );
}

export default App;
