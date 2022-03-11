import React,{useState,useEffect}from 'react'
import {useDispatch,useSelector} from 'react-redux'
import FormContainer from '../FormContainer'
import { Link } from 'react-router-dom'
import {Form,Button} from 'react-bootstrap'
import Message from '../Message'
import Loader from '../Loader'
import { userRegister } from '../../actions/userActions'
const RegisterScreen = ({location,match,history}) => {
const dispatch = useDispatch()
const redirect=location.search ? location.search.split('=')[1] : '/'
const userLogin=useSelector(state=>state.userInfo)
const {loading,error,userInfo}=userLogin
const [user,setUser]=useState({
    password2:'',
    email:'',
    password:'',
    name:''
})
const {email,password,password2,name} = user
const [msg,setMsg]=useState('')
const onChange=(e)=>{
    setUser({
        ...user,[e.target.name]:e.target.value
    })
}

const onSubmitHandler=(e)=>{
    e.preventDefault()
    if(password !== password2){
        setMsg('Password does not match')
        console.log(msg)
    }
    else{
        console.log(user)
        dispatch(userRegister(email,password,name))
    }
}

useEffect(()=>{
  if(userInfo && userInfo.name){
    history.push(redirect)
  }
},[history,userInfo,redirect])
return (
        <FormContainer>
            <h1>Sign Up</h1>
            {loading && <Loader/>}
            {msg &&  <Message variant='danger'>{msg}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            <Form onSubmit={onSubmitHandler}>

  <Form.Group className="mb-3" controlId="formBasicName">
    <Form.Label>Name</Form.Label>
    <Form.Control type="text" name='name' required placeholder="Enter name" value={name} onChange={e=>onChange(e)} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email</Form.Label>
    <Form.Control type="text" name='email' required placeholder="Enter email" value={email} onChange={e=>onChange(e)} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password"  name='password' required placeholder="Password" value={password} onChange={e=>onChange(e)}/>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicPassword2">
    <Form.Label>Confirm Password</Form.Label>
    <Form.Control type="password" name='password2' required placeholder="Confirm Password" value={password2} onChange={e=>onChange(e)} />
</Form.Group>
  <Button variant="primary" type="submit"  className='mx-1'>
    Sign up
  </Button>
  Already have an Account? <Link to='/login'>Login</Link>
</Form>
        </FormContainer>
    )
}

export default RegisterScreen
 