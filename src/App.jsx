import { useState } from "react"
import { Checkbox } from "./components/forms/checkbox"
import { InputRange, InputText } from "./components/forms/input"
import { ProductCategoryRow } from "./components/products/ProductCategoryRow"
import { ProductRow } from "./components/products/ProductRow"

const PRODUCTS = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
]

function App() {

    const [showStockOnly, setShowStockOnly] = useState(false);
    const [search, setSearch] = useState("");
    const [price, setPrice] = useState("");

    const visibleProducts = PRODUCTS.filter(product => {
        if (showStockOnly && !product.stocked) return false;


        if (search && !product.name.toLowerCase().includes(search.toLowerCase())) return false;


        if (price && !product.price.includes(price)) return false;


        return true;
    })

    return <div className="container">
        <SearchBar
            search={search}
            onSearchChanged={setSearch}
            price={price}
            onPriceChanged={setPrice}
            showStockOnly={showStockOnly}
            onStockOnlyChanged={setShowStockOnly}
        />
        <ProductTable products={visibleProducts} />
    </div>
};

function SearchBar({ showStockOnly, onStockOnlyChanged, search, onSearchChanged, price, onPriceChanged }) {
    return <div>
        <div className="mb-3">
            <InputText value={search} onChange={onSearchChanged} placeholder="Rechecher" />
            <InputRange
                value={price}
                onChange={onPriceChanged}
                placeholder="Prix"
                type="range"
                className="form-range"
                min={0}
                max={10} />
            <Checkbox
                id="stocked"
                checked={showStockOnly}
                onChange={onStockOnlyChanged}
                label="N'afficher que les produits en stock"
            />
        </div>
    </div>
}

function ProductTable({ products }) {
    const rows = [];
    let lastCategory = null;

    for (let product of products) {

        if (product.category !== lastCategory) {
            rows.push(<ProductCategoryRow key={product.category} name={product.category} />)
        }
        lastCategory = product.category;
        rows.push(<ProductRow product={product} key={product.name} />)

    }
    return <table className="table">
        <thead>
            <tr>
                <th>Nom</th>
                <th>Prix</th>
            </tr>
        </thead>
        <tbody>
            {rows}
        </tbody>
    </table>
}


export default App
