import { useRef, useState } from "react"
import "./NewProductForm.scss"
import Input from "../Input"
import Modal from "../Modal"
import Button from "../Button"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../../utils/axiosInstance"
import { validDescription, validName, validPrice, validQuantity, validImageFile, validBrandName, validCategoryName } from "../../utils/validate"
import { formatPriceTag } from "../../utils/formatters"

export default function NewProductForm() {
    const [error, setError] = useState({})
    const [price, setPrice] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [response, setResponse] = useState('')
    const [navigateValue, setNavigateValue] = useState('')
    const [imageFile, setImageFile] = useState('')
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
                    />
                    <Input
                        label={"description"}
                        type={'text'}
                        error={error.description}
                        placeholder={'product description'}
                    />
                    <Input
                      label={"price"}
                      type={"text"}
                      error={error.price}
                      placeholder={'$1000'}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <Input
                        label={"quantity"}
                        type={"text"}
                        error={error.quantity}
                        placeholder={'100'}
                    />
                </section>
                <section className="new-product-form-section">
                    <p className="new-product-form-section__title">product image</p>
                    <Input
                      label={"product image"}
                      type={"file"}
                      name={'file'}
                      error={error.file}
                      onChange={(e) => handleFile(e.target.files[0])}
                  />
                  <Input
                      label={"brand name"}
                      type={"text"}
                      name={'brand'}
                      placeholder={'Brand Name'}
                      error={error.brand}
                  />
                  <Input
                      label={"category name"}
                      type={"text"}
                      name={'category'}
                      placeholder={'Category Name'}
                      error={error.category}
                    />
                </section>
                <div className="new-product-form-buttons">
                    <Button type={"cancel"} text={"cancel"} onClick={handleCancelButton}/>
                    <Button text={"add product"} type={"submit"} />
                </div>
            </form>
        </>
    )
    
    function handleCancelButton() {
        navigate("/admin")
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
        if(!validImageFile(imageFile)) errors.file = "image must be either jpeg, png or webp"
       if (Object.values(errors).some((value) => value !== undefined)) return setError(errors)
        setError({})

        const newProduct = {
            name: formRef.current.name.value,
            description: formRef.current.description.value,
            price: formRef.current.price.value,
            quantity: formRef.current.quantity.value,
            brand: formRef.current.brand.value,
            category: formRef.current.category.value,
            image: imageFile
        }
        try {
            const response = await axiosInstance.post(`/products`, newProduct, {
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

  function handleFile(file) {
    setImageFile(file);
  }
}
