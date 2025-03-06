// src/SelectComponent.js
import React from 'react';
import { Form } from 'react-bootstrap';

function SelectComponent({ selectedOption, onValueChange, options }) {
    return (
        <Form.Group controlId="exampleForm.SelectCustom">
            {/* <Form.Label>Select Option</Form.Label> */}
            <Form.Control
                as="select"
                value={selectedOption}
                onChange={(e) => onValueChange(e.target.value)}
                className="w-44 border-gray-600 capitalize"
            >
                {options.map((option) => (
                    <option
                        className="capitalize"
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </Form.Control>
        </Form.Group>
    );
}

export default SelectComponent;
