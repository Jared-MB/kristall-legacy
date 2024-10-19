"use client"
import { Button } from '@nextui-org/button'
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown"
import { Input } from "@nextui-org/input"

import { BsPrinter, BsSearch } from "react-icons/bs"
import { HiOutlineMenuAlt2 } from "react-icons/hi"
import { MdPostAdd } from "react-icons/md"

export default function OrderFragment() {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Dropdown
                        aria-label='Opciones de ordenes'
                        className='dark text-zinc-300 print:hidden'
                        classNames={{
                            base: 'border border-zinc-800',
                        }}>
                        <DropdownTrigger>
                            <Button isIconOnly variant='ghost'>
                                <HiOutlineMenuAlt2 className="w-6 h-6" />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label='Opciones'>
                            <DropdownItem key='create' startContent={<MdPostAdd className='w-6 h-6' />}>
                                Crear pedido
                            </DropdownItem>
                            <DropdownItem key='print' startContent={<BsPrinter className="w-6 h-6" />} description='Imprimir las notas mostradas'>
                                Imprimir
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <h3>Pedidos</h3>
                </div>
                <div className="flex items-center gap-4">
                    <Input
                        labelPlacement="outside"
                        isClearable
                        //value={code}
                        // onValueChange={setCode}
                        variant="bordered"
                        startContent={<BsSearch className="w-4 h-4" />}
                        placeholder="Código"
                    />
                    {/*<OrdersFilter /> */}
                </div>
            </CardHeader>
            <CardBody>

            </CardBody>
        </Card>
    )
}
