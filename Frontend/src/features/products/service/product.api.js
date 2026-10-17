import axios from "axios";

const productApiInstance = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

export async function createProduct(formData) {
    const response = await productApiInstance.post("/products", formData)

    return response.data
}

export async function getSellerProduct() {
    const response = await productApiInstance.get("/products/seller")
    return response.data
}

export async function getAllProducts() {
    const response = await productApiInstance.get("/products")
    return response.data
}

export async function getProductById(productId) {
    const response = await productApiInstance.get(`/products/detail/${productId}`)
    return response.data
}