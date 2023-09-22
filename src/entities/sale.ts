export interface SaleProps {
  id: string;
  percentage: number;
}

export class Sale {
  private props: SaleProps;

  constructor(props: SaleProps) {
    this.props = props;
  }

  get percentage() {
    return this.props.percentage;
  }

  get id() {
    return this.props.id;
  }
}
