/**
 * @param {string} placeholder
 * @param {string} value
 * @param {(s: string) => void} onChange
 */

export function InputText({ placeholder, value, onChange }) {
    return <div>
        <input
            type="text"
            className="form-control"
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
}

export function InputRange({ placeholder, value, onChange }) {
    return <div>
        <input
            type="range"
            className="form-range"
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
}
