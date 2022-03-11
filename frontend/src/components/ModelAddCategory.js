import { Modal, Button, Form, Container, Col, Row } from "react-bootstrap";
import FormContainer from "./FormContainer";
import {useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {createCategory} from '../actions/categoryActions'
export const ModelAddCategory = (props) => {
  const dispatch=useDispatch()
  const [category,setCategory]=useState('')
  const addCategoryHandler=(e)=>{
    props.onHide()
    submitHandler(e)
  }
  const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(createCategory({name:category}))
    console.log(category)
  }
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Category
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Category</Form.Label>
              <Form.Control type="text" value={category} onChange={e=>setCategory(e.target.value)} placeholder="Enter category" />
            </Form.Group>
          </Form>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={e=>addCategoryHandler(e)}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
};
