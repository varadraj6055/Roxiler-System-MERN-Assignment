// src/SearchInput.js
import React from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import { Search } from 'lucide-react';

export default function SearchInput({ placeholder, value, onChangeValue }) {
    return (
        <div className="d-flex align-items-center">
            <InputGroup>
                <InputGroup.Text>
                    <Search size={16} />
                </InputGroup.Text>
                <FormControl
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChangeValue}
                    className="border border-slate-500 rounded-md bg-transparent focus:outline-none focus:border-white"
                />
            </InputGroup>
        </div>
    );
}
