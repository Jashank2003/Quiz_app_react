import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";
import VanillaTilt from "vanilla-tilt";
// import process.env from '../process'
// import { BsMoonStarsFill } from "react-icons/bs";


const LandingPage = () => {
  const [difficulty, setDifficulty] = useState("any");
  const [category, setCategory] = useState("any");
  const navigate = useNavigate();
  const tiltRef = useRef(null);

  useEffect(() => {
    VanillaTilt.init(tiltRef.current, {
      max: 10,
      speed: 1000,
      easing: "cubic-bezier(.03,.98,.52,.99)",
      reverse: true,
      transition: true,
    });

    return () => {
      if (tiltRef.current && tiltRef.current.vanillaTilt) {
        tiltRef.current.vanillaTilt.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const cards = tiltRef.current;

    const handleMouseMove = (e) => {
      const rect = cards.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cards.style.setProperty("--x", `${x}px`);
      cards.style.setProperty("--y", `${y}px`);
    };

    const handleMouseEnter = () => {
      cards.classList.add("active");
    };

    const handleMouseLeave = () => {
      cards.classList.remove("active");
    };

    if (cards) {
      cards.addEventListener("mousemove", handleMouseMove);
      cards.addEventListener("mouseenter", handleMouseEnter);
      cards.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (cards) {
        cards.removeEventListener("mousemove", handleMouseMove);
        cards.removeEventListener("mouseenter", handleMouseEnter);
        cards.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Submitted");
    console.log({ difficulty });
    console.log({ category });

    try {
      const response = await fetch("https://quiz-app-backend-1-yj4m.onrender.com/api/quiz/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ difficulty, category }),
      });

      const data = await response.json();
      console.log("Quiz Questions:", data);

      navigate("/quiz", { state: { questions: data.results } });
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
    }

    console.log("try catch done");
  };

  return (
    <>
      {/* <BsMoonStarsFill className=" mt-8 mx-3 absolute text-5xl text-gray-500"/> */}
      <div
        ref={tiltRef}
        style={{ "--clr": "#FFEE58" }}
        className="mt-16 flex flex-col justify-around items-center w-full md:w-[50%] lg:w-[50%] h-[85vh] mx-auto bg-opacity-30 bg-black pt-1 p-8 tilt-container overflow-hidden myeff"
      >
        <div>

        <h1 className="text-center text-5xl mb-4 font-bold tracking-wider mt-2 text-white">
          Mid<span className=" text-yellow-300 animate-pulse">N</span>ight<span className="animate-pulse text-yellow-300" >T</span>rivia 
          
        </h1>
        

        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center space-y-6"
        >
          <div className="w-full">
            <label
              htmlFor="difficulty"
              className="block text-white text-lg mb-2"
            >
              Select Difficulty:
            </label>
            <select
              id="difficulty"
              name="difficulty"
              value={difficulty}
              onChange={handleDifficultyChange}
              className="block w-full mt-2 p-2 bg-gray-700 border border-gray-500 text-white rounded-md "
            >
              <option value="any">Select Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="relative max-h-60 overflow-y-auto w-full">
            <label
              htmlFor="difficulty"
              className="block text-white text-lg mb-2"
            >
              Select Category:
            </label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={handleCategoryChange}
              className="block w-full p-2 bg-gray-700 border border-gray-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="any">Select Category</option>
              <option value="9">General Knowledge</option>
              <option value="11">Entertainment: Film</option>
              <option value="12">Entertainment: Music</option>
              <option value="14">Entertainment: Video Games</option>
              <option value="15">Entertainment: Books</option>
              <option value="17">Science: Nature</option>
              <option value="18">Science: Computers</option>
              <option value="19">Science: Gadgets</option>
              <option value="20">Mythology</option>
              <option value="21">Sports</option>
              <option value="22">Geography</option>
              <option value="23">History</option>
              <option value="24">Politics</option>
              <option value="25">Art</option>
              <option value="26">Celebrities</option>
              <option value="27">Animals</option>
              <option value="28">Vehicles</option>
              <option value="29">Comics</option>
              <option value="30">Gadgets</option>
              <option value="31">Musicals & Theatres</option>
            </select>
          </div>

          <button
            type="submit"
            href="#_"
            className="relative px-5 py-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group"
          >
            <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
            <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
            <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
            <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
            <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
            <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
              Start Quiz
            </span>
          </button>
          <p className="text-center ">Unleash your inner trivia champion with MidnightTrivia! Where your late-night brainiac skills get a workout and you might just surprise yourself!</p>
        </form>
      </div>
    </>
  );
};

export default LandingPage;
