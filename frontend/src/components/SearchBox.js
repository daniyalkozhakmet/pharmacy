import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
const SearchBox = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    if(keyword){
        history.push(`/?keyword=${keyword}&pages=1`)
    }else{
        history.push(history.location.pathname)
    }
  };
  const [keyword, setKeyword] = useState("");
  const history=useHistory()
  return (
    <Form onSubmit={submitHandler} className='my-1' style={{display:'flex',justifyContent:'space-between'}} >
      <Form.Control
        type="text"
        className="mr-sm-2 ml-sm-5"
        name="q"
        //value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2 mx-1">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
