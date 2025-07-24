export interface Version {
	_id:
		| `v${number}.${number}.${number}`
		| `v${number}.${number}.${number}-RC-${number}`;
	title?: string;
	description?: string;
	features?: string[];
	fixes?: string[];
	date: string;
}

export const VERSIONS: Version[] = [
	{
		_id: "v0.12.0-RC-1",
		date: "2025-07-16",
		title: "Virtual Showroom Custom Colors",
		description: `
			Estamos emocionados de anunciar que tu Virtual Showroom ahora tiene la posibilidad de personalizar el color de la página.
			Lo que te permite darle un toque personal a tu tienda.
		`,
		features: ["Virtual Showroom Custom Colors"],
	},
	{
		_id: "v0.11.1",
		date: "2025-07-24",
		title: "Categories Refactor",
		description:
			"Hemos rediseñado la página de categorías para ofrecer una experiencia más agradable y fluida.",
		fixes: ["Mejoras en la página de categorías"],
	},
	{
		_id: "v0.11.0",
		date: "2025-07-16",
		title: "Performance improvements",
		description: `
			Se han realizado mejoras en la velocidad de carga de la aplicación. 
			Esto se debe a la optimización de la carga de los componentes y la reducción de la carga de datos innecesarios y la implementación
			de un mejor sistema de cache y renderizado de nuestras páginas.
		`,
		features: ["Performance improvements"],
	},
	{
		_id: "v0.11.0-RC-1",
		date: "2025-02-21",
		title: "Virtual Showroom",
		description: `
			Estamos más cerca de que el Virtual Showroom sea lo más completo y estable posible.
			Trabajamos en la mejora de la experiencia de usuario, así como en la optimización de la carga de la página.
		`,
	},
	{
		_id: "v0.10.0",
		date: "2025-02-21",
		title: "Better settings",
		description: `
			Se ha mejorado la interfaz de configuración de la aplicación. Creemos que hemos logrado agrupar las opciones de configuración en categorías más claras, organizadas y agradables.
			`,
		features: [
			"Rediseño de la configuración",
			"Se han movido algunas configuraciones para mantener la organización",
		],
	},
	{
		_id: "v0.10.0-RC-2",
		date: "2025-01-15",
		title: "Virtual Showroom",
		description: `
			Se arreglo el bug que impedía acceder a la configuración de tu Virtual Showroom.
			`,
		fixes: [
			"Acceso a la configuración de tu Virtual Showroom",
			"Diseño roto de la página de inicio al presentar una nueva versión",
		],
	},
	{
		_id: "v0.10.0-RC-1",
		date: "2025-01-15",
		title: "Virtual Showroom",
		description: `
			Ahora puedes crear un virtual showroom para tus productos. 
			Esto te permite mostrar tus productos en una página web, 
			y hacer que tus clientes puedan verlos en un lugar fácil de encontrar.
			`,
		features: ["Virtual Showroom"],
	},
	{
		_id: "v0.9.4",
		date: "2025-01-04",
		title: "Sidebar",
		description: `
			Hemos cambiado ligeramente el diseño de la navegación lateral. Pudiendo ahora ocultar el sidebar con un solo click. Y dando paso a 
			un estilo donde se puedan agregar más características futuras.
		`,
		features: ["Mejor diseño de la navegación lateral"],
	},
	{
		_id: "v0.9.3",
		date: "2024-12-20",
		title: "Speed Improvements",
		description: `
			En Kristall siempre estamos buscando mejorar, por eso hemos aumentado la velocidad de carga de la aplicación.
			Ahora, al navegar entre tu inventario de productos, la velocidad de carga es mucho más rápida.
		`,
		features: ["Mejoras en la carga de la aplicación."],
	},
	{
		_id: "v0.9.2",
		date: "2024-12-20",
		title: "Bugs Fixing",
		description: `
			Mejoramos varios errores internos que impedían la funcionalidad correcta y fluida de la aplicación al editar un producto, 
			así como mejoras en la interfaz de usuario.
		`,
		fixes: [
			"Mejor consistencia de la interfaz de usuario en la edición de productos.",
			"Eliminado el bug que mostraba información desactualizada en la edición de productos al guardar los cambios.",
		],
		features: [
			"Actualización de la interfaz en tabla de productos en la página de inventario, se añadieron nuevos botones para ordenar por stock y precio.",
		],
	},
	{
		_id: "v0.9.1",
		date: "2024-12-13",
		title: "Impresión de inventarios",
		description: `
			La impresión de inventarios por ubicación se encuentra funcionando nuevamente.
		`,
		fixes: [
			"Se arreglaron errores internos que impedían la impresión de inventarios",
		],
	},
	{
		_id: "v0.9.0",
		date: "2024-12-11",
		title: "Inventarios",
		description: `
			Ahora puedes incrementar el stock de tus productos en el almacén de una manera más sencilla si te ha llegado un nuevo inventario.
			Lo encuentras en la pestaña "Inventario" en el dashboard, al abrir el menú desplegable encontrarás la opción "Agregar inventario".
		`,
		features: ["Agregar inventario"],
		fixes: ["Se han arreglado algunos errores internos"],
	},
	{
		_id: "v0.8.1",
		date: "2024-10-17",
		title: "Increase max name length to 50",
		description: `
			Se ha incrementado el máximo de caracteres permitidos para el nombre de un usuario.
			Ahora puedes tener un nombre de hasta 50 caracteres.
		`,
		fixes: [
			"Incremento en el máximo de caracteres permitidos para el nombre de un usuario",
		],
	},
	{
		_id: "v0.8.0",
		date: "2024-10-17",
		title: "Orders Update",
		description: `
			Se ha añadido la posibilidad de marcar como "Entregado" un pedido desde el Punto de Ventas. 
			Esto lo encontrarás en la sección de "Ventas" en el dashboard que te redirigirá a la página del Punto de Ventas, 
			donde podrás ver todos los pedidos de la ubicación seleccionada dando click en el botón "Pedidos" ubicado en el header y marcarlos como entregados solo si el pedido está listo para recibir.
		`,
		features: ["Actualizar estatus de pedidos desde el POS"],
	},
	{
		_id: "v0.7.0",
		date: "2024-10-15",
		title: "Bank Accounts",
		description: `
			Se ha añadido la posibilidad de añadir cuentas bancarias a la aplicación.
			Puedes activarlas ahora en la pestaña "Cuentas bancarias" en la configuración.
			Esto te permite agregar tu cuenta bancaria a las notas enviadas a tus clientes en caso de que el pago sea por transferencia bancaria.
			`,
		features: ["Cuentas bancarias"],
	},
	{
		_id: "v0.6.0",
		date: "2024-10-05",
		title: "Users Access",
		description: `
			La mayorías de las secciones del dashboard ahora tienen acceso restringido a usuarios con permisos específicos.
			Tanto para acceder, crear, editar o borrar datos.
			Puedes verlo ahora en la pestaña "Usuarios" en el dashboard.
			`,
		features: ["Permisos de usuario granulares"],
		fixes: [
			"Mejor pantalla de Not Found (404) cuando no existe una página en el dashboard",
		],
	},
	{
		_id: "v0.6.0-RC-1",
		date: "2024-10-04",
		title: "Users Access (Release Candidate)",
		description: `Se ha añadido a los administradores la posibilidad de dar permisos a usuarios de manera más granular. 
			Esto permite a los usuarios tener acceso a secciones específicas que elijan. 
			Puedes verlo ahora en la pestaña "Usuarios" en el dashboard.
			`,
		features: ["Permisos de usuario"],
	},
	{
		_id: "v0.5.1",
		date: "2024-09-19",
		title: "Mejoras en la UX",
		description:
			"Se implementaron técnicas para mejorar la experiencia del usuario en algunas vistas haciéndolas más fluidas.",
		fixes: [
			"Mejoras en la carga del dashboard inicial",
			"Mejoras en la carga del inventario",
		],
	},
	{
		_id: "v0.5.0",
		date: "2024-09-05",
		title: "Documentación",
		description: "Se ha añadido documentación a partir de la versión 0.5.0.",
		features: ["Documentación"],
	},
];
