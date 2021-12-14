import { Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import StateType from "@/redux/types/stateType";
import defaultIMg from "../../../assets/images/profile/default-profile.jpg";
import styles from "./styles.module.scss";
import roles from "@/types/constants/roles/roles";

export interface ProductCardProps {
  label: string;
  shortDescription: string;
  price: string;
  id: number;
  img?: string;
  setMode: (e: string) => void;
  setProduct: (e: updateProductDto) => void;
}

function ProductCard(props: ProductCardProps) {
  const role = useSelector<StateType, string>((state) => state.role);

  const handleDelete = () => {
    props.setMode("delete");
    props.setProduct({ id: props.id } as updateProductDto);
  };

  const handleUpdate = () => {
    props.setMode("update");
    const user: updateProductDto = {
      categoryId: 1,
      name: props.label,
      description: props.shortDescription,
      price: 3,
      vendorId: 3,
      id: props.id,
    };
    props.setProduct(user);
  };
  return (
    <Card style={{ width: "18rem" }} className={styles.card_container} color="black">
      <Card.Img variant="top" src={props.img ? props.img : defaultIMg} />

      <Card.Body>
        <Card.Title>{props.label}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.price}</Card.Subtitle>
        <Card.Text>{props.shortDescription}</Card.Text>
        <div>
          {role === roles.admin && (
            <div>
              <Button className={styles.btn} variant="success" onClick={handleUpdate}>
                Update user
              </Button>
              <Button className={styles.btn} variant="alert" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          )}
          <Button className={styles.btn} variant="primary">
            Add to orders
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
