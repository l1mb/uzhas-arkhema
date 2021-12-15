import { Button } from "@mui/material";
import { Form, Modal } from "react-bootstrap";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import postOrderEntity from "@/types/interfaces/order/postOrderEntity";
import getUserId from "@/helpers/token/getUserId";
import orders from "@/api/httpService/orders/orders";
import styles from "./styles.module.scss";

interface createModalProp {
  show: boolean;
  product: updateProductDto;
  setOpen: (e: boolean) => void;
}

function CreateOrderModal(props: createModalProp) {
  const [rentStartDate, setrentStartDate] = useState(new Date());

  const [rentEndDate, setrentEndDate] = useState(new Date());

  const [phone, setPhone] = useState("");
  const handleAdd = async () => {
    const userId = Number(getUserId());
    const postDto: postOrderEntity = {
      userId,
      productId: Number(props.product.id),
      phone,
      rentStartDate: rentStartDate.toLocaleDateString().slice(0, 10),
      rentEndDate: rentEndDate.toLocaleDateString().slice(0, 10),
    };
    const res = await orders.postOrder(postDto);
  };

  const handlePhoneChange = (e: string) => {
    setPhone(e);
  };
  function handleBack() {
    props.setOpen(false);
  }

  return (
    <Modal size="sm" show={props.show} aria-labelledby="contained-modal-title-vcenter" centered sx={{ width: "320px" }}>
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">Think twice</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.container}>
        <h4>Add new order</h4>

        <Form.Group className="mb-3" controlId="formBasicCustomer">
          <Form.Label>Rent start date</Form.Label>
          <DatePicker selected={rentStartDate} className={styles.date} onChange={(date) => setrentStartDate(date)} />
          <Form.Label>Rent end date</Form.Label>
          <DatePicker selected={rentEndDate} className={styles.date} onChange={(date) => setrentEndDate(date)} />
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Phonkk numbere"
            value={phone}
            onChange={(e) => handlePhoneChange(e.currentTarget.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            handleBack();
          }}
        >
          Go back
        </Button>
        <Button
          onClick={() => {
            handleAdd();
          }}
        >
          Sure
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateOrderModal;
