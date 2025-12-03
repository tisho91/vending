export const fetchProducts = async () =>{
    try {
        const res = await fetch("http://localhost:3000/products")
        return await res.json()
    } catch (error) {
        console.log(error)
    }

}