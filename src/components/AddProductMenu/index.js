import React from 'react'
import "./AddProductMenu.scss"
import addProduct from "../../assets/images/plus.png"
import Button from '../Button'
import { Link } from 'react-router-dom'

export default function AddProductMenu() {
  return (
    <div className='add-product-menu'>
        <section className='add-product-menu-section'>
              <p className='add-product-menu-section__title'>admin products</p>
              <img src={addProduct} alt="add-products"  className="add-product-menu-section__image"/>
      </section>
          <section className='add-product-menu-section'>
            <p className='add-product-menu-section__title'>new product</p>
          </section>
        <div className="add-product-menu-buttons">
        <Link to={'/admin/newProduct'} className="add-product-menu-buttons__link">
          <Button text={"add product"} type={"submit"} />
        </Link>
        </div>
    </div>
  )
}
