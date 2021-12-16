import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import productsApi from "@/api/httpService/products/productsApi";
import setProductsDispatch from "@/redux/actions/products/setProduct";
import ProductActions from "@/redux/actions/products/productActionTypes";

interface DeleteModalProps {
  params: QueryParams | undefined;
  id: number;
  show: boolean;
  mode: string;
  setClose: () => void;
}

function DeleteModal(props: DeleteModalProps) {
  const dispatch = useDispatch();
  const handleSure = () => {
    productsApi.deleteProduct(props.id);
    dispatch(setProductsDispatch(ProductActions.QUERIFIED_LIST, props.params));
    props.setClose();
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
