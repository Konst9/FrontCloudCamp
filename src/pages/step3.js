import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import UpBarStep3 from '../img/UpBarStep3.png';
import IconOk from '../img/IconOk.png';
import IconNG from '../img/IconNG.png';

export default function Step3() {

  const [aboutText, setAboutText] = useState(() => {
    const saved = window.localStorage.getItem('inputForm3');
    const initialValue = JSON.parse(saved);
    return initialValue || '';
  });

  useEffect(() => {
    window.localStorage.setItem('inputForm3', JSON.stringify(aboutText))
  }, [aboutText])

  const maxCharacterCount = 200;

  const handleAboutChange = (event) => {
    const text = event.target.value;
    setAboutText(text);
  };

  function sendForm() {
    document.getElementsByClassName('mask')[0].style.display = 'block';
    document.getElementsByClassName('formsend')[0].style.display = 'block';
  }

  function errorForm() {
    document.getElementsByClassName('mask')[0].style.display = 'block';
    document.getElementsByClassName('formerror')[0].style.display = 'block';
  }
  function closeErrorForm() {
    document.getElementsByClassName('mask')[0].style.display = 'none';
    document.getElementsByClassName('formerror')[0].style.display = 'none';
  }


  function sendData() {
    const keys = ['tel', 'email', 'nickname', 'name', 'sername', 'sex', 'step2Inputs', 'checkboxValues', 'radioValue', 'inputForm3'];

    const data = {};

    keys.forEach(key => {
      const value = localStorage.getItem(key);
      data[key] = value;
    })

    fetch('https://api.sbercloud.ru/content/v1/bootcamp/frontend', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(result => {
      console.log('Результат API:', result);
      document.getElementsByClassName('mask')[0].style.display = 'block';
      document.getElementsByClassName('formsend')[0].style.display = 'block';
    })
    .catch(error => {
      console.error('Ошибка при отправке данных', error);
      document.getElementsByClassName('mask')[0].style.display = 'block';
      document.getElementsByClassName('formerror')[0].style.display = 'block';
    })
  }


  return (
    <div className='container_step3'>
      <div className='header_step3'>
        <img src={UpBarStep3} alt='прогресс'/>
      </div>
      <div className='form3'>
        <p className='about_form3'>About</p>
        <textarea
          id="field-about"
          className="inputForm3"
          type="text"
          placeholder="Placeholder"
          maxLength={maxCharacterCount}
          style={{ fontFamily: 'sans-serif', padding: '12px' }}
          value={aboutText}
          onChange={handleAboutChange}
        ></textarea>
        <div className="characterCount">{aboutText.length}/{maxCharacterCount}</div>
      </div>
      <div className='formsend'>
        <div className='formbody'>
          <p>Форма успешно отправлена</p>
          <img src={IconOk} alt='iconOk' style={{marginTop: '50px'}}/>
          <Link to='/main'>
            <button id='button-to-main' className='btn-main'>На главную</button>
          </Link>   
        </div>
      </div>
      <div className='footer_step3'>
        <Link to='/step2'>
            <button id='button-back' className='btn-noactive'>Назад</button>
        </Link>
        <Link to=''>
            <button id='button-send' className='btn-active' onClick={sendData}>Отправить</button>
        </Link>
      </div>
      <div className='formerror'>
        <p className='textError'>Ошибка</p>
        <Link to='/step3'>
              <button className='IconBtnCls' onClick={closeErrorForm}></button>
        </Link>
        <div className='formbody'>
          <img src={IconNG} alt='iconNG' style={{marginTop: '50px'}}/>  
        </div>
        <Link to='/step3'>
            <button id='button-close' className='btn-close' onClick={closeErrorForm}>Закрыть</button>
          </Link> 
      </div>
      <div className='mask'></div>
    </div>
  )
}
