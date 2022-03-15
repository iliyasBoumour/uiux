import {useEffect,useState} from 'react'
import axios from "axios"
import Product from "../../components/product"
const Index = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const getProducts=async()=>{
            const {data}=await axios.get("/api/products")
            setProducts(data)
        }
      getProducts()
    })
    
  return (
    <div style={{display:"flex" , flexWrap:"wrap", justifyContent:"center"}}>
        {products.map(p=><Product {...p} />)}
    </div>
  )
}

export default Index