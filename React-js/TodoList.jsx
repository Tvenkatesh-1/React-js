import { useState } from "react";

function TodoList() {
    const [task, settask] = useState(["wakeup at 6am", "take a shower", "breakfast"])
    const [newtask, setnewtask] = useState("");
    const [editindex,seteditindex]=useState(null);
    const [edittask,setedittask]=useState("");
  
  
   

    function addtask() {

        if(newtask.trim()!==""){
            settask(t=>[...t,newtask]);
            setnewtask("");
        }
    }
    function handledelete(i){
       const updatetasks=task.filter((Element,idx)=>idx !==i);
       settask(updatetasks);
    }

 
    function EditTextMode(index,currentText){
        seteditindex(index);
        setedittask(currentText);

    }
    function handleEditChange(event){
        setedittask(event.target.value);
    }

    
 
    function saveEdit() {
       if(edittask.trim()!=="")
        {
        const updateedittask=task.map((t,i)=>i===editindex?edittask:t);
        settask(updateedittask);
        seteditindex(null);
        setedittask("");
    }
      
    }
    return (<div className="todocontainer">
        <div className="top">
            <input type="text" placeholder="Add Something here.." value={newtask} onChange={(event)=>setnewtask(event.target.value)} />
            <button className="addtodo" onClick={addtask}>Add</button><br />
        </div>
        <ol>
            {task.map((t,i)=><li key={i}>{editindex===i
                ?(<>
                <input type="text"
                value={edittask}
                onChange={handleEditChange}
                />
                <button onClick={saveEdit} >saveEdit</button>
                </>):(<>
                    <span className="listtodo">{t}</span>
                    <button className="edittodo" 
                    onClick={()=>EditTextMode(i,t)}
                    >Edit Text</button>
                </>)}
               
                <button className="deletetodo" onClick={()=>handledelete(i)}>Delete</button>
               
            </li>)}
        </ol>

    </div>);
} export default TodoList;