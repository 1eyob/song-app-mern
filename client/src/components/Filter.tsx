import React, { useState } from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 12px;
  font-size: 16px;
  border: none;
  cursor: pointer;
`;

const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  z-index: 1;
  margin: 0;
  padding: 0;
  list-style: none;
  background-color: white;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`;

const DropdownItem = styled.li`
  padding: 12px;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const FilterComponent = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>
        {selectedOption || "Select an emotion"}
      </DropdownButton>
      {isOpen && (
        <DropdownList>
          {options.map((option: any) => (
            <DropdownItem
              key={option}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default FilterComponent;
