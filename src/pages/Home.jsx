import { auth } from '../firebase'
import {
  collection,
  doc,
  deleteDoc,
  query,
  onSnapshot,
  addDoc,
  where,
} from 'firebase/firestore'
import { db } from '../firebase'
import { useEffect, useState } from 'react'
import { BsFillTrashFill, BsFillPhoneFill } from 'react-icons/bs'
import { AiFillContacts } from 'react-icons/ai'

const Home = () => {
  const user = auth.currentUser.uid
  const [contacts, setContacts] = useState([])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const logout = () => {
    auth.signOut()
  }

  const newContact = async (e) => {
    e.preventDefault(e)
    if (!name || !number) return

    await addDoc(collection(db, 'contacts'), {
      user,
      name,
      number,
    })
  }

  const deleteContact = async (id) => {
    await deleteDoc(doc(db, 'contacts', id))
  }

  useEffect(() => {
    const q = query(collection(db, 'contacts'), where('user', '==', user))
    const unsuscribe = onSnapshot(q, (querySnapshot) => {
      let contactArr = []
      querySnapshot.forEach((doc) => {
        contactArr.push({ ...doc.data(), id: doc.id })
      })
      setContacts(contactArr)
    })

    return () => unsuscribe()
  }, [user])

  return (
    <div className="w-96 p-6 shadow-lg bg-white rounded-md">
      <h1>Contactos</h1>
      <form
        className="h-30 py-10 flex flex-col justify-center items-center "
        onSubmit={newContact}
      >
        <input
          className="mb-2 border w-full text-base px-2 py-2 focus:outline-none focus:ring-0 focus:border-green-600 rounded-md"
          type="text"
          placeholder="Nombre"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="mb-2 border w-full text-base px-2 py-2 focus:outline-none focus:ring-0 focus:border-green-600 rounded-md"
          type="text"
          placeholder="Numero"
          onChange={(e) => setNumber(e.target.value)}
        />
        <button className="inline-block w-full px-8 py-3 leading-none text-white bg-green-600 hover:bg-green-700 font-semibold rounded shadow">
          Agregar
        </button>
      </form>
      <ul>
        {contacts.map((contact, index) => {
          return (
            <li
              className="flex flex-row items-center justify-between p-2 bg-green-200 mb-3"
              key={index}
            >
              <div>
                <div className="p-2 flex flex-row items-center justify-center">
                  <AiFillContacts /> {contact.name}
                </div>
                <div className="p-2 flex flex-row">
                  <BsFillPhoneFill /> {contact.number}
                </div>
              </div>
              <button onClick={() => deleteContact(contact.id)}>
                <BsFillTrashFill />
              </button>
            </li>
          )
        })}
      </ul>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Home
