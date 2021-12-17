import { useEffect, useState } from "react";
import { Modal, Button, Form, FloatingLabel } from "react-bootstrap";
import productsApi from "@/api/httpService/products/productsApi";
import { updateProductDto } from "@/api/types/newProduct/productUpdateDto";

interface ModalProps {
  isOpen: boolean;
  mode: string;
  save: (e: updateProductDto) => void;
  update: (e: updateProductDto) => void;
  setOpen: (e: boolean) => void;
  product?: updateProductDto;
}

function BtEditModal(props: ModalProps) {
  const [answer, setAnswer] = useState<updateProductDto>();
  const { product } = props;

  const [vendors, setVendors] = useState<{ id: number; name: string }[]>([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    async function fetchData() {
      const vend = await productsApi.apiGetVendors();
      const cate = await productsApi.apiGetCategory();

      if (vend) {
        setVendors(vend);
      }
      if (cate) {
        setCategories(cate);
      }
    }

    fetchData();
  }, []);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [vendor, setVendor] = useState<{ id: number; name: string }>();
  const [category, setCategory] = useState<{ id: number; name: string }>();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setVendor(vendors.find((elem) => elem.id === product.vendorId));
      setCategory(categories.find((elem) => elem.id === product.categoryId));
    }
  }, [product]);

  const handleNameChange = (e: string) => {
    setName(e);
  };

  const handleDescriptionChange = (e: string) => {
    setDescription(e);
  };
  const handlePriceChange = (e: string) => {
    setPrice(Number(e));
  };
  const handleVendorChange = (e: number) => {
    setVendor(vendors.find((elem) => elem.id === Number(e)));
  };
  const handleCategoryChange = (e: string) => {
    setCategory(categories.find((elem) => elem.id === Number(e)));
  };

  const submit = () => {
    setAnswer({
      name,
      description,
      price,
      vendorId: vendor ? vendor.id : 0,
      categoryId: category ? category.id : 0,
      id: props.product?.id,
    });
  };

  useEffect(() => {
    submit();
  }, [name, price, description, vendor, category]);

  return (
    <Modal key={product} show={props.isOpen && (props.mode === "create" || props.mode === "update")} centered>
      <Modal.Header>
        <Modal.Title>
          {props.mode === "create" ? "Create new item" : `Update item with id:${props?.product.id}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Computer name</Form.Label>
            <Form.Control
              type="email"
              value={name}
              onChange={(e) => handleNameChange(e.currentTarget.value)}
              placeholder="Name"
            />
            <Form.Text className="text-muted">Tell how we should show your beautiful PC to users</Form.Text>
          </Form.Group>

          <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => handleDescriptionChange(e.currentTarget.value)}
              placeholder="Tell us more about it"
            />
          </FloatingLabel>
          <Form.Group className="mb-3" controlId="formBasicCustomer">
            <Form.Control
              type="text"
              placeholder="Price"
              value={price}
              onChange={(e) => handlePriceChange(e.currentTarget.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCustomer">
            <Form.Label>Vendor</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => handleVendorChange(e.currentTarget.value)}
            >
              <option>Pick vendor from list below</option>
              {vendors &&
                vendors.map((elem) => (
                  <option key={elem.id} value={elem.id}>
                    {elem.name}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCustomer">
            <Form.Label>Category</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => handleCategoryChange(e.currentTarget.value)}
            >
              <option>Pick category from list below</option>
              {categories &&
                categories.map((elem) => (
                  <option key={elem.id} value={elem.id}>
                    {elem.name}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            props.setOpen(false);
          }}
        >
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            if (props.mode === "create") {
              if (answer) {
                props.save(answer);
              }
            } else if (answer) {
              props.update(answer);
            }
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BtEditModal;
