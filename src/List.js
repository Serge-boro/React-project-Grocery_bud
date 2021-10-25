import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({ items, deleteItem, editItem }) => {
  return (
    <div className='grocery-list'>
      {items.map((item) => {
        const { id, title } = item
        return (
          <div key={id} className='grocery-item'>
            <p className='title'>{title}</p>
            <div className='btn-container'>
              <button
                className='edit-btn'
                type='button'
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                className='delete-btn'
                type='button'
                onClick={() => deleteItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default List
