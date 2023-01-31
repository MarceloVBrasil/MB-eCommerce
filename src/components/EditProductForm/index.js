import { useRef, useState } from "react"
import "./EditProductForm.scss"
import Input from "../Input"
import Modal from "../Modal"
import Button from "../Button"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axiosInstance"
import { validDescription, validName, validPrice, validQuantity, validImageFile, validBrandName, validCategoryName } from "../../utils/validate"

export default function EditProductForm({product}) {
    const [error, setError] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [response, setResponse] = useState('')
    const [navigateValue, setNavigateValue] = useState('')
    const [productToEdit, setProductToEdit] = useState(product)
    const navigate = useNavigate()
    const formRef = useRef(null)

  return (
    <>
          <Modal show={showModal} message={response} setShowModal={setShowModal} navigateValue={navigateValue}/>
            <form className="new-product-form" onSubmit={handleSubmit} ref={formRef} onKeyDown={handleEnterPress}>
                <section className="new-product-form-section">
                    <p className="new-product-form-section__title">product information</p>
                    <Input
                        label={"name"}
                        type={"text"}
                        error={error.name}
                      placeholder={'product name'}
                      value={productToEdit.name}
                      onChange={(e) => handleChange({name: e.target.value})}
                    />
                    <Input
                        label={"description"}
                        type={'text'}
                        error={error.description}
                      placeholder={'product description'}
                      value={productToEdit.description}
                      onChange={(e) => handleChange({description: e.target.value})}
                    />
                    <Input
                      label={"price"}
                      type={"text"}
                      error={error.price}
                      placeholder={'$1000'}
                      value={`${productToEdit.price}`}
                      onChange={(e) => handleChange({price: e.target.value})}
                    />
                    <Input
                        label={"quantity"}
                        type={"text"}
                        error={error.quantity}
                      placeholder={'100'}
                      value={productToEdit.quantity}
                      onChange={(e) => handleChange({quantity: e.target.value})}
                    />
                </section>
                <section className="new-product-form-section">
                    <p className="new-product-form-section__title">product image</p>
                    <Input
                      label={"product image"}
                      type={"file"}
                      name={'file'}
                      error={error.file}
                      onChange={(e) => handleChange({file: e.target.files[0]})}
                  />
                  <Input
                      label={"brand name"}
                      type={"text"}
                      name={'brand'}
                      placeholder={'Brand Name'}
                      error={error.brand}
                      value={productToEdit.brand}
                      onChange={(e) => handleChange({brandName: e.target.value})}
                  />
                  <Input
                      label={"category name"}
                      type={"text"}
                      name={'category'}
                      placeholder={'Category Name'}
                      error={error.category}
                      value={productToEdit.category}
                      onChange={(e) => handleChange({categoryName: e.target.value})}
                    />
                </section>
                <div className="new-product-form-buttons">
                    <Button type={"cancel"} text={"cancel"} onClick={handleCancelButton}/>
                    <Button text={"edit product"} type={"submit"} />
                </div>
            </form>
        </>
    )
    
    function handleCancelButton() {
        navigate(-1)
    }

    async function handleSubmit(e) {
        e.preventDefault?.()
        const errors = {}
        if(!validName(formRef.current.name.value)) errors.name = "name is not valid"        
        if(!validDescription(formRef.current.description.value)) errors.description = "description is not valid"        
        if (!validPrice(formRef.current.price.value)) errors.price = "price is not valid"
        if (!validQuantity(formRef.current.quantity.value)) errors.quantity = "quantity is not valid"
        if (!validBrandName(formRef.current.brand.value)) errors.brand = "brand is not valid"
        if (!validCategoryName(formRef.current.category.value)) errors.category = "category is not valid"
        if(!validImageFile(productToEdit.file)) errors.file = "image must be either jpeg, png or webp"
       if (Object.values(errors).some((value) => value !== undefined)) return setError(errors)
        setError({})

        const editedProduct = {
            id: productToEdit.id,
            name: formRef.current.name.value,
            description: formRef.current.description.value,
            price: formRef.current.price.value,
            quantity: formRef.current.quantity.value,
            brand: formRef.current.brand.value,
            category: formRef.current.category.value,
            image: productToEdit.file
        }

        try {
            const response = await axiosInstance.put(`/products/${product.id}`, editedProduct, {
                headers: {"content-type": "multipart/form-data"}
            });
            setResponse(response.data.message)
            setShowModal(true)
            setNavigateValue("/")

        } catch (error) {
            setResponse(error.response.data)
            setShowModal(true)
        }
    }

    function handleEnterPress(e) {
        if (e.key === "Enter") {
            e.preventDefault()
            handleSubmit(formRef)
        }
    }
    
    function handleChange(changes) {
        setProductToEdit(prev => {
            return {...prev, ...changes}
        })
    }
}
