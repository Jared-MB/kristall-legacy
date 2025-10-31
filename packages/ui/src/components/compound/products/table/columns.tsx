"use client";

import type { PrivateProduct } from "@kristall/shared/domains/product-catalog/types/product.private";
import type { ColumnDef } from "@tanstack/react-table";

import Link from "next/link";

import { Skeleton } from "@/components/ui/skeleton";
import { useQueryParams } from "@kristall/core/hooks/use-query-params";
import { ArrowUpDown, MoreVertical } from "lucide-react";
import { NoImage } from "../../../svg/no-image";
import { Button } from "../../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";

type QueryKeys = "sortBy" | "orderBy";
type QueryValues = "price" | "DESC" | "ASC" | "stock";

export const columns: ColumnDef<PrivateProduct>[] = [
  {
    id: "image",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="grid place-content-center">
          {product.image?.url ? (
            <img
              loading="lazy"
              src={product.image?.url}
              alt={`Imagen del producto ${product.name}`}
              className="w-10 h-10 rounded object-cover aspect-square object-center"
            />
          ) : (
            <div className="w-10 h-10 flex items-center justify-center overflow-hidden rounded">
              <NoImage className="w-full h-full object-contain" />
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => {
      const product = row.original;

      return product.name;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      const { setQueryParams, queryParams, removeQueryParams } = useQueryParams<
        QueryKeys,
        QueryValues
      >();

      const handleSort = () => {
        const hasQuery = queryParams.get("sortBy") === "price";

        if (!hasQuery) {
          setQueryParams([
            {
              key: "sortBy",
              value: "price",
            },
            {
              key: "orderBy",
              value: "DESC",
            },
          ]);
          return;
        }
        if (hasQuery && queryParams.get("orderBy") === "DESC") {
          setQueryParams("orderBy", "ASC");
          return;
        }
        removeQueryParams(["orderBy", "sortBy"]);
      };

      return (
        <div className="flex w-full items-center justify-end">
          <Button variant="ghost" onClick={handleSort}>
            Precio
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(amount);

      return <div className="text-end font-medium pr-4">{formatted}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => {
      const { setQueryParams, queryParams, removeQueryParams } = useQueryParams<
        QueryKeys,
        QueryValues
      >();

      const handleSort = () => {
        const hasQuery = queryParams.get("sortBy") === "stock";

        if (!hasQuery) {
          setQueryParams([
            {
              key: "sortBy",
              value: "stock",
            },
            {
              key: "orderBy",
              value: "DESC",
            },
          ]);
          return;
        }
        if (hasQuery && queryParams.get("orderBy") === "DESC") {
          setQueryParams("orderBy", "ASC");
          return;
        }
        removeQueryParams(["orderBy", "sortBy"]);
      };

      return (
        <div className="flex w-full items-center justify-end">
          <Button variant="ghost" onClick={handleSort}>
            Stock
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue<number>("stock");

      return <div className="text-end font-medium pr-4">{value}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="grid place-content-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Opciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link prefetch href={`/dashboard/inventory/${product._id}`}>
                  Ver más
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export const skeletonColumns: ColumnDef<PrivateProduct>[] = [
  {
    id: "image",
    cell: ({ row }) => {
      return (
        <div className="grid place-content-center">
          <div className="w-10 h-10 flex items-center justify-center overflow-hidden rounded">
            <NoImage className="w-full h-full object-contain" />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => {
      return <Skeleton className="w-56 h-6" />;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <div className="flex w-full items-center justify-end">
          <Button variant="ghost">
            Precio
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="font-medium pr-4 flex justify-end items-center">
          <Skeleton className="w-12 h-6" />
        </div>
      );
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => {
      return (
        <div className="flex w-full items-center justify-end">
          <Button variant="ghost">
            Stock
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="font-medium pr-4 flex justify-end items-center">
          <Skeleton className="w-12 h-6" />
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="grid place-content-center">
          <Button disabled variant="ghost" size="icon">
            <MoreVertical />
          </Button>
        </div>
      );
    },
  },
];
