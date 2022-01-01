import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import ItemList from './ItemList';
import axios from 'axios';
import './DisplayList.css';

function DisplayList() {

    const [listOfToDo, setlistOfToDo] = useState([]);
    const [curr_todolist_id, setcurr_todolist_id] = useState('');
    const [item, setitem] = useState('');
    const [newitems, setnewitems] = useState([]);
    const [newtitle, setnewtitle] = useState('');
    const [star, setstar] = useState('');

    const displayItem = (event) => {
        setitem(event.target.value)
    }

    const addItem = (todoid) => {
        if (item !== '') {
            setcurr_todolist_id(todoid);
            setnewitems((olditems) => {
                return [...olditems, item];
            });
            setitem('');
        }
    }

    const deleteItem = (id) => {
        setnewitems((olditems) => {
            return olditems.filter((item_to_delete, item_key) => {
                return item_key !== id;
            });
        });
    }

    const updateToDoList = (id, title, starred) => {
        let title_to_update = '';
        let star_to_update = '';

        if (newtitle === '') {
            title_to_update = title;
        }
        else {
            title_to_update = newtitle;
        }

        if (star === '') {
            star_to_update = starred;
        }
        else {
            star_to_update = star;
        }

        axios.put('http://localhost:5000/update', { id: id, name: title_to_update, items: newitems, starred: star_to_update })
            .then((response) => {
                console.log(response);
                window.location.reload(false);
            })
            .catch((error) => {
                console.log(error);
            });

    }

    const deleteToDoList = (id) => {
        axios.delete(`http://localhost:5000/delete/${id}`)
            .then((response) => {
                console.log(response);
                window.location.reload(false);
                // setlistOfToDo(listOfToDo.filter((val)=>{
                //     return val.id !== id;
                // }));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        axios.get('http://localhost:5000/read')
            .then((response) => {

                setlistOfToDo(response.data);
                //console.log(response.data);
            })
            .catch((error) => {
                console.log(error)
            });
    }, []);


    return <div>
        <h2 className="displaylist-tittle">List of ToDo's -</h2>
        {/* {listOfToDo.map((todolist) => {
            return <div>
                <p>{todolist.name}</p>
                <ul>{todolist.items.map((item) => {
                    return <li>{item}</li>
                })}</ul>
                <p>{todolist.currdate}</p>
                <p>{"" + todolist.starred}</p>
            </div>
        })} */}
        {listOfToDo.map((todolist) => {
            return <div className="todolist-div">
                <div className="card mb-3">
                    <div className="card-header">
                        <strong>ToDo List</strong>
                    </div>
                    <div className="card-body">
                        <div className="row g-3">

                            <div class="col-2">
                                <div className="form-check">
                                    <input class="star-in-list" type="checkbox" title="Mark as important" defaultChecked={todolist.starred} onChange={(event) => { setstar(event.target.checked) }} />
                                </div>
                            </div>

                            <div className="col-3">
                                <h6 className="card-title">Title</h6>
                                <input type="text" className="form-control" aria-label="City" placeholder="ToDoName" defaultValue={todolist.name} onChange={(e) => { setnewtitle(e.target.value) }} />
                            </div>

                            <div className="col-4">
                                <h6 className="card-title">Items</h6>
                                <ul className="list-group" style={{ margin: '0 0 10px 0' }}>
                                    {todolist.items.map((item) => {
                                        return <div div="list-of-items">
                                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                                {item}
                                                {/* <button className="badge bg-danger rounded-pill" id="delete-item">x</button> */}
                                            </li>
                                        </div>

                                    })}
                                </ul>
                                <div>
                                    <h6 className="card-title">Add new Item</h6>
                                    <input type="text" className="form-control" placeholder="Item name" aria-label="City" valeue={item} onChange={displayItem} />
                                    <button className="btn btn-light" id="add-item" onClick={() => { addItem(todolist._id) }}>Add Item</button>

                                    {(() => {
                                        if (curr_todolist_id === todolist._id) {
                                            return (<div>
                                                {
                                                    <ol className="item-list">
                                                        {
                                                            newitems.map((itemvalue, index) => {
                                                                return <ItemList item={itemvalue} key={index} id={index} onSelect={deleteItem} />;
                                                            })
                                                        }
                                                    </ol>
                                                }
                                            </div>);
                                        }
                                    })()}
                                </div>

                            </div>

                            <div className="col-auto">
                                <button className="btn btn-info" id="update-button" onClick={() => { updateToDoList(todolist._id, todolist.name, todolist.starred) }}>Update</button>
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-info" id="delete-button" onClick={() => { deleteToDoList(todolist._id) }}>Delete</button>
                            </div>
                        </div>
                        <p className="card-text"><small className="text-muted">Last updated on {todolist.currdate}</small></p>
                    </div>
                </div>
            </div>

        })}

    </div>

}
export default DisplayList;