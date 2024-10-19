"use client"

import { Select, SelectItem, SelectSection } from "@nextui-org/react";
import { ArrowDown01, ArrowDownAZ, ArrowDownZA, ArrowUp01, DollarSign, ListFilter } from 'lucide-react';

export default function SortProducts() {
    return (
        <Select
            variant="bordered"
            classNames={{
                listboxWrapper: "dark",
                listbox: "dark dark:text-zinc-300",
            }}
            popoverProps={{
                classNames: {
                    base: "dark",
                },
            }}
            className="max-w-xs dark:text-zinc-300"
            aria-label="Ordenar"
            label="Ordenar"
            labelPlacement="outside"
            defaultSelectedKeys={["a-z"]}
            // onSelectionChange={(e) => onChange(Object.values(e)[0])}
            startContent={<ListFilter />}
        >
            <SelectSection title="Nombre" showDivider>
                <SelectItem
                    key="a-z"
                    startContent={<ArrowDownAZ className="w-4 h-4 dark:text-zinc-300" />}
                >
                    A - Z
                </SelectItem>
                <SelectItem
                    key="z-a"
                    startContent={<ArrowDownZA className="w-4 h-4 dark:text-zinc-300" />}
                >
                    Z - A
                </SelectItem>
            </SelectSection>
            <SelectSection title="Precio" showDivider>
                <SelectItem
                    key="price-asc"
                    startContent={<DollarSign className="w-4 h-4 dark:text-zinc-300" />}
                >
                    Menor a mayor
                </SelectItem>
                <SelectItem
                    key="price-desc"
                    startContent={<DollarSign className="w-4 h-4 dark:text-zinc-300" />}
                >
                    Mayor a menor
                </SelectItem>
            </SelectSection>
            <SelectSection title="Stock">
                <SelectItem
                    key="stock-asc"
                    startContent={<ArrowDown01 className="w-4 h-4 dark:text-zinc-300" />}
                >
                    Menor a mayor
                </SelectItem>
                <SelectItem
                    key="stock-desc"
                    startContent={<ArrowUp01 className="w-4 h-4 dark:text-zinc-300" />}
                >
                    Mayor a menor
                </SelectItem>
            </SelectSection>
        </Select>
    )
}
