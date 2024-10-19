import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import Image from "next/image";
import Link from "next/link";


export default function UsersPage() {
  return (
    <section className='flex flex-col gap-10'>
      <article className='relative pt-8 pb-12 z-10'>
        <div className=' flex md:grid lg:grid xl:grid grid-cols-[1fr_55%] gap-20 place-items-center pt-4 md:pt-12 lg:pt-12 mx-8 md:mx-20 lg:mx-20'>
          <Image
            src='/svg/users_team.svg'
            alt='Users'
            width={360}
            height={360}
            className='hidden lg:block md:block xl:block'
          />
          <div className='flex items-center flex-col gap-6'>
            <h2 className="text-4xl md:text-5xl lg:text-5xl font-medium text-center pt-4 max-w-3xl text-purple-500">
              Gestión de Usuarios Simplificada
            </h2>
            <p className='text-center max-w-xl'>
              Asigne roles y permisos a sus empleados para que puedan acceder a las funciones que necesitan de manera rápida y sencilla.
            </p>
            <Button as={Link} href='/pricing' color='primary' className='mt-8 mx-auto relative'>
              Comenzar
            </Button>
          </div>
        </div>
      </article>
      <div className='relative px-16 pt-8 pb-12'>
        <article className='grid grid-cols-3 gap-4 relative z-10 place-items-center'>
          <div className='flex flex-row gap-8 items-center justify-center'>
            <span className='text-7xl font-light text-purple-500'>
              1
            </span>
            <h3 className='text-2xl'>
              Agrega <br /> usuarios
            </h3>
          </div>

          <div className='flex flex-row gap-4 items-center justify-center'>
            <span className='text-7xl font-light text-purple-500'>
              2
            </span>
            <h3 className='text-2xl'>
              Asigna <br /> permisos
            </h3>
          </div>
          <picture>
            <Image
              src='/svg/users.svg'
              alt='People'
              width={200}
              height={200}
            />
          </picture>
        </article>
        <article className='flex md:grid grid-cols-[45dvw_1fr] relative z-10 mt-28 gap-16'>
          <Card className='relative w-full h-fit p-4 hidden md:flex'>

            {/* <Image
              quality={100}
              width={540}
              height={360}
              alt='Inventory'
              src='/landing_page/users.png'
            /> */}
          </Card>
          <div className='flex flex-col justify-center gap-8'>
            {/* Titulo */}
            <h3 className='text-4xl font-medium text-purple-500'>
              ¡Tú tienes el control!
            </h3>
            {/* Descripcion */}
            <p className='max-w-xl mx-auto text-lg'>
              Con el sistema de gestión de usuarios, puedes asignar permisos a tus empleados para que puedan acceder solamente a las funciones que tu decidas.
            </p>
            {/* Boton */}
            <div>
              <Button as={Link} href='/pricing' color='primary' >
                Comenzar
              </Button>
            </div>
          </div>
        </article>
        {/*<div className='absolute inset-0 bg-gradient-to-t from-zinc-800/90 to-zinc-900 w-[calc(100dvw-8px)] left-0 z-0' />*/}
      </div>
    </section>
  )
}
