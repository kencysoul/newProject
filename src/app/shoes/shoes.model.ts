export class shoes {
    id: string;
    name: string;
    brand: string;
    size: number;
    price: number;
    quantity: number;

    constructor(id: string = '', name: string  = '', brand: string  = '', size: number = 0, price: number = 0, quantity: number = 0) {
        this.id = id;
        this.name = name;
        this.brand = brand;
        this.size = size;
        this.price = price;
        this.quantity = quantity;
    }
}

export interface ishoes {
    id: string;
    name: string;
    brand: string;
    size: number;
    price: number;
    quantity: number;
}