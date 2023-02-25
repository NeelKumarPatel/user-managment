import './login.css'
import 'react-toastify/dist/ReactToastify.css';
import React                                                    from 'react'
import { useState }                                             from "react";
import { Link, useNavigate }                                    from "react-router-dom";
import Button                                                   from 'react-bootstrap/Button';
import Form                                                     from 'react-bootstrap/Form';
import axios                                                    from 'axios';
import { toast, ToastContainer }                                from 'react-toastify';
import setAuthToken                                             from '../api/authtoken';


function Signup() {

    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const submitForm = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(email, password, userName)
        if (email === "") {
            toast.error("Please enter email address")
            return;
        } else if (password === "") {
            toast.error("Please enter password")
            return;
        } else if (userName === "") {
            toast.error("Please enter user name")
            return;
        }
        const newData = {
            "userEmail": email,
            "userPassword": password,
            "userName": userName
        }
        const data = await axios.post("http://localhost:5000/user/signup", newData)
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user_id', data.data.user._id);
        setAuthToken(data.data.token)
        if (data.data.token) {
            navigate('/list-itme')
        }
    }

    return (
        <section className="card">
            <ToastContainer />
            <Form onSubmit={submitForm}>

                <Form.Group className="mb-3">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter UserName" onChange={(e) => setUserName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                    <Form.Text className="text-muted" >
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <div className='bottom-bar'>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <Link to='/' >
                        Already an account?
                    </Link>
                </div>
            </Form>

        </section>
    )
}

export default Signup