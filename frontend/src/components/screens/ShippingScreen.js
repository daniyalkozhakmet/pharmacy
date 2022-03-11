import React,{useState,useEffect}from 'react'
import {useDispatch,useSelector} from 'react-redux'
import FormContainer from '../FormContainer'
import {Form,Button} from 'react-bootstrap'
import { setShippingAdress } from '../../actions/CartActions'
import CheckoutSteps from '../CheckoutSteps'
const ShippingScreen = ({history}) => {
    const dispatch=useDispatch()
    const cartItems=useSelector(state=>state.cartItems)
    const {shippingAddress}=cartItems
    const [shipping,setShipping]=useState({
        address:shippingAddress.address ? shippingAddress.address : '',
        city:shippingAddress.city ? shippingAddress.city : '',
        postalCode:shippingAddress.postalCode ? shippingAddress.postalCode : '',
        country:shippingAddress.country ? shippingAddress.country : ''
    })
    const {address,city,postalCode,country}=shipping
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(setShippingAdress(shipping))
        history.push('/payment')
        console.log(shipping)
    }
    const onChange=(e)=>{
        setShipping({
            ...shipping,[e.target.name]:e.target.value
        })
    }
    return (<>
        <CheckoutSteps step1 step2/>
        <FormContainer>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
                <Form.Label>Enter Address</Form.Label>
                <Form.Control type="text" placeholder="Adress..." value={address} onChange={e=>onChange(e)} name='address'/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Enter City</Form.Label>
                <Form.Control type="text" placeholder="City..." value={city} onChange={e=>onChange(e)} name='city'/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Enter PostalCode</Form.Label>
                <Form.Control type="text" placeholder="PostalCode..." value={postalCode} onChange={e=>onChange(e)} name='postalCode'/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Enter Country</Form.Label>
                <Form.Control type="text" placeholder="Country..." value={country} onChange={e=>onChange(e)} name='country'/>
            </Form.Group>
            <Button type='submit' className='btn-primary py-3'>
                Continue
            </Button>
            </Form>
        </FormContainer>
        </>)
}

export default ShippingScreen
