"use client";

import type { PrivateCategory } from "@kristall/shared/domains/product-catalog/types/category.private";

import { Edit3, ExternalLink, Package } from "lucide-react";
import Link from "next/link";

import { Badge } from "@kristall/ui/badge";
import { Button } from "@kristall/ui/button";
import * as Card from "@kristall/ui/card";
import { Skeleton } from "@kristall/ui/skeleton";

import { cn } from "@kristall/ui/utils/cn";
import { useCategoriesDisplay } from "./categories-display";
import { CategoryMenu } from "./category-menu";
import { EditCategoryButton } from "./edit-category";

export function Category({ category }: { category: PrivateCategory }) {
  const displayMode = useCategoriesDisplay((state) => state.displayMode);

  if (displayMode === "grid") {
    return <CategoryGridItem category={category} />;
  }

  return <CategoryListItem category={category} />;
}

export function CategorySkeleton() {
  const displayMode = useCategoriesDisplay((state) => state.displayMode);

  if (displayMode === "grid") {
    return <CategoryGridSkeleton />;
  }

  return <CategoryListSkeleton />;
}

function CategoryGridItem({ category }: { category: PrivateCategory }) {
  return (
    <Card.Root
      className={cn(
        "transition-all duration-200 hover:shadow-xs",
        !category.isActive && "opacity-50"
      )}
    >
      <Card.Header className="pb-4 flex-row items-center justify-between">
        <h3 className="text-lg font-medium">{category.name}</h3>
        <CategoryMenu category={category} />
      </Card.Header>
      <Card.Body className="py-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center text-sm text-gray-400">
            <Package className="w-4 h-4 mr-2" />
            <span>{category.count} productos</span>
          </div>
          <Badge
            variant={
              category.isActive
                ? category.count > 0
                  ? "default"
                  : "secondary"
                : "outline"
            }
          >
            {category.isActive
              ? category.count > 0
                ? "Activa"
                : "Vacía"
              : "Inactiva"}
          </Badge>
        </div>
      </Card.Body>
      <Card.Footer className="flex gap-4">
        <EditCategoryButton category={category} />
        <Button
          variant="link"
          size="sm"
          asChild
          className="text-purple-500 hover:text-purple-600"
        >
          <Link href={`/dashboard/inventory?page=1&category=${category._id}`}>
            Ver inventario
            <ExternalLink className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}

function CategoryGridSkeleton() {
  return (
    <Card.Root className="transition-all duration-200 hover:shadow-xs">
      <Card.Header className="pb-4">
        <h3 className="text-lg font-medium">
          <Skeleton className="w-48 h-6" />
        </h3>
      </Card.Header>
      <Card.Body className="py-0">
        <div className="flex items-center justify-between mb-6 mt-1">
          <div className="flex items-center text-sm text-gray-400">
            <Skeleton className="w-32 h-4" />
          </div>
          <Skeleton className="w-16 h-4" />
        </div>
      </Card.Body>
      <Card.Footer className="flex gap-2">
        <Button variant="outline" size="sm" disabled className="flex-1">
          <Edit3 className="w-4 h-4 mr-2" />
          Editar
        </Button>
        <Button
          disabled
          variant="link"
          size="sm"
          className="text-purple-500 hover:text-purple-600"
        >
          Ver inventario
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </Card.Footer>
    </Card.Root>
  );
}

function CategoryListItem({ category }: { category: PrivateCategory }) {
  return (
    <div
      className={cn(
        "grid grid-cols-12 gap-4 px-4 py-4 last:border-b-0 hover:bg-zinc-800 transition-colors",
        !category.isActive && "opacity-50"
      )}
    >
      <div className="col-span-4 flex items-center">
        <div className="flex items-center">
          <div className="w-8 h-8  rounded-lg flex items-center justify-center mr-3">
            <Package className="w-4 h-4 text-zinc-400" />
          </div>
          <div>
            <div className="font-medium ">{category.name}</div>
            <div className="text-sm text-zinc-400">Categoría de productos</div>
          </div>
        </div>
      </div>
      <div className="col-span-2 flex items-center">
        <span className="text-sm">{category.count}</span>
      </div>
      <div className="col-span-2 flex items-center">
        <Badge
          variant={
            category.isActive
              ? category.count > 0
                ? "default"
                : "secondary"
              : "outline"
          }
        >
          {category.isActive
            ? category.count > 0
              ? "Activa"
              : "Vacía"
            : "Inactiva"}
        </Badge>
      </div>
      <div className="col-span-4 flex items-center justify-center gap-2">
        <EditCategoryButton category={category} />
        <Button variant="link" size="sm" asChild>
          <Link href={`/dashboard/inventory?page=1&category=${category._id}`}>
            Ver inventario
            <ExternalLink className="w-4 h-4 ml-2" />
          </Link>
        </Button>
        <CategoryMenu category={category} />
      </div>
    </div>
  );
}

function CategoryListSkeleton() {
  return (
    <div className="grid grid-cols-12 gap-4 px-4 py-4 last:border-b-0 hover:bg-zinc-800 transition-colors">
      <div className="col-span-4 flex items-center">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3">
            <Package className="w-4 h-4 text-zinc-400" />
          </div>
          <div>
            <Skeleton className="w-48 h-5 mb-1" />
            <div className="text-sm text-zinc-400">Categoría de productos</div>
          </div>
        </div>
      </div>
      <div className="col-span-2 flex items-center">
        <Skeleton className="w-16 h-4" />
      </div>
      <div className="col-span-2 flex items-center">
        <Skeleton className="w-32 h-4" />
      </div>
      <div className="col-span-4 flex items-center justify-center gap-2">
        <Button variant="outline" size="sm" disabled>
          <Edit3 className="w-4 h-4 mr-2" />
          Editar
        </Button>
        <Button variant="link" size="sm" disabled>
          Ver inventario
          <ExternalLink className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
