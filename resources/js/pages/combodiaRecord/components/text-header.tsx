import React from 'react';
import styled from 'styled-components';

const TextHeader = () => {
  return (
    <StyledWrapper className="mb-4">
      <button className="button">
        Cambodia&apos;s Record
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    position: relative;
    border: none;
    background: transparent;
    font-weight: 700;
    font-family: "Poppins", sans-serif;
    text-transform: uppercase;
    letter-spacing: 2px;
    cursor: default;
    color: #3B82F6; /* Tailwind blue-500 */
    -webkit-text-stroke: 1px #1e3a8a; /* blue-900 stroke */
    background: linear-gradient(90deg,#3B82F6,#2563EB,#1D4ED8,#60A5FA);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent; /* for gradient text */
    background-size: 300%;
    text-align: center;
    
    /* Responsive font sizes */
    font-size: 1.5rem;

    @media (min-width: 640px) {
      font-size: 1.5rem; /* sm */
    }
    @media (min-width: 768px) {
      font-size: 1.5rem; /* md */
    }
    @media (min-width: 1024px) {
      font-size: 1.5rem; /* lg */
    }
    @media (min-width: 1280px) {
      font-size: 2rem; /* xl */
    }
  }
`;

export default TextHeader;
