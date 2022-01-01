import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DisplayList from './DisplayList';
import ItemList from './ItemList';
import { useState } from 'react';
import axios from 'axios';

function App() {

  const [title, settitle] = useState("");
  const [item, setitem] = useState("");
  const [items, setitems] = useState([]);
  const [star, setstar] = useState(false)

  const displayItem = (event) => {
    setitem(event.target.value)
  }

  const addItem = () => {
    if (item !== '') {
      setitems((olditems) => {
        return [...olditems, item];
      });
      setitem('');
    }
  }

  const deleteItem = (id) => {
    setitems((olditems) => {
      return olditems.filter((item_to_delete, item_key) => {
        return item_key !== id;
      });
    });
  }

  const addToDoList = () =>{
    axios.post('http://localhost:5000/insert', {name:title,items:items,starred:star})
    .then((response)=>{
      console.log(response);
      window.location.reload(false);
    })
    .catch((error)=>{
      console.log(error);
    });
  }
  

  return (
    <div className="App">
      <h1 className="titleofpage">ToDo List</h1>

      <div className="container" style={{ width: '30rem' }}>
        <div className="card" >
          <div className="card-header">
            <strong>Create a ToDo List</strong>
          </div>
          <div className="card-body">

            <input class="star" type="checkbox" title="Mark as important" onChange={(event)=>{setstar(event.target.checked)}}/>

            <h6 className="card-title">Title</h6>
            <div className="col-7">              
              <div className="input-group">
                <input type="text" className="form-control" id="inlineFormInputGroupUsername" placeholder="ToDo List name" onChange={(event) => { settitle(event.target.value) }}/>
              </div>
            </div>

            <h6 className="card-title" style={{marginTop:'5px'}}>Items</h6>
            <div className="col-7">              
              <div className="input-group">
                <input type="text" className="form-control" id="inlineFormInputGroupUsername" placeholder="Item name" value={item} onChange={displayItem} />
                &nbsp;&nbsp;&nbsp;<button className="btn btn-light" id="addItemButton"  onClick={addItem}>Add Item</button>
              </div>

              <div>
                <ol className="item-list">
                  {
                    items.map((itemvalue, index) => {
                      return <ItemList item={itemvalue} key={index} id={index} onSelect={deleteItem} />;
                    })
                  }
                </ol>
              </div>

              <div class="col-12">
                <button type="submit" className="btn btn-info" id="addButton" title="Add ToDo List" onClick={addToDoList}>+</button>
              </div>

            </div>
          </div>
        </div>

      </div>
      <DisplayList />
    </div>
  );
}

export default App;
