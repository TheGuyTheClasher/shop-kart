import { useParams } from 'react-router-dom'

function ProductScreen() {
    const { slug } = useParams()
    return (
        <p>{slug}</p>
    )
}

export default ProductScreen