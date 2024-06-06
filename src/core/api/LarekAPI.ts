import { IOrder, IOrderSuccess, IProduct } from '../../types';
import { Api, ApiListResponse } from "../api/ApiCore";

export class LarekAPI extends Api implements LarekAPI {
  readonly cdn: string;

  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
  }

  getProduct(id: string): Promise<IProduct> {
    return this.get(`/product/${id}`).then(
      (item: IProduct) => ({
        ...item,
        image: this.cdn + item.image
      })
    )
  }

  getProductList(): Promise<IProduct[]> {
    return this.get('/product').then((data: ApiListResponse<IProduct>) =>
        data.items.map((item) => ({
            ...item,
            image: this.cdn + item.image
        }))
    );
}

  orderProduct(order: IOrder): Promise<IOrderSuccess> {
    return this.post(`/order`, order)
    .then((data: IOrderSuccess) => data)
  }
}