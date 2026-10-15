import { createProduct, getSellerProduct, getAllProducts, getProductById } from "../service/product.api"
import { useDispatch } from "react-redux"
import { useCallback } from "react"
import { setSellerProducts, setProducts } from "../state/product.slice"



export const useProduct = () => {

    const dispatch = useDispatch()

    async function handleCreateProduct(formData) {
        const data = await createProduct(formData)
        return data.product
    }

    const handleGetSellerProduct = useCallback(async () => {
        const data = await getSellerProduct()
        dispatch(setSellerProducts(data.products))
        return data.products
    }, [dispatch])

    async function handleGetAllProducts() {

        const data = await getAllProducts()
        dispatch(setProducts(data.products))
    }

    async function handleGetProductById(productId) {
        const data = await getProductById(productId)
        return data.product
    }

    return { handleCreateProduct, handleGetSellerProduct, handleGetAllProducts, handleGetProductById }

}