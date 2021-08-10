import React, { useEffect } from 'react'
import './style.css'
const Todo = () => {
    
    const getLocalData=()=>{
        const lists = localStorage.getItem("myTodoList") ;
        if (lists){
            return JSON.parse(lists);
        }
        else{
        return []; 
        }
    }

    const [myInput, setMyInput] = React.useState("");
    const [myItem, setMyItem] = React.useState(getLocalData());
    
    


    const addItem =() =>{
        if (myInput === ""){
            alert("No input given")
        }
        else{
            //create id of each input item
            const idCreated = {
                id : new Date().getTime().toString(),
                name : myInput,
            }
            setMyItem([idCreated, ...myItem]);
            setMyInput("");
        }
    }
    const deleteItem =(index) =>{
        const new_data =  myItem.filter((ce)=>{
            if (ce.id !== index){
                return ce;
            }
            return 0;
        });
        
        setMyItem(new_data);
    };
    const deleteAll=()=>{
        setMyItem([]); 
    }
    const edit = (index) =>{
        myItem.filter((ce)=>{
            if (ce.id === index){
                console.log(ce);
                const input = setMyInput(ce.name);
                ce.name = input;
                deleteItem(ce.id);
            }
            return 0;
        });
        
        
    }
    
    //setting localStorage
    useEffect (() =>{
        localStorage.setItem("myTodoList",JSON.stringify(myItem) )
    }, [myItem]);
//go to 2nd useState hook
    
    return (
        <>
           <div className="main_div" align ="center">
               <div className="icon">
                    <figure><img src="./Images/todoIcon.png" alt="todo-icon" style={{width:"50px",marginTop: "80px"}}/></figure>
                    <figcaption > <span style={{color:"whitesmoke", opacity:"0.6"}}>List your Todos</span> ✍</figcaption>
               </div>
                <div className="search_div" style={{marginTop:"10px", width:"50%",display:"flex"}}>
                    <textarea style={{height:"40px"}} placeholder= "👉 Add item" className="form-control"  value = {myInput} onChange ={(event)=>{setMyInput(event.target.value)}} />

                    <i type="button" className="fa fa-plus" style={{marginLeft:"42%",padding:"12px",borderRadius:"5px", backgroundColor:"white", zIndex:"3", position:"absolute",color:"orangered"}} onClick={addItem} ></i>
                </div>
                <div className="lists">
                    {
                        myItem.map((currElement) =>{
                            return(
                                <div className="eachlist" key = {currElement.id}>
                                    <p>{currElement.name}</p> <i type="button" className="fa fa-edit" style={{marginLeft:"37%",padding:"5px",borderRadius:"5px", backgroundColor:"cyan", position:"absolute",color:"blue"}} onClick={() => {edit(currElement.id)}} ></i><i type="button" className="fa fa-trash" style={{marginLeft:"43%",padding:"5px",borderRadius:"5px", backgroundColor:"cyan", position:"absolute",color:"red"}} onClick = {()=>{deleteItem(currElement.id)}}></i>
                                
                                </div>
                            )
                            
                        })
                        
                    }
                    
                </div>
                <div>
                    <button id="checkList" className="btn" style={{backgroundColor:'red',marginTop:"10px",padding:"5px"}} onClick={()=>{myItem.map(()=>{return deleteAll();})}}> Delete All</button>
                </div>
                
            </div> 
            <div style={{backgroundColor:"rgba(115,124,155,0.5)", textAlign:"center",marginTop :"250px", marginBottom:"0"}}> 
                    <div style ={{ color:"bisque"}}>
                        <small>&copy; 2021 Pragya Mukherjee. All rights reserved.</small>
                    </div>
                    <div style={{color:"white",padding : "10px"}}>
                        <small>Contact : <a href="https://www.linkedin.com/in/pragyamukherjee/" style={{padding :"10px"}}><i className="fa fa-linkedin" style={{color:"skyblue"}}></i></a> <a href="https://github.com/MPragya-20"><i className="fa fa-github" style={{color:"white"}}></i></a></small>
                    </div>
            </div>
        </>
    )
}

export default Todo ;
