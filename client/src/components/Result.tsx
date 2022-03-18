import { useState, FC, Key, useEffect } from 'react';
import { IUrl, IState } from '../Interfaces';

const Result = () => {

  const [miniUrl, setMiniUrl] = useState<IState[]>([])
  useEffect(() => {
    fetch('/shorten')
    .then(res => {
      if(res.ok){
        return res.json()
      }
    })
    .then(jsonRes => setMiniUrl(jsonRes))
  })
  return (
    <div>{miniUrl}</div>
  )
}

export default Result