import React,{useState} from 'react';
import { ListGroup,Form,Button,Modal, ModalBody } from 'react-bootstrap';
import {IoIosAdd} from 'react-icons/io';
import {BsSearch} from 'react-icons/bs';
import {useNavigate} from 'react-router';
import '../Projects/ProjectForm.css';
import { createProject } from '../../features/projectSlice';




export default function Listing(props) {
   const navigate = useNavigate()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  
  
  
  

  const handleRouteToDetail= (element)=>{
      console.log(element)
      navigate("/detailpage",{state:element})

  }

  return (
    <div className='sidebar'>
    
<div className='sidebar_test'>


                   
<Button variant="primary" onClick={handleShow}>
<i class="IoIosAdd" aria-hidden="true"></i><IoIosAdd/>ADD
</Button>


<Modal show={show} onHide={handleClose} centered>
<Modal.Header closeButton>
<Modal.Title>Add Project</Modal.Title>
</Modal.Header>
<Modal.Body>
          
<Form>
<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
<Form.Label>Project Name</Form.Label>
  
  <Form.Control
                type="text"
                placeholder="Project Name"
                autoFocus
   />
            
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea" rows={3}
                placeholder="Description"
              />
             </Form.Group> 
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Start date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Start Time"
                autoFocus
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Agressive time</Form.Label>
              <Form.Control
                type="date"
                placeholder="Agressive time"
                autoFocus
              />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="time"
                placeholder="End Time"
                autoFocus
              />
            </Form.Group>
            
</Form>
</Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="dark" size='' onClick={handleClose}>
            ADD
          </Button>
          <Button variant="dark" size='' onClick={handleShow}>
            ADD Task
          </Button>
          
        </Modal.Footer>
     
     
      </Modal>
      
      <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
      <Modal.Title>Add Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          
      <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Form.Label>Task Name</Form.Label>
  
       <Form.Control
                type="text"
                placeholder="Task Name"
                autoFocus
        />
        <Form.Control
                type="time"
                placeholder="time duration"
                autoFocus
        />
      </Form.Group>
      </Form>
      </Modal.Body>
      </Modal>



  
      
    </div>

    </div>
  );
}

