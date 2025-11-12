import type { Package } from "@/constants";

import { getStripePrices } from "@kristall/core/stripe/prices";

import Price from "./components/price";

const basicFeatures = [
  "Gestión de inventario",
  "Control de pedidos",
  "Gestión de clientes",
  "Reporte de ventas",
];
const standardFeatures = [
  ...basicFeatures,
  "Punto de ventas",
  "Manejo de ubicaciones",
];
const plusFeatures = [...standardFeatures];

export const dynamic = "force-dynamic";

export default async function Page() {
  const prices = await getStripePrices({ orderBy: "asc" });

  return (
    <div className="flex flex-col p-4 py-8 pt-16 gap-12">
      <div className="flex flex-col justify-center items-center lg:gap-4 gap-8">
        <h3 className="text-purple-500 text-4xl text-center md:text-start text-balance">
          ¿Listo para unirte a nuestro equipo?
        </h3>
        <p className="text-pretty w-[80dvw] text-center">
          Empieza ahora para acceder a nuestros servicios
        </p>
      </div>
      <div className="grid px-6 grid-cols-1 items-center lg:grid-cols-3 gap-12">
        {prices.length > 0 ? (
          <>
            <Price
              id={prices[0].id}
              nickname={prices[0].nickname?.toLowerCase() as Package}
              price={(prices[0].unit_amount ?? 0) / 100}
              features={basicFeatures}
            />
            <Price
              id={prices[1].id}
              recommended
              nickname={prices[1].nickname?.toLowerCase() as Package}
              price={(prices[1].unit_amount ?? 0) / 100}
              features={standardFeatures}
            />
            <Price
              id={prices[2].id}
              nickname={prices[2].nickname?.toLowerCase() as Package}
              price={(prices[2].unit_amount ?? 0) / 100}
              features={plusFeatures}
            />
          </>
        ) : (
          <p className="text-pretty w-[80dvw] text-center">
            No se encontraron precios disponibles
          </p>
        )}
      </div>
    </div>
  );
}
