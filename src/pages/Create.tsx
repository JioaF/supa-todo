import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import supabase from "../config/supabaseClient";

export default function Create(){
    const navigate = useNavigate();
    const [listName, setListName] = useState<string>("");
    const [formError, setFormError] = useState<string | null>(null);
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if(!listName){
            setFormError("Please fill the value first");
            return;
        };
        const {data, error} = await supabase
        .from("lists")
        .insert([
            {name: listName}
        ]).select();
        if(error){
            console.log(error);
            setFormError("Please fill all fields correctly");
        }
        if(data){
            setFormError(null);
            setListName("")
            console.log(data);
            navigate('/');
        }
    }
    return (
        <main className="w-1/2 mx-auto mt-20 outline">
            <h1 className="text-xl text-center">Add new List</h1>
            <Link to={'/'} className="p-2 text-red-500">
                Back
            </Link>
            <form  className="flex flex-col p-2" onSubmit={handleSubmit}>
                <div className="flex flex-col mb-4">
                    <label htmlFor="name">List Name</label>
                    <input 
                        type="text"
                        name="name"
                        id="" 
                        className="border-1 border-black" 
                        value={listName}
                        onChange={(e)=> setListName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="">Tasks</label>
                </div>
                <button type="submit" className="bg-green-400 px-4 py-2 hover:bg-green-600 hover:text-white">
                    Create
                </button>
                {formError && (<p className="text-red-500">{formError}</p>)}
            </form>
        </main>
    )
}