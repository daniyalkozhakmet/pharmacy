import React,{useState,useEffect}from 'react'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import FormContainer from '../FormContainer'
import { Link } from 'react-router-dom'
import {Form,Button} from 'react-bootstrap'
import { userLogin1,func } from '../../actions/userActions'
import Message from '../Message'
import Loader from '../Loader'
const LoginScreen = ({location,match,history}) => {
const dispatch = useDispatch()
const redirect=location.search ? location.search.split('=')[1] : '/'

const userLogin=useSelector(state=>state.userInfo)

const {loading,error,userInfo}=userLogin

useEffect(()=>{
  if(userInfo && userInfo.username){
    history.push(redirect)
  }
},[history,userInfo,redirect])
const [user,setUser]=useState({
    email:'',
    password:''
})
const {email,password} = user

const onChange=(e)=>{
    setUser({
        ...user,[e.target.name]:e.target.value
    })
}

const onSubmitHandler=async(e)=>{
  e.preventDefault()
  dispatch(userLogin1(email,password))
}
return (
        <FormContainer>
            <h1>Sign In</h1>
            {loading && <Loader/>}
            {error && <Message variant='danger'>{error}</Message>}
            <Form onSubmit={onSubmitHandler}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email</Form.Label>
    <Form.Control type="text" name='email' required placeholder="Enter email" value={email} onChange={e=>onChange(e)} />
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password"  name='password' required placeholder="Password" value={password} onChange={e=>onChange(e)}/>
  </Form.Group>
  <Button variant="primary" type="submit" className='mx-1'>
    Sign in
  </Button>
  Don't have an Account? <Link to='/register'>Register</Link>
</Form>
        </FormContainer>
    )
}

export default LoginScreen
 