export interface CreateVendorInput {
    name: string;
    ownerName: string;
    foodType: [string];
    pinCode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
}

export interface VendorLoginInput {
    email: string;
    password: string
}

export interface VendorPayload {
    _id: string;
    email: string;
    name: string;
    foodTypes: [string];

}

export interface editVendorInputs {
    name: string;
    address: string;
    phone: string;
    foodTypes: [string]
}