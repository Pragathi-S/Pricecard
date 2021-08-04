import React,{ useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsFillChatSquareDotsFill } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import 'react-responsive-modal/styles.css';
import { Table, Button, Form,Modal } from "react-bootstrap";

const API_URL = "https://jsonplaceholder.typicode.com/posts";


class CrudApp extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      id: "",
      userId: "",
      title: "",
      body: ""
    };
  }

  componentDidMount = () => this.getPosts();

  getPosts = async () => {
    // API Call to server and get all posts
    try {
      const { data } = await axios.get(API_URL);
      this.setState({ posts: data });
    } catch (err) {
      console.error(err);
    }
  };

  createPost = async () => {
    // API Call to server and add new post
    try {
      const { userId, title, body } = this.state;
      const { data } = await axios.post(API_URL, {
        userId,
        title,
        body,
      });
      const posts = [...this.state.posts];
      posts.push(data);
      this.setState({ posts, userId: "", title: "", body: "" });
    } catch (err) {
      console.error(err);
    }
  };

  updatePost = async () => {
    // API Call to server and update an existing post
    try {
      const { id, userId, title, body, posts } = this.state;
      const { data } = await axios.put(`${API_URL}/${id}`, {
        userId,
        title,
        body,
      });
      const index = posts.findIndex((post) => post.id === id);
      posts[index] = data;

      this.setState({ posts, id: "", userId: "", title: "", body: "" });
    } catch (err) {
      console.log(err);
    }
  };

  deletePost = async (postId) => {
    // API Call to server and delete post
    try {
      await axios.delete(`${API_URL}/${postId}`);

      let posts = [...this.state.posts];
      posts = posts.filter(({ id }) => id !== postId);

      this.setState({ posts });
    } catch (err) {
      console.error(err);
    }
  };

  selectPost = (post) => this.setState({ ...post });

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted...");
    if (this.state.id) {
      this.updatePost();
    } else {
      this.createPost();
    }
  };

  render() {
    return (
      <div className='m-5' >
        <h6 className="text-center"><strong>Basic CRUD App</strong></h6>
        <Form onSubmit={this.handleSubmit}>
          {/* <Form.Group className="mb-3" controlId="formName">
          <Form.Label column sm="2"> Name  &nbsp;</Form.Label>
          <Form.Control
            type="text"
            size="sm"
            className="mx-auto"

            name="name"
            value={this.state.userId}
            onChange={this.handleChange}
          />
        </Form.Group> */}
          <Form.Group className="mb-3" controlId="formUserID">
            <Form.Label column sm="2"> UserID  &nbsp;</Form.Label>
            <Form.Control
              type="number"
              size="sm"
              className="mx-auto"

              name="userId"
              value={this.state.userId}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label column sm="2"> Title  &nbsp;</Form.Label>
            <Form.Control
              type="text"
              size="sm"
              className="mx-auto"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBody">
            <Form.Label column sm="2"> Body  &nbsp;</Form.Label>
            <Form.Control
              type="text"
              size="sm"
              className="mx-auto"
              as="textarea" rows={3}
              name="body"
              value={this.state.body}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant="success" type="submit">
            Submit
          </Button>
          <br></br>
          <br></br>
        </Form>
        <Table hover size="sm">
          <thead>
            <tr>
              <th width="1%" className="text-center">Id</th>
              <th width="1%" className="text-center">UserId</th>
              <th width="10%" className="text-center">Title</th>
              <th width="30%" className="text-center">Body</th>
              <th width="1%" className="text-center" colSpan="4">Action</th>
              {/* <th></th>
            <th></th>
            <th></th> */}
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => {
              return (
                <tr key={post.id}>
                  <td className="text-center">{post.id}</td>
                  <td className="text-center">{post.userId}</td>
                  <td>{post.title}</td>
                  <td>{post.body}</td>
                  <td>
                    <UserDetails/>
                  </td>
                  <td>
                    <Comments/>
                  </td>
                  <td>
                    <Button variant="light" size="sm" onClick={() => this.selectPost(post)}><BsPencil /></Button>
                  </td>
                  <td>
                    <Button variant="light" size="sm" onClick={() => this.deletePost(post.id)}><BsFillTrashFill /></Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
};


function UserDetails() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState()
  const fetchURL = "https://jsonplaceholder.typicode.com/users"
  const getData = (id) =>
    fetch(`${fetchURL}/${id}`)
      .then((res) => res.json())

  useEffect(() => {
    getData().then((data) => setData(data))
  }, [])


  return (
    <>
      <Button variant="light" size="sm" onClick={handleShow}><BsFillPersonFill /></Button>

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Table hover size="sm">
        <thead>
          <tr>
            <th width="25%" className="text-center">Name</th>
            <th className="text-center">Email</th>
            <th width="25%" className="text-center">Phone</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data) => {
            return (
              <tr key={data.id}>
                <td className="text-center">{data.name}</td>
                <td className="text-center">{data.email}</td>
                <td>{data.phone}</td>
              </tr>
             );
          })}
        </tbody>
      </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
function Comments() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState()
  const fetchURL = "https://jsonplaceholder.typicode.com/posts"
  const getData = (postId) =>
    fetch(`${fetchURL}/${postId}/comments`)
      .then((res) => res.json())

  useEffect(() => {
    getData().then((data) => setData(data))
  }, [])


  return (
    <>
      <Button variant="light" size="sm" onClick={handleShow}><BsFillChatSquareDotsFill/></Button>

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Post comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Table hover size="sm">
        <thead>
          <tr>
            <th width="25%" className="text-center">Name</th>
            <th width="29%" className="text-center">Email</th>
            <th className="text-center">Body</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data) => {
            return (
              <tr key={data.id}>
                <td className="text-center">{data.name}</td>
                <td className="text-center">{data.email}</td>
                <td>{data.body}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};


export default CrudApp;
