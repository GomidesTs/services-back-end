export interface ProductProps {
  id: string;
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

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get amount() {
    return this.props.amount;
  }

  get minimum() {
    return this.props.minimum;
  }

  get purchasePrice() {
    return this.props.purchasePrice;
  }

  get salePrice() {
    return this.props.salePrice;
  }
}
