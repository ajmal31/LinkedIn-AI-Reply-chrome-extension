import { useState } from 'react';
import reactLogo from '@/assets/react.svg';
import wxtLogo from '/wxt.svg';
import './App.css';

export const App=()=>{
  const [count, setCount] = useState(0);

  return (
    <>
     <h1 className='' >My AI : Hai 👋</h1>
    </>
  );
}

export default App;
