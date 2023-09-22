export interface ProductProps {
  name: string;
  amount: number;
  minimum: number;
  purchasePrice: number;
  salePrice?: number;
}

export class Product {
  private props: ProductProps;

  constructor(props: ProductProps) {
    this.props = props;
  }

  get name() {
    return this.props.name;
  }

  get amount() {
    return this.props.amount;
  }

  get purchasePrice() {
    return this.props.purchasePrice;
  }

  get salePrice() {
    return this.props.salePrice;
  }
}
