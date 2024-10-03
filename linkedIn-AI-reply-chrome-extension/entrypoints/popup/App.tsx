import { useState } from 'react';
import reactLogo from '@/assets/react.svg';
import wxtLogo from '/wxt.svg';
import './App.css';

export const App=()=>{
  const [count, setCount] = useState(0);

  return (
    <div className='bg-red-600'>
     <h1 className='text-green-800' >My AI : Hai 👋</h1>
    </div>
  );
}

export default App;
