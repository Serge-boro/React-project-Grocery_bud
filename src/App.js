import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const localItems = () => {
  let ItemsLocal = localStorage.getItem('list')
  if (ItemsLocal) {
    return (ItemsLocal = JSON.parse(localStorage.getItem('list')))
  }
  return []
}
function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(localItems())
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({ show: false, msg: '', status: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name && !isEditing) {
      const newItem = { id: new Date().getTime().toString(), title: name }
      setList([...list, newItem])
      showAlert(true, 'Item success added', 'success')
      setName('')
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name }
          }
          return item
        })
      )
      showAlert(true, 'Item success changed', 'success')
      setIsEditing(false)
      setEditID(null)
      setName('')
    } else {
      showAlert(true, 'please add items', 'danger')
    }
  }

  const showAlert = (show = false, msg = '', status = '') => {
    setAlert({ show, msg, status })
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.title)
  }

  const deleteItem = (id) => {
    setList(list.filter((item) => item.id !== id))
    showAlert(true, 'Item success deleted', 'danger')
  }

  const deleteAll = () => {
    setList([])
    showAlert(true, 'All items success deleted', 'danger')
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])
  return (
    <section className='section-center'>
      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} alertShow={showAlert} list={list} />}
        <h3>grocery bud</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            placeholder='e.g. eggs'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='submit-btn'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} deleteItem={deleteItem} editItem={editItem} />
          <button className='clear-btn' onClick={deleteAll}>
           clear Items
          </button>
        </div>
      )}
    </section>
  )
}

export default App
