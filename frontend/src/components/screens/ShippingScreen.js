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
            <h1>Жеткізу мәліметі</h1>
            <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3">
                <Form.Label>Адрес</Form.Label>
                <Form.Control type="text" placeholder="Адрес..." value={address} onChange={e=>onChange(e)} name='address'/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Қала</Form.Label>
                <Form.Control type="text" placeholder="Қала..." value={city} onChange={e=>onChange(e)} name='city'/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Пошта индексі</Form.Label>
                <Form.Control type="text" placeholder="Пошта индексі..." value={postalCode} onChange={e=>onChange(e)} name='postalCode'/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Ел</Form.Label>
                <Form.Control type="text" placeholder="Ел..." value={country} onChange={e=>onChange(e)} name='country'/>
            </Form.Group>
            <Button type='submit' className='btn-primary py-3'>
                Жалғастыру
            </Button>
            </Form>
        </FormContainer>
        </>)
}

export default ShippingScreen
