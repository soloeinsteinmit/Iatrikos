import React, { useState, useEffect } from "react";
import styled from "styled-components";

const loadingStates = [
  "searching medical databases",
  "analyzing drug interactions",
  "reviewing medical literature",
  "performing safety checks",
  "synthesizing findings",
  "generating recommendations",
  "finalizing analysis",
];

const Loader = () => {
  const [currentState, setCurrentState] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentState((prev) => (prev + 1) % loadingStates.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <StyledWrapper>
      <div className="overlay">
        <div className="content">
          <div className="spinner">
            <div className="spinner1" />
          </div>
          <div className="text-content">
            <p className="title">Iatrikos is</p>
            <p key={currentState} className="state">
              {loadingStates[currentState]}...
            </p>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
  }

  .content {
    background: rgba(255, 255, 255, 0.5);
    padding: 2rem;
    width: 300px;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .text-content {
    text-align: center;
  }

  .title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
  }

  .state {
    font-size: 1rem;
    color: #4b5563;
    opacity: 0;
    animation: fadeIn 0.5s ease-in forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .spinner {
    background-image: linear-gradient(rgb(186, 66, 255) 35%, rgb(0, 225, 255));
    width: 100px;
    height: 100px;
    animation: spinning82341 1.7s linear infinite;
    text-align: center;
    border-radius: 50px;
    filter: blur(1px);
    box-shadow: 0px -5px 20px 0px rgb(186, 66, 255),
      0px 5px 20px 0px rgb(0, 225, 255);
  }

  .spinner1 {
    background-color: rgb(36, 36, 36);
    width: 100px;
    height: 100px;
    border-radius: 50px;
    filter: blur(10px);
  }

  @keyframes spinning82341 {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
