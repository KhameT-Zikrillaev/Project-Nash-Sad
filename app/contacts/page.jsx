'use client'

import React, { useState, useEffect } from 'react'

export default function Contacts() {
  const [search, setSearch] = useState('')

  const dates = [
    {
      id:1,
      name:'Xamidulla',
      phone:'998991234567',
    },
    {
      id:2,
      name:'Doniyor',
      phone:'998991234567',
    },
    {
      id:3,
      name:'Setora',
      phone:'998991234567',
    }

  ]
  const [filterData, setFilterData] = useState([])


  function test() {
    if (search.trim() === '') {
      setFilterData(dates) // если пусто — показываем всех
    } else {
      const result = dates.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
      setFilterData(result)
    }
  }

  function zbros() {
   setSearch('')
   setFilterData(dates)
  }
  useEffect(() => {
    test()
  }, [])


  const number = [1,2,3,4,5,6,7,8,9,10]
  const  event = number.filter(item => item % 3 === 0)
  console.log(event)
  return (
    <>
      <div className=" h-screen bg-gray-200">
        <div className="container pt-[100px]">
          <div className='con-search'>
          <input 
          type="text" 
          placeholder="Name" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={test} >Qidirish</button>
          <button onClick={zbros}>Zxbros</button>
          </div>


        {filterData.map(item=>(
          <div key={item.id} className="card">
            <h3>{item.name}</h3>
            <p>{item.phone}</p>
          </div>
        ))}
        </div>
      </div>
    </>
  )
}

