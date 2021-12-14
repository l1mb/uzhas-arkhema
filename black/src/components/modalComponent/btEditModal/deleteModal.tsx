import { Modal, Button } from "react-bootstrap";
import productsApi from "@/api/httpService/products/productsApi";

interface DeleteModalProps {
  id: number;
  show: boolean;
  mode: string;
  setClose: () => void;
}

function DeleteModal(props: DeleteModalProps) {
  const handleSure = () => {
    props.setClose();
    productsApi.deleteProduct(props.id);
  };

  const handleDecline = () => {
    props.setClose();
  };
  return (
    <Modal show={props.show && props.mode === "delete"} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Think twice</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Do you realy want to delete this item?</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            handleSure();
          }}
        >
          Sure
        </Button>
        <Button
          onClick={() => {
            handleDecline();
          }}
        >
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
