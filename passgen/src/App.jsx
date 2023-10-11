import { useCallback, useEffect, useRef, useState } from 'react'

import './App.css'

function App() {

  const [lenght, setLenght] = useState(8)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)
  const [password, setPassword] = useState('')

 //Use useCallback  for optimization
  const passwordGenerator = useCallback(() => {
    let pass = ''
    let string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const num = "0123456789";
    const sym = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    if (numbers) string += num;
    if (symbols) string += sym;
    for (let i = 0; i < lenght; i++) {
      let char = Math.floor(Math.random() * string.length + 1)
      pass += string.charAt(char)
    }
    setPassword(pass)
  }, [lenght, numbers, symbols, setPassword])



//Use useRef to select the input
  const passRef = useRef(passwordGenerator)

  const copyToClipboard = () => {
    passRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }

//Use useEffect to call the function 
  useEffect(() => {
    passwordGenerator()
  }, [length, numbers, symbols])


  return (
    <>
      <div className="container bg-slate-600 w-full h-96 text-center py-3 px-2 m-0">
        <div className='bg-white w-full h-10 rounded-md flex'>
          <input type="text" className='w-80 h-full text-center text-2xl font-bold' value={password} readOnly
            ref={passRef}
          />
          <button className='outline-none'
            onClick={copyToClipboard}
          >copy</button>
        </div>
        <br />
        <div className='bg-white w-full h-10 rounded-md flex'>
          <input type="range" min={6} max={100}
            onClick={(e) => setLenght(e.target.value)}
          />
          <label className='text-center'>Lenght:{lenght}</label>
        </div>
        <br />
        <div className='bg-white w-full h-10 rounded-md flex'>
          <input type="checkbox"
            onClick={() => {
              setNumbers((prev) => !prev)
            }}
          />
          <label className='text-center'>Numbers</label>
        </div>
        <br />
        <div className='bg-white w-full h-10 rounded-md flex'>
          <input type="checkbox"
            onClick={() => {
              setSymbols((prev) => !prev)
            }}
          />
          <label className='text-center'>Symbol</label>
        </div>

      </div>
    </>
  )
}

export default App
