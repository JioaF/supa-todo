import { useEffect, useState } from 'react';
import supabase from '../config/supabaseClient'
import type { Tables } from '../types/database.types';
import { Link } from 'react-router';

export default function HomePage(){
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<Tables<"lists">[] | null>(null);
  console.log(data)
  useEffect(() => {
    const fetchData = async () => {
      const {data, error} = await supabase.from("lists").select();
      
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
    <main className="p-4">
      {
        error && (<p>{error}</p>)
      }
      <h1 className="text-xl">Todo List</h1>
      <div className="mt-4">
        <Link 
          className="bg-green-400 px-4 py-2 text-sm hover:bg-green-600 hover:text-white"
          to={'/create'}
        >
          Create List
        </Link>
        <div className="outline h-svh my-4 bg-gray-400/50 flex justify-between flex-wrap p-2">
          {
            data && data.map((list)=>(
            <div className="bg-white h-20 w-50 p-2 rounded shadow-sm">
              <h2 className="text-lg mb-3">
                {list.name}
              </h2>
              
              <div className="flex justify-start gap-2">
                <Link to={'#'} className="text-blue-500 hover:underline">Edit</Link>
                <Link to={'#'} className="text-red-500 hover:underline">Delete</Link>
              </div>
            </div>
            ))
          }
        </div>
      </div>
    </main>
  )
}