// Импорт интерфейсов из типов
import { IOrder, IOrderSuccess, IProduct } from "../types";

// Импорт базового класса API и типа ответа списка из API
import { Api, ApiListResponse } from "./base/api";

// Интерфейс API для приложения Larek
interface ILarekAPI {
  getProductList: () => Promise<IProduct[]>; // Получение списка продуктов
  getProduct: (id: string) => Promise<IProduct>; // Получение продукта по ID
  orderProduct: (order: IOrder) => Promise<IOrderSuccess>; // Оформление заказа
}

// Класс для работы с API Larek
export class LarekAPI extends Api implements ILarekAPI {
  readonly cdn: string; // URL для CDN

  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
  }

  // Получение продукта по ID
  getProduct(id: string): Promise<IProduct> {
    return this.get(`/product/${id}`).then(
      (item: IProduct) => ({
        ...item,
        image: this.cdn + item.image // Добавление CDN к URL изображения
      })
    );
  }

  // Получение списка продуктов
  getProductList(): Promise<IProduct[]> {
    return this.get('/product').then((data: ApiListResponse<IProduct>) =>
        data.items.map((item) => ({
            ...item,
            image: this.cdn + item.image // Добавление CDN к URL изображения
        }))
    );
  }

  // Оформление заказа
  orderProduct(order: IOrder): Promise<IOrderSuccess> {
    return this.post(`/order`, order)
    .then((data: IOrderSuccess) => data);
  }
}
