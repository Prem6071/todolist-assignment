import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [itemText, setItemText] = useState('');
  const [listItems, setListItems] = useState([]);
  const [isEditing, setIsEditing] = useState('');
  const [editItemText, setEditItemText] = useState('');

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:9000/api/item', { item: itemText })
      setListItems(prev => [...prev, res.data]);
      setItemText('');
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const getItemsList = async () => {
      try {
        const res = await axios.get('http://localhost:9000/api/items')
        setListItems(res.data);
        console.log('render')
      } catch (err) {
        console.log(err);
      }
    }
    getItemsList()
  }, []);

  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:9000/api/item/${id}`)
      const newListItems = listItems.filter(item => item._id !== id);
      setListItems(newListItems);
    } catch (err) {
      console.log(err);
    }
  }

  const editItem = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.put(`http://localhost:9000/api/item/${isEditing}`, { item: editItemText })
      console.log(res.data)
      const editedItemIndex = listItems.findIndex(item => item._id === isEditing);
      const editedItem = listItems[editedItemIndex].item = editItemText;
      setEditItemText('');
      setIsEditing('');
    } catch (err) {
      console.log(err);
    }
  }

  const renderEditForm = () => (
    <form className="" onSubmit={(e) => { editItem(e) }} >
      <input type="text"  placeholder="new task..." onChange={e => { setEditItemText(e.target.value) }} value={editItemText} />
      <span className="badge bg-primary rounded-pill ms-2" onClick={(e) => { editItem(e) }}>Save</span>
    </form>
  )

  return (
    <div>

      <header>
        <h1 className="text-center">To Do List App</h1>
        <p className="text-center">Save what you do for today!</p>
      </header>

      <br />

      <div className="container">
        <div className="mb-3">
          <label for="taskdetail" className="form-label">Enter your tasks for the day:</label>
          <form className="d-flex" onSubmit={e => addItem(e)}>
            <input type="text" className="form-control" id="taskdetail" placeholder="task to do..." onChange={e => { setItemText(e.target.value) }} value={itemText} />
            <input className="btn btn-primary" type="submit" value=" Add " />
          </form>
        </div>
      </div>

      <br />

      <div className="container">
        <ol className="list-group list-group-numbered">
          <div className="ms-2 me-auto">Tasks to do: </div>

          {
            listItems.map(item => (
              <li className="list-group-item d-flex justify-content-between align-items-start">
                {
                  isEditing === item._id
                    ? renderEditForm()
                    : <>
                      <div className="ms-2 me-auto">{item.item}</div>
                      <span className="badge bg-primary rounded-pill ms-2" onClick={() => { setIsEditing(item._id) }}>Edit</span>
                      <span className="badge bg-primary rounded-pill ms-2" onClick={() => { deleteItem(item._id) }}> Remove </span>
                    </>
                }
              </li>
            ))
          }
        </ol>
      </div>

      <br />

      <footer>
        <p className="text-center">For IQVAI Assignment</p>
      </footer>

    </div>
  );
}

export default App;