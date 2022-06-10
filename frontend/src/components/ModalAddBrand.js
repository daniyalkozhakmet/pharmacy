import { Modal, Button, Form, Container, Col, Row } from "react-bootstrap";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector, useDispatch } from "react-redux";
import { createBrand } from "../actions/brandActions";
export const ModelAddBrand = (props) => {
  const dispatch = useDispatch();
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const convertDate = (str) => {
    str = str.toString();
    let parts = str.split(" ");
    let months = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    return parts[3] + "-" + months[parts[1]] + "-" + parts[2];
  };
  const addBrandHandler = (e) => {
    props.onHide();
    submitHandler(e);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createBrand({
        name: brand,
        foundation: convertDate(startDate),
        description,
        country,
      })
    );
    console.log(brand, convertDate(startDate), description, country);
  };
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Бренд қосу</Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Бренд</Form.Label>
              <Form.Control
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Бренд атауы"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Бренд кұрылған уақыт</Form.Label>
              <DatePicker
                selected={startDate}
                value={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Ел</Form.Label>
              <Form.Control
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Ел"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Сипаттама</Form.Label>
              <Form.Control
                as="textarea"
                value={description}
                rows={3}
                placeholder="Бренд сипаттамасы"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={(e) => addBrandHandler(e)}>Қосу</Button>
      </Modal.Footer>
    </Modal>
  );
};
