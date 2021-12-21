import { Modal, Button } from 'react-bootstrap';

import { deleteProject, deleteTask } from 'api/api';
import { useNavigate } from 'react-router-dom';

const handleDelete = async (ID, setError, type) => {
  try {
    const deleteItem = type === 'project' ? deleteProject : deleteTask;
    const token = localStorage.getItem('token');
    await deleteItem(token, ID);
  } catch (error) {
    setError({ status: true, message: error.response.data.message });
  }
};

const DeleteModal = ({
  type,
  modalShow,
  setModalShow,
  setItems,
  retrieveItems,
  setError,
  ID,
  projectID,
  setLoading,
}) => {
  const navigate = useNavigate();
  return (
    <Modal show={modalShow} centered>
      <Modal.Header>
        <Modal.Title>{`Delete ${type}`}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setModalShow(false)}>
          Cancel
        </Button>
        <Button
          onClick={async () => {
            const params =
              type === 'project'
                ? [setItems, setError]
                : [projectID, setItems, setLoading, navigate];
            await handleDelete(ID, setError, type);
            await retrieveItems(...params);
            setModalShow(false);
          }}
          variant="primary"
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
