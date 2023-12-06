import React from "react";
import { useState, useEffect, useRef } from "react";
import classes from "./Main.module.css";
import GraphCard from "@/components/graphCard/graphCard";
import ResultCard from "@/components/resultCard/resultCard";
function Main() {
  const [data, setData] = useState([]);
  const [sliderValue, setSliderValue] = useState(1);
  const [currentBtn, setCurrentBtn] = useState(-1);
  const [submitData, setSubmitData] = useState({ xParam: 0, yParam: 0 });
  const [bookTitles, setBookTitles] = useState([
    "Submit the form to view Results",
  ]);

  const genreTitles = ["Action", "Fantasy", "Thriller"];
  function changeCurrentBtn(num: number) {
    setCurrentBtn(num);
  }
  function handleFormSubmit(event: any) {
    event.preventDefault();
    setSubmitData({ xParam: currentBtn, yParam: sliderValue });
    window.scrollTo({ top: 600, behavior: "smooth" });
  }

  useEffect(() => {
    console.log(submitData);
    if (submitData) {
      fetch("http://localhost:8080/getBooks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data.bookValues);
          setBookTitles(data.bookNames);
        });
    }
  }, [submitData]);
  return (
    <div className={classes.bg}>
      <div className={classes.navbar}>
        <h2>Book Selector</h2>
      </div>

      <div className={classes.contentCards}>
        <div className={classes.formCard}>
          <form>
            <p className={classes.genreQn}> Select a Genre you prefer</p>
            <div className={classes.genreButtons}>
              {genreTitles.map((value, index) => {
                return (
                  <button
                    className={classes.genreButton}
                    type="button"
                    style={{
                      backgroundColor: `${
                        index + 1 === currentBtn ? "lightBlue" : "lightGreen"
                      }`,
                    }}
                    onClick={changeCurrentBtn.bind(null, index + 1)}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
            <div className={classes.formGroup}>
              <p className={classes.genreQn}>
                On a scale of 1-10, How Big do you want your book to be ?
              </p>
              <div className={classes.sliderGroup}>
                <input
                  type="range"
                  id="slider"
                  name="slider"
                  min="1"
                  max="10"
                  value={sliderValue}
                  onChange={(event) =>
                    setSliderValue(Number.parseInt(event.target.value))
                  }
                />
                <div className={classes.sliderVal}>{sliderValue}</div>
              </div>
            </div>
            <div className={classes.formGroup}>
              <button
                type="submit"
                className={classes.submitButton}
                onClick={handleFormSubmit}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <ResultCard bookNames={bookTitles}></ResultCard>
      <GraphCard
        studentVector={[submitData.xParam, submitData.yParam]}
        bookVector={data}
        bookNames={bookTitles}
      ></GraphCard>
    </div>
  );
}
export default Main;
