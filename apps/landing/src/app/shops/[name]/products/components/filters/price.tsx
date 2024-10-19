import { Slider } from '@nextui-org/react'

export default function PriceFilter() {
    return (
        <Slider
            label="Precio"
            step={10}
            minValue={0}
            maxValue={2000}
            defaultValue={[100, 500]}
            formatOptions={{ style: "currency", currency: "USD" }}
            className="max-w-md"
        />
    )
}
