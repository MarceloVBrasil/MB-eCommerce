import React from 'react'
import "./EditUserMenu.scss"
import userIcon from "../../assets/images/user.png"
import Button from '../Button'
import { Link } from 'react-router-dom'
import { useUser } from '../../contexts/UserProvider'

export default function EditUserMenu() {
  const { user } = useUser()
  return (
    <div className='edit-user-menu'>
        <section className='edit-user-menu-section'>
              <p className='edit-user-menu-section__title'>Edit User</p>
              <img src={userIcon} alt="user"  className="edit-user-menu-section__image"/>
      </section>
          <section className='edit-user-menu-section'>
            <p className='edit-user-menu-section__title'>Edit Address</p>
        {user.complement && <p className='edit-user-menu-section__description'>{`${user.complement}`}</p>}
            <p className='edit-user-menu-section__description'>{`${user.street}`}</p>
            <p className='edit-user-menu-section__description'>{`${user.city}-${user.province}`}</p>
          </section>
        <div className="edit-user-menu-buttons">
        <Link to={'./edit'} className="edit-user-menu-buttons__link">
          <Button text={"Edit"} type={"submit"} />
        </Link>
        </div>
    </div>
  )
}
