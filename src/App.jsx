
import { useState } from 'react'
import axios from 'axios'

function App() {
  const [error, setError] = useState(null);
  const [advice, setAdvice] = useState(null);
  const words = ['Dog','Cat','Study'
  ]

  const ADVICE_SLIP_API = axios.create({
    baseURL: 'https://api.adviceslip.com'
  })

  const get = async (path) => {
    const { data } = await ADVICE_SLIP_API.get(path);

    return data;
  }

  const getRandomAdvice = async () => {
    const PATH_RANDOM_ADVICE = '/advice';

    return await get(PATH_RANDOM_ADVICE);
  }

  const getAdviceByWord = async (word) => {
    const PATH_ADVICE_BY_WORD = `/advice/search/${word}`;

    return await get(PATH_ADVICE_BY_WORD);
  }

  const clearStatesBeforeRequests = () => {
    setError(null);
    setAdvice(null);
  }

  const handleRequestAdviceByWord = async (word) => {
    clearStatesBeforeRequests();

    const data = await getAdviceByWord(word.toLowerCase());

    if(data.slips && data.slips.length) {
      const adviceData = {
        message: data.slips[0].advice
      }

      setAdvice(adviceData);
    } else {
      if(data.message) {
        setError(data.message);
      } else {
        setError({
          text: 'Wrong!'
        })
      }
    }
  }
  const handleRequestRandomAdvice = async () => {
    clearStatesBeforeRequests();

    const data = await getRandomAdvice();

    if(data.slip) {
      const adviceData = {
        message: data.slip.advice
      }

      setAdvice(adviceData);
    } else {
      setError({
        text: 'Wrong!'
      })
    }
  }

  return (
    <>
      <div className='row m-5 text-center'>

        {
          words.map(word => {
            return (
              <div className='col' key={word}>
                <button onClick={() => handleRequestAdviceByWord(word)} className='btn btn-success'>{word}</button>
              </div>
            )
          })
        }
        <div className='col'>
          <button onClick={() => handleRequestRandomAdvice()} className='btn btn-success'>Random</button>
        </div>

        {
          error && (
            <p className='mt-5' key={error.text}>{error.text}</p>
          )
        }
        {
          advice && (
            <p className='mt-5' key={advice.message}>{advice.message}</p>
          )
        }

      </div>   
    </>
  )
}

export default App