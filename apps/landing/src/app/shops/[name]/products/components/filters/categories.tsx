"use client"

import { Category } from "@/types/Category";
import { Select, SelectItem } from "@nextui-org/react";

export default function Categories({ categories }: { categories: Category[] }) {
    return (
        <Select
            items={categories ?? []}
            label="Categoría"
            labelPlacement="outside"
            placeholder="Selecciona una categoría"
            className="max-w-xs"
            variant="bordered"
        >
            {(category) => <SelectItem key={category._id}>{category.name}</SelectItem>}
        </Select>
    )
}
