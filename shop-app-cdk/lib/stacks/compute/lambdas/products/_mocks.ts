export type TProduct = {
    id: string,
    title: string,
    description: string,
    price: number,
    count: number
  }
  
  export const products: TProduct[] = [
    {
      description: "Nintendo Switch Product Description",
      id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
      price: 24,
      title: "ProductOne",
      count: 1,
    },
    {
      description: "PlayStation Product Description",
      id: "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
      price: 15,
      title: "ProductTitle",
      count: 2,
    },
    {
      description: "SEGA Product Description",
      id: "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
      price: 23,
      title: "Product",
      count: 3,
    },
  ];