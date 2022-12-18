import React, { useState } from 'react'
import Button from '../Button'
import TextArea from '../TextArea'
import "./CommentsForm.scss"
import { useUser } from '../../contexts/UserProvider'
import axiosInstance from "../../utils/axiosInstance"
import Modal from '../Modal'

export default function CommentsForm({ productId, setComments, getComments }) {
  const {isLoggedIn, user, token} = useUser()
  const [error, setError] = useState({})
  const [message, setMessage] = useState("")
  const [response, setResponse] = useState("")
  const [showModal, setShowModal] = useState(false)
  return (
    <>
    <Modal show={showModal} message={response} setShowModal={setShowModal}/>
    <form className='comments-form' onSubmit={handleSubmit}>
        <TextArea
        label={'comment'}
        placeholder={'add a new comment'}
        error={error.comment}
        value={message}
        setMessage={setMessage}
          />
          <div className='comments-form-button'>
              <Button text='comment'/>
          </div>
    </form>
  </>
  )

  async function handleSubmit(e) {
    e.preventDefault()
    const newError = {}
    if (!e.target.comment.value) newError.comment = "this field is required"
    if(!isLoggedIn) newError.comment = "must be logged in to comment"
    if (Object.values(newError).some(value => value !== undefined)) return setError(newError)
    else setError({})
    try {
      const response = await axiosInstance.post(`/comments/${productId}`, { message: e.target.comment.value, userId: user.id }, {
        headers: {authorization: `Bearer ${token}`}
      })
      getComments(productId)
      setMessage("")
    } catch (error) {
      setResponse(error.response.data)
      setShowModal(true)
    }
  }
}
