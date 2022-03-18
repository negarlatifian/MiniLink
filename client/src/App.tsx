import './styles/App.css';
import './styles/layout.css';
import InputForm from './components/AddUrl'
import { useState, FC, Key, useEffect } from 'react';
import { IUrl, IState } from './Interfaces';
import axios from 'axios';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const validateUrl= (value:string) => {
  return/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  .test(value);
}


const App: FC = () => {
  const [isValid, setIsValid] = useState(true)
  const [urls, setUrl] = useState<IState[]>([])
  const [miniUrl, setMiniUrl] = useState('')
  const validator= (value:string) => {
      return/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
      .test(value);
  }
  const validate = (value:string) => {
      if(validator(value)){
          setIsValid(true);
      }else{
          setIsValid(false);
      };
  }

  const AddUrl = (url: IUrl):void => {
    const miniUrl = `${Math.random().toString(32).split('.')[1].slice(0,5)}`
    const newUrl = {
      originalUrl : url.originalUrl,
      miniUrl : miniUrl}
    validate(url.originalUrl)
    setUrl( [...urls, newUrl])
    setMiniUrl(miniUrl)
    axios.post('http://localhost:3001/shorten', newUrl)
  }


  return (
    <div className="App" >
      <Navbar/>
      <Header/>
      <section className='App__content'>
        <InputForm onAdd= {AddUrl} miniUrl={miniUrl}/>
        </section>
        <Footer/>
    </div>
  );
}

export default App;
