export interface ProviderProps {
  id: string;
  name: string;
  fantasy: string;
  cnpj: string;
}

export class Provider {
  private props: ProviderProps;

  constructor(props: ProviderProps) {
    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get fantasy() {
    return this.props.fantasy;
  }

  get cnpj() {
    return this.props.cnpj;
  }
}
