import { useState } from 'react';
import { IUrl } from '../Interfaces';

interface Iform {
  onAdd: (url: IUrl) => void;
  miniUrl: string;
}

const InputForm = ({ onAdd, miniUrl }: Iform) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [submit, setSubmit] = useState(false);
  const [isCopied, setCopied] = useState(false);
  const validator = (value: string) => {
    return /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g.test(
      value
    );
  };
  const validate = (value: string) => {
    if (validator(value)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validate(originalUrl);
    setSubmit(true);
    onAdd({ originalUrl });
  };
  const textChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setOriginalUrl(event.target.value);
  };

  return (
    <>
      <form action='' onSubmit={onSubmit} className='form__container'>
        <label htmlFor='form__input' className='form__label'>
          Enter a long Url:
        </label>
        <input
          type='text'
          className='form__input'
          value={originalUrl}
          onChange={textChange}
        />
        {!isValid && <span className='error'>Please enter a valid URL</span>}
        <button type='submit' className='form__button'>
          Get MiniLink
        </button>
      </form>
      {isValid && submit && (
        <form key={originalUrl} className='form__container result__container'>
          <label className='form__label'>Your Link: </label>
          <input type='text' className='form__input' value={originalUrl} />
          <label className='form__label'>Your Mini Link:</label>
          <input
            type='text'
            className='form__input'
            value={`https://minilink-backend.onrender.com/${miniUrl}`}
          ></input>
          <div className='button__container'>
            <button
              className='button--refresh lastButtons'
              onClick={(e) => {
                e.preventDefault();
                window.location.reload();
              }}
            >
              get a new MiniLink
            </button>
            {!isCopied && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const miniUrlFull = `https://minilink-backend.onrender.com/${miniUrl}`;
                  navigator.clipboard.writeText(miniUrlFull);
                  setCopied(true);
                }}
                className='button--copy lastButtons'
              >
                copy
              </button>
            )}
            {isCopied && (
              <button className='button--copied lastButtons'>copied!</button>
            )}
          </div>
        </form>
      )}
    </>
  );
};

export default InputForm;
