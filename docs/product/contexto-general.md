# Contexto general del proyecto

Plataforma para la gestión de convenios, beneficios, aliados, asociados, bonos y módulos administrativos relacionados.

La plataforma incluye:

- **Portal público** — asociados consultan beneficios, generan bonos, califican convenios y reportan casos.
- **Panel administrativo** — usuarios internos gestionan información, permisos, reportes y módulos operativos.

El desarrollo debe ser organizado, mantenible, seguro y escalable, separando claramente portal público, panel administrativo, lógica de negocio, integraciones y persistencia de datos.

## Objetivo del sistema

Administrar convenios ofrecidos por aliados y facilitar que los asociados consulten, usen y validen beneficios.

Permitir al equipo administrativo gestionar la información, controlar usuarios y permisos, revisar estadísticas, generar reportes y mantener contenidos y datos operativos.

## Áreas principales

### Portal público

- Página de inicio con convenios destacados o superdestacados.
- Navegación por categoría, subcategoría y aliado.
- Detalle de beneficio con descripción, condiciones, imágenes y contenido adicional.
- Búsqueda de beneficios por texto.
- Compartir beneficios en redes sociales.
- Autenticación de asociados para acciones protegidas.
- Calificación de convenios.
- Reporte de casos de incumplimiento.
- Generación y descarga de bonos.

### Bonos de convenio

Generar bonos asociados a un convenio y a un asociado, validando:

- El convenio relacionado.
- El asociado que lo genera.
- La vigencia del bono.
- El estado del asociado.
- Las reglas de negocio para permitir o rechazar la generación.

Los bonos deben poder descargarse en PDF, enviarse por correo y, en una fase posterior, asociarse a códigos QR.

### Servicio para aliados

Funcionalidades de punto de atención:

- Consultar si un asociado está habilitado.
- Validar identificación del asociado.
- Registrar la toma o uso de un beneficio.
- Consultar reportes de uso por aliado.
- Exportar información operativa.

### Panel administrativo

Módulos previstos (no todos desde el inicio):

- Convenios, aliados, categorías, subcategorías.
- Asociados, bonos, votos, casos reportados, usos de convenios.
- Directorio de negocios, auxilios o alivios.
- Contenidos (artículos, proyectos, textos).
- Elecciones o códigos.
- Usuarios internos, roles, permisos.
- Configuración general del sistema.

## Seguridad y permisos

Autenticación separada para:

- Asociados (portal público).
- Usuarios internos (panel administrativo).

El panel administrativo usa control de acceso basado en roles y permisos. Acciones sensibles (crear, editar, eliminar, importar, exportar, reportes, configuración) deben estar protegidas.

Sesiones seguras y validación de permisos antes de ejecutar acciones protegidas.

## Entidades principales

Como mínimo:

- Convenios, aliados, categorías, subcategorías.
- Asociados, bonos, votos, casos de incumplimiento, usos de convenio.
- Códigos QR.
- Usuarios internos, roles, permisos, módulos, opciones y subopciones.

El modelo de datos debe contemplar consultas administrativas, reportes, auditoría y crecimiento futuro.

## Integraciones

Preparado para integrarse con servicios externos o módulos internos para:

- Validación o consulta de asociados.
- Generación de PDF.
- Envío de correos electrónicos.
- Exportación de reportes en Excel.
- Almacenamiento de imágenes, archivos y códigos QR.

Las integraciones deben ser desacopladas: la lógica de negocio no debe depender directamente de un proveedor específico.

## Priorización del desarrollo

### Fase 1 — MVP

- Autenticación de asociados y usuarios administradores.
- Gestión de sesiones.
- Portal público básico: home, navegación por categorías/subcategorías/aliados, detalle de beneficio, búsqueda.
- CRUD administrativo de convenios, aliados, categorías y subcategorías.
- Generación de bonos, validación de vigencia, descarga en PDF.
- Roles y permisos mínimos para el panel administrativo.
- Migración o carga inicial de datos críticos.

### Fase 2

- Calificación de convenios y reporte de casos de incumplimiento.
- Consulta de habilidad del asociado y registro de uso de convenio.
- Reportes de uso, bonos, votos y casos; exportación.
- Importaciones masivas y gestión de contenidos.
- Generación y almacenamiento de códigos QR para bonos.

### Fase 3

- Refuerzo de seguridad, rate limits, auditoría avanzada.
- Logs estructurados, métricas y alertas.
- Optimización de almacenamiento de imágenes, CDN, thumbnails.
- Automatización de CI/CD, backups y recuperación.
- Optimización de módulos administrativos avanzados.

## Criterios técnicos

Arquitectura modular y mantenible. Cada módulo con responsabilidades claras. La lógica de negocio no debe mezclarse con componentes visuales, controladores o infraestructura.

Antes de implementar una funcionalidad, identificar:

- Qué problema de negocio resuelve.
- Qué entidades participan.
- Qué reglas de negocio aplican.
- Qué permisos requiere.
- Qué datos deben validarse.
- Qué efectos secundarios genera.
- Qué integraciones necesita.
- Qué debe registrarse para auditoría o trazabilidad.

Priorizar código claro, validaciones explícitas, separación de responsabilidades, manejo consistente de errores y pruebas automatizadas para lógica crítica.

## Resultado esperado

Plataforma funcional para administrar convenios y beneficios, con portal público para asociados, panel administrativo para usuarios internos y base técnica preparada para crecer por fases.

Construir primero el núcleo del sistema; luego agregar funcionalidades complementarias, mejoras de seguridad, reportes, automatización y optimización técnica.
