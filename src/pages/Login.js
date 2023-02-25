import './login.css';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useContext }                                         from "react";
import { Link, useNavigate }                                            from "react-router-dom";
import Button                                                           from 'react-bootstrap/Button';
import Form                                                             from 'react-bootstrap/Form';
import {toast, ToastContainer}                                          from 'react-toastify';
import axios                                                            from 'axios';
import MyContext                                                        from './MyContext';
import setAuthToken                                                     from '../api/authtoken';

const Home = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { myValue, setMyValue } = useContext(MyContext);
    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if(email === ""){
            toast.error("Please enter email address")
            return ;
        }else if(password === ""){
            toast.error("Please enter password")
            return ;
        }
        const newData = {
            "userEmail": email,
            "userPassword": password
        }
        const data = await  axios.post("http://localhost:5000/user/login", newData)
    
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user_id', data.data.user[0]._id);
        setAuthToken(data.data.token)
        setMyValue(data.data.user[0]._id)

        if (data.data.token) {
            navigate('/list-itme')
        }
    }
    return (
        <>
            <section className="card">
                <ToastContainer />
                <Form onSubmit={submitForm}>
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
                        <Link to='/signup' >
                            createNewAccount
                        </Link>
                    </div>
                </Form>

            </section>
        </>
    );
};

export default Home;
