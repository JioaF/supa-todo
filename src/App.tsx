import { useEffect, useState } from 'react';
import './App.css'
import supabase from './config/supabaseClient'
import type { Tables } from './types/database.types';

function App() {
  console.log(supabase);
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<Tables<"todos">[] | null>(null);

  useEffect(()=>{
    const fetchData = async () => {
      const {data, error} = await supabase.from("todos").select();
      
      if(error){
        setError("Cannot fetch data");
        setData(null);
      }

      if(data){
        setError(null);
        setData(data);
      }
    }
    fetchData();
  }, []);
  
  return (
    <>
      <h1>Todo List</h1>
      {
        error && (<p>{error}</p>)
      }
      {
        data && (
          <div>
            <input type="text" name="" id="" placeholder="What do you want to do today?" />
            <ul>
              {
                data.map((todo, id)=>(
                  <li key={id}>{todo.things} </li>
                ))
              }
            </ul>
          </div>
        )
      }
    </>
  )
}

export default App
