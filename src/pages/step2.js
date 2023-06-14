import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UpBarStep2 from '../img/UpBarStep2.png';
import Trash from '../img/Trash.png';

export default function Step2() {
  const [inputCount, setInputCount] = useState(3);
  const [inputs, setInputs] = useState([]);
  const [checkboxValues, setCheckboxValues] = useState({});
  const [radioValue, setRadioValue] = useState('');

  useEffect(() => {
    const savedInputs = localStorage.getItem('step2Inputs');
    if (savedInputs) {
      setInputs(JSON.parse(savedInputs));
    } else {
      setInputs(['', '', '']);
    }

    const savedCheckboxValues = localStorage.getItem('checkboxValues');
    if (savedCheckboxValues) {
      setCheckboxValues(JSON.parse(savedCheckboxValues));
    }

    const savedRadioValue = localStorage.getItem('radioValue');
    if (savedRadioValue) {
      setRadioValue(savedRadioValue);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('step2Inputs', JSON.stringify(inputs));
  }, [inputs]);

  useEffect(() => {
    localStorage.setItem('checkboxValues', JSON.stringify(checkboxValues));
  }, [checkboxValues]);

  useEffect(() => {
    localStorage.setItem('radioValue', radioValue);
  }, [radioValue]);

  const handleInputChange = (index, value) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  const addInput = () => {
    const newInputCount = inputCount + 1;
    setInputCount(newInputCount);
    setInputs([...inputs, '']);
  };

  const removeInput = (index) => {
    const newInputs = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
    setInputCount(inputCount - 1);
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setCheckboxValues((prevValues) => ({ ...prevValues, [id]: checked }));
  };

  const handleRadioChange = (e) => {
    setRadioValue(e.target.value);
  };

  return (
    <div className="container_step2">
      <div className="header_step2">
        <img src={UpBarStep2} alt="прогресс" />
      </div>
      <div className="form2">
        <form>
          <label>
            Advantages<br></br>
            {inputs.map((input, index) => (
              <div key={`input-${index}`}>
                <input
                  id={`field-advantages-${index}`}
                  className="inputUser_step1"
                  name="advantages"
                  type="text"
                  placeholder="Placeholder"
                  value={input}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
                <img
                  id={`button-remove-${index}`}
                  className="iconTrash"
                  src={Trash}
                  alt="корзина"
                  onClick={() => removeInput(index)}
                />
              </div>
            ))}
          </label>
          <button id='button-add' className="btn-add" type="button" onClick={addInput} />
        </form>
        <div className='checkbox_step1'>
          <p className='checkboxGroup'>Checkbox group</p>
          <input
            id='field-checkbox-group-option-1'
            type='checkbox'
            checked={checkboxValues['field-checkbox-group-option-1']}
            onChange={handleCheckboxChange}
          />
          <span>1</span>
        </div>
        <div className='checkbox_step1'>
          <input
            id='field-checkbox-group-option-2'
            type='checkbox'
            checked={checkboxValues['field-checkbox-group-option-2']}
            onChange={handleCheckboxChange}
          />
          <span>2</span>
        </div>
        <div className='checkbox_step1'>
          <input
            id='field-checkbox-group-option-3'
            type='checkbox'
            checked={checkboxValues['field-checkbox-group-option-3']}
            onChange={handleCheckboxChange}
          />
          <span>3</span>
        </div>
        <div className='checkbox_step1'>
          <p className='radioGroup'>Radio group</p>
          <input
            id='field-radio-group-option-1'
            type='radio'
            value='1'
            checked={radioValue === '1'}
            onChange={handleRadioChange}
          />
          <span>1</span>
        </div>
        <div className='checkbox_step1'>
          <input
            id='field-radio-group-option-2'
            type='radio'
            value='2'
            checked={radioValue === '2'}
            onChange={handleRadioChange}
          />
          <span>2</span>
        </div>
        <div className='checkbox_step1'>
          <input
            id='field-radio-group-option-3'
            type='radio'
            value='3'
            checked={radioValue === '3'}
            onChange={handleRadioChange}
          />
          <span>3</span>
        </div>
      </div>
      <div className='footer_step2'>
        <Link to='/step1'>
          <button id='button-back' className='btn-noactive'>Back</button>
        </Link>
        <Link to='/step3'>
          <button id='button-next' className='btn-active'>Next</button>
        </Link>
      </div>
    </div>
  );
}