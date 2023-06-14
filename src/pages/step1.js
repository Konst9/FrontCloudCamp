import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import { Link } from 'react-router-dom';
import UpBar from '../img/UpBar.png';

export default function Step1() {
  const [nickname, setNickname] = useState(() => {
    const saved = window.localStorage.getItem('nickname');
    const initialValue = JSON.parse(saved);
    return initialValue || '';
  })
  const [name, setName] = useState(() => {
    const saved = window.localStorage.getItem('name');
    const initialValue = JSON.parse(saved);
    return initialValue || '';
  })
  const [sername, setSername] = useState(() => {
    const saved = window.localStorage.getItem('sername');
    const initialValue = JSON.parse(saved);
    return initialValue || '';
  })
  const [sex, setSex] = useState(() => {
    const saved = window.localStorage.getItem('sex');
    const initialValue = JSON.parse(saved);
    return initialValue || null;
  });
  const [nicknameDirty, setNicknameDirty] = useState(false)
  const [nameDirty, setNameDirty] = useState(false)
  const [sernameDirty, setSernameDirty] = useState(false)
  const [nicknameError, setNicknameError] = useState('Поле не может быть пустым')
  const [nameError, setNameError] = useState('Поле не может быть пустым')
  const [sernameError, setSernameError] = useState('Поле не может быть пустым')
  const [formValid, setFormValid] = useState(false)
  

  useEffect(() => {
    window.localStorage.setItem('nickname', JSON.stringify(nickname))
  }, [nickname])

  useEffect(() => {
    window.localStorage.setItem('name', JSON.stringify(name))
  }, [name])

  useEffect(() => {
    window.localStorage.setItem('sername', JSON.stringify(sername))
  }, [sername])

  useEffect(() => {
    window.localStorage.setItem('sex', JSON.stringify(sex));
  }, [sex]);


  const nicknameHandler = (e) => {
    setNickname(e.target.value)
    let re = /^[A-Za-z0-9]+([A-Za-z0-9]*|[._-]?[A-Za-z0-9]+)*$/g;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setNicknameError('некорректное имя пользователя')
    } else {
      setNicknameError('')
    }
  }

  const nameHandler = (e) => {
    setName(e.target.value)
    let re = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setNameError('некорректное имя пользователя')
    } else {
      setNameError('')
    }
  }

  const sernameHandler = (e) => {
    setSername(e.target.value)
    let re = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setSernameError('некорректное имя пользователя')
    } else {
      setSernameError('')
    }
  }

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'nickname':
          setNicknameDirty(true)
          break
      case 'name':
          setNameDirty(true)
          break
      case 'sername':
          setSernameDirty(true)
          break
    }
  }

  const options = [
    {value: 'man', label: 'man', id: 'field-sex-option-man'},
    {value: 'woman', label: 'woman', id: 'field-sex-option-woman'},
  ]

  const handleSelectChange = (selectedOption) => {
    setSex(selectedOption);
  };

  useEffect(() => {
    if (sex) {
      window.localStorage.setItem('sex', JSON.stringify(sex));
    }
  }, [sex]);

  useEffect(() => {
    const savedSex = window.localStorage.getItem('sex');
    const parsedSex = JSON.parse(savedSex);
    if (parsedSex) {
      setSex(parsedSex);
    }
  }, []);

  useEffect(() => {
    if (nicknameError || nameError || sernameError) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [nicknameError, nameError, sernameError])

  useEffect(() => {
    if (nickname && name && sername) {
      setFormValid(true);
    }
  }, [nickname, name, sername]);




  return (
    <div className='container_step1'>
      <div className='header_step1'>
        <img src={UpBar} alt='прогресс' />
      </div>
      <div className='form1'>
        <form>
            <label>
                NickName<br></br>
                <input onChange={e=>nicknameHandler(e)} onBlur={e=>blurHandler(e)} id='field-nickname' className='inputUser1' value={nickname} name='nickname' type='text' placeholder='placeholder' maxLength={30} /><br></br>
                {(nicknameDirty && nicknameError) && <div style={{color: 'red', marginTop: '-24px', marginBottom: '24px', fontSize: '10px'}}>{nicknameError}</div>}
            </label>
            <label>
                Name<br></br>
                <input onChange={e=>nameHandler(e)} onBlur={e=>blurHandler(e)} id='field-name' className='inputUser1' value={name} name='name' type='text' placeholder='placeholder' maxLength={50} /><br></br>
                {(nameDirty && nameError) && <div style={{color: 'red', marginTop: '-24px', marginBottom: '24px', fontSize: '10px'}}>{nameError}</div>}
            </label>
            <label>
                Sername<br></br>
                <input onChange={e=>sernameHandler(e)} onBlur={e=>blurHandler(e)} id='field-sername' className='inputUser1' value={sername} name='sername' type='text' placeholder='placeholder' maxLength={50} /><br></br>
                {(sernameDirty && sernameError) && <div style={{color: 'red', marginTop: '-24px', marginBottom: '24px', fontSize: '10px'}}>{sernameError}</div>}
            </label>
            <div className='select'>
            Sex
            <Select options={options} value={sex} onChange={handleSelectChange} id='field-sex' />
          </div>
        </form>
      </div>
      <div className='footer_step1'>
        <Link to='/main'>
            <button id='button-back' className='btn-noactive'>Назад</button>
        </Link>
        <Link to='/step2'>
            <button disabled={!formValid} id='button-next' className='btn-active'>Далее</button>
        </Link>
      </div>
    </div>
  )
}