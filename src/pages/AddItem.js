import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import {  useNavigate } from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../api';

function AddItem() {
    const [price, setPrice] = useState()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [userId, setUserId] = useState("")

    useEffect(() => {
      const id = localStorage.getItem("user_id")
      setUserId(id)
    }, [])
    

const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();
        const newData = {
            name: name,
            price: price,
            description: description,
            user_id:userId
        }
        if(name === ""){
            toast.error("Please enter Name of item")
            return ;
        }else if(price === ""){
            toast.error("Please enter price")
            return ;
        }else if(description === ""){
            toast.error("Please enter description")
            return ;
        }
        await api.postData(newData)
            .then(response => {
                // setResponseData(response.data.item)
                console.log(response);

                resetData();
                navigate('/list-itme')
            })
            .catch(error => {
                if (error.response) {
                    // The server returned an error response (4xx or 5xx)
                    console.error(error.response.data);
                    console.error(error.response.status);
                    console.error(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.error('Error', error.message);
                }
            });
    }
    const resetData = () => {
        setName("");
        setDescription("");
        setPrice();
    }

    return (
        <div>
            <ToastContainer />
            <Card >
                <Card.Body>
                    <Form onSubmit={submitForm}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Item Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Item Name"
                            onChange={(e)=>setName(e.target.value)} 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" placeholder=" EnterPrice"
                            onChange={(e)=>setPrice(e.target.value)} 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Details</Form.Label>
                            <Form.Control type="text" placeholder="Enter Details"
                            onChange={(e)=>setDescription(e.target.value)} 
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default AddItem