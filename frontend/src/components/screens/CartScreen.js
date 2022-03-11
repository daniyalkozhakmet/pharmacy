import React,{useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import {Col,Row,Image,ListGroup,Form,Button,Card} from 'react-bootstrap'
import { addCart,removeCart } from '../../actions/CartActions'
import {Link} from 'react-router-dom'
import Message from '../Message'
const CartScreen = ({match,location,history}) => {
    const id=match.params.id
    const redirect=location.search ? location.search.split('=')[1] : ''
    const qty=Number(location.search.split('=')[1])
    const dispatch=useDispatch()
    const cart=useSelector(state=>state.cartItems)
    const {cartItems}=cart
    useEffect(()=>{
        if(id){
dispatch(addCart(id,qty))
        }
    },[dispatch,id,qty])

    
    const removeCartHandler=(pk)=>{
        dispatch(removeCart(pk))
    }

    const checkoutHandler=()=>{
        history.push('/login?redirect=shipping')
    }
    return (
        <div>
            <Row>
            <Col md={8}>
            <h1>Cart Products</h1>
            {cartItems.length==0 ? <Message variant='info'>Cart is Empty <Link to='/'>Go Shopping</Link></Message>:
<div>


<ListGroup variant='flush'>

{cartItems.map(item => (
    <ListGroup.Item key={item.product}>
        <Row>
            <Col md={2}>
                <Image src={item.image} fluid/>
            </Col>
            <Col md={3}>
                <Link to={`/product/${item.product}?redirect=cart`}>{item.name}</Link>
            </Col>
            <Col md={2}>
                ${item.price}
            </Col>
            <Col md={2}>
            <Form.Control
                        as='select'
                        value={item.qty}
                        onChange={(e)=>dispatch(addCart(item.product,Number(e.target.value)))}
                        >{
                            [...Array(item.countInStock).keys()].map(x=>(
                                <option key={x+1} value={x+1}>{x+1}</option>
                            ))
                        }
                            </Form.Control>
            </Col>
            <Col>
            <Button  variant='light' onClick={(e)=>removeCartHandler(item.product)}><i className='fas fa-trash'></i></Button>
            </Col>
        </Row>
    </ListGroup.Item>
))    }

</ListGroup>
</div>
            }
            </Col>
            <Col md={4}  className='py-2'>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc,item)=>acc+Number(item.qty),0)}) items</h2>
                            $ {cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                            <Button type='button' className='btn btn-block' onClick={checkoutHandler} disabled={cartItems.length==0}>Proceed To Checkout</Button>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
            </Row>
        </div>
    )
}

export default CartScreen
