import mongoose, { Schema } from "mongoose"

interface VendorDoc extends Document {
    name: string; 
    address: string; 
    pinCode: string; 
    foodType: [string]; 
    email: string; 
    password: string; 
    ownerName: string; 
    phone: string;
    salt: string;
    serviceAvailable: boolean;
    coverImages: [string];
    rating: number;
    // foods: any
}

const vendorSchema : Schema<VendorDoc> = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
    }, 
    pinCode: {
        type: String,
        required: true
    }, 
    foodType: {
        type: [String],
    }, 
    email: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    }, 
    ownerName: {
        type: String,
        required: true
    }, 
    phone: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    serviceAvailable: {
        type: Boolean,
    },
    coverImages: {
        type: [String],
    },
    rating: {
        type: Number,
    },
    // foods: [{
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: "food"
    // }]
}, { 
    toJSON: {
    transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;

    }
},
    timestamps: true
})


export const Vendor = mongoose.model<VendorDoc>("vendor", vendorSchema)