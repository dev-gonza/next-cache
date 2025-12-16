export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  colors: Color[];
  selectedColor: string;
  image: string;
}

export interface Color {
  code: string;
  name: string;
  hex: string;
}
