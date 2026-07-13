# Descripción

Pruebas con OpenCode para codificar sin escribir una línea de código por una persona humana.

Puedes ver la app publicada: https://ia.vzenix.es/

# Contenido

Aplicación web con utilidades para generar y validar documentos de identificación:

- **DNI**: Validación y generación de DNIs españoles.
- **IBAN**: Validación y generación de IBANs (ISO 7064 MOD 97).
- **Perfiles**: Generación de perfiles aleatorios con nombre, DNI, IBAN y BIC.
- **Base64**: Codificación y decodificación de texto a base64.
- **Imagen 2 base64**: Codificación y decodificación de imágenes a base64.
- **UUID**: Generador y validador de UUIDs v4.
- **CSV**: Generador de CSVs con datos de ejemplo y tipos configurables.
- **JSON**: Prettifier de JSON con coloreado sintáctico.

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Los archivos de producción se generan en la carpeta `dist/`. Incluye un `.htaccess` para rutas amigables en Apache.
