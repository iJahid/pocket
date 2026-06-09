export type Product = {
  id: number;
  image: string | null;
  name: string;
  price: number;
};

export type PizzaSize = 'S' | 'M' | 'L' | 'XL';


export const OrderStatusList: OrderStatus[] = [
  'New',
  'Cooking',
  'Processing',
  'Shipped',
  'Delivered',
];

export type OrderStatus = 'New' | 'Cooking' | 'Processing' | 'Shipped' | 'Delivered';

export type Orders = {
  id: number;
  created_at: string;
  order_by: string;
  order_to: string;
  status: string;
  product_id:number;
  group_id:number;
  
};

export type OrderItem = {
  id: number;
  product_id: number;
  products: Product;
  order_id: number;
  size: PizzaSize;
  quantity: number;
};

export type Profile = {
  id: string;
  email:string;
  name:string;
  avater:string
  group: Groups;
};

export type Groups = {
  id: string;
  
  name:string;
  owner: string;
};

export type GroupMembers={
  group_id:string;
  user_id:string;
  role:string;
};

export type expDataType={
expdate:string;
category:string;
item:string;
amount:string;
notes:string;
expType:string;
bankID:string;
isAdd:boolean;
}

export type expDataTypeDB={
  
 //id:number | null;
 // $created_at:Date;
  xndate :Date | string | undefined;
  category :string;
  item :string;
  amount :number | null;
  notes :string | null;
  xninout :number;
  xntype :string;
  bankid :number | null;
  bank_name :string | null;
  user_id:string;
  xn_for:string | 'XP';
  xn_group:string | null;
 // isAdd:boolean;
}
export type expDataTypeDBUpdate={
  
  id:number ;
  created_at:Date |string;
  xndate :Date | string;
  category :string;
  item :string;
  amount :number | null;
  notes :string | null;
  xninout :number;
  xntype :string;
  bankid :number;
  bank_name :string;
  user_id:string;
  xn_for:string | 'XP';
  xn_group:string | null;
 // isAdd:boolean;
}

export type xGroupTypeDBUpdate={
  id:number ;
  catg_from:string;
  catg_to:  string;  
  grp_type:string;
  user_id:string;
  amount:number;
  xndate:Date | string;
}

export type xGroupTypeDBAdd={

  catg_from:string;
  catg_to:  string;  
  grp_type:string;
  user_id:string;
  amount:number | null;
  xndate:Date | string;
}