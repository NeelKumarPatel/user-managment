import './login.css'
import React, { useEffect, useState, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import api from '../api'
import MyContext from './MyContext';

export default function List() {
    const [responseData, setResponseData] = useState([])
    const [price, setPrice] = useState()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [show, setShow] = useState(false);
    const [currentId, setCurrentId] = useState("");
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [query, setQuery] = useState('');
    const { myValue, setMyValue } = useContext(MyContext);

    const handleClose = () => setShow(false);

    const handleShow = (data) => {
        setShow(true)
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setCurrentId(data._id)


    };

    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async (e) => {
        api.getData(myValue)
            .then(response => {
                setResponseData(response.data.item)
                console.log(response.data.item);
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
    const deleteItem = (data) => {
        console.log("darta", data._id)
        api.deleteData(data._id).then(response => {
            console.log(response);
            fetchData();
        })
            .catch(error => {
                if (error.response) {
                    console.error(error.response.data);
                    console.error(error.response.status);
                    console.error(error.response.headers);
                } else if (error.request) {
                    console.error(error.request);
                } else {
                    console.error('Error', error.message);
                }
            });

    }

    const editItme = async () => {
        const newData = {
            name: name,
            price: price,
            description: description,
            user_id: "63f8eafebfc0e4a524816684"
        }
        await api.editData(currentId, newData);
        handleClose();
        fetchData();
    }

    const sortByProperty = (property) => {
        // const sortedData = [...responseData].sort((a, b) => {
        //   if (sortOrder === 'asc') {
        //     return a.name - b.name;
        //   } else {
        //     return b.name - a.name;
        //   }
        // });

        const sortedData = responseData.sort((a, b) => {
            if (sortOrder === 'asc') {
                if (a[property] < b[property]) {
                    return -1;
                }
                if (a[property] > b[property]) {
                    return 1;
                }
                return 0;
            } else {
                if (a[property] > b[property]) {
                    return -1;
                }
                if (a[property] < b[property]) {
                    return 1;
                }
                return 0;
            }

        });
        console.log("sortedData", sortedData);
        setResponseData(sortedData);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;


    const totalPages = Math.ceil(responseData.length / itemsPerPage);

    const handleClick = (page) => {
        setCurrentPage(page);
    };
    const handleSelectChange = (event) => {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(1);
    };

    const handleInputChange = event => {
        const newQuery = event.target.value;
        setQuery(newQuery);

        const filtered = responseData.filter(item => {
            return item.name.toLowerCase().includes(newQuery.toLowerCase());
        });

        setResponseData(filtered);
    };
    return (
        <div style={{ height: "92vh", padding: "15px" }}>
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Itme!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" >
                                <Form.Label>Item Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Item Name"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" placeholder=" EnterPrice"
                                    onChange={(e) => setPrice(e.target.value)}
                                    value={price}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Details</Form.Label>
                                <Form.Control type="text" placeholder="Enter Details"
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => editItme()}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>

            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleInputChange}
            />

            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th >SrNo</th>
                        <th >Item
                            <button style={{ border: "none", marginLeft: "18px" }} onClick={() => sortByProperty('name')}>
                                Sort by Name {sortOrder === 'asc' ? '↑' : '↓'}
                            </button>
                        </th>
                        <th > Price </th>
                        <th >
                            Description
                            <button style={{ border: "none", marginLeft: "18px" }} onClick={() => sortByProperty('description')}>
                                Sort by Description {sortOrder === 'asc' ? '↑' : '↓'}
                            </button>
                        </th>
                        <th >Action</th>
                    </tr>
                </thead>
                {responseData.length > 0 ?
                    responseData.slice(indexOfFirstItem, indexOfLastItem)?.map((data, i) => {

                        return (
                            <tbody key={i}>
                                <tr>
                                    <td>{i + 1}</td>
                                    <td onChange={(e) => setName(e.target.value)}>{data.name}</td>
                                    <td onChange={(e) => setPrice(e.target.value)}>{data.price}</td>
                                    <td onChange={(e) => setDescription(e.target.value)}>{data.description}</td>
                                    <td>
                                        <button onClick={(e) => handleShow(data, e)}>Edit</button>
                                        <button onClick={(e) => deleteItem(data, e)}>Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })
                    :
                    <tbody>
                        <tr>
                            <td style={{ textAlign: "center" }} colSpan={5}>No Data Found</td>

                        </tr>
                    </tbody>

                }


            </Table>

            <div style={{ display: "flex" }}>
                <div>
                    <label htmlFor="itemsPerPage">Items per page:</label>
                    <select id="itemsPerPage" value={itemsPerPage} onChange={handleSelectChange}>
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <div>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button style={{ marginLeft: "10px" }} key={index} onClick={() => handleClick(index + 1)}>
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>

        </div>
    )
}
