import { Card, Button } from "react-bootstrap";
import defaultIMg from "../../../assets/images/profile/default-profile.jpg";
import styles from "./styles.module.scss";

export interface ProductCardProps {
  label: string;
  shortDescription: string;
  price: string;
  img?: string;
}

function ProductCard(props: ProductCardProps) {
  return (
    <Card style={{ width: "18rem" }} className={styles.card_container} color="black">
      <Card.Img variant="top" src={props.img ? props.img : defaultIMg} />

      <Card.Body>
        <Card.Title>{props.label}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.price}</Card.Subtitle>
        <Card.Text>{props.shortDescription}</Card.Text>
        <Button className={styles.btn} variant="primary">
          Add to orders
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
