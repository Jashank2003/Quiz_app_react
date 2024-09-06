import React, { useState } from 'react';

const QuizCard = ({ question, options, onAnswerSelect, questionIndex }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    onAnswerSelect(value);
  };

  return (
    <div className="border border-gray-300 shadow-lg rounded-lg p-6 mx-auto my-6 w-full max-w-3xl bg-gray-800 text-white">
      <h3 className="text-xl font-semibold mb-4">Q {questionIndex + 1}. {question}</h3>
      <div className="space-y-2">
        {options.map((option, index) => (
          <div
            key={index}
            className={`flex items-center p-2 rounded-md cursor-pointer transition-transform transform hover:scale-105 ${selectedOption === option ? 'bg-green-600' : 'bg-gray-700'} ${selectedOption === option ? 'text-white' : 'text-gray-300'}`}
            onClick={() => handleOptionChange({ target: { value: option } })}
          >
            <input
              type="radio"
              id={`option-${index}`}
              name={`question-${questionIndex}`}
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
              className="hidden"
            />
            <label
              htmlFor={`option-${index}`}
              className="flex-1 cursor-pointer text-lg"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizCard;
