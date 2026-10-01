# Mi Ganado: cómo publicarla, instalarla y actualizarla

## Qué trae esta carpeta
- `index.html`: la app completa.
- `sw.js`: permite abrirla sin señal y avisar de actualizaciones.
- `manifest.webmanifest` y los tres `icon-*.png`: hacen que se pueda instalar como una app.

Sube estos 6 archivos tal cual, todos juntos y en la misma carpeta.

## 1. Publicarla en GitHub Pages (gratis)
1. Crea una cuenta en github.com.
2. Arriba a la derecha toca "+" y "New repository".
3. Nómbralo `mi-ganado`, déjalo en "Public" y toca "Create repository".
4. Toca "uploading an existing file", arrastra los 6 archivos y toca "Commit changes".
5. Ve a "Settings", luego "Pages". En "Source" elige "Deploy from a branch", rama `main`, carpeta `/ (root)` y toca "Save".
6. Espera uno o dos minutos y recarga esa página. Aparecerá el enlace:
   `https://TU-USUARIO.github.io/mi-ganado/`

Ese enlace es el que le mandas a tu papá y a tu tío por WhatsApp.
Nota: en una cuenta gratis el repositorio es público, así que cualquiera puede ver el código. La app no tiene claves ni datos tuyos adentro.

Alternativa: Netlify Drop (app.netlify.com/drop). Arrastras la carpeta y te da un enlace.

## 2. Instalarla en el celular
- Android (Chrome): menú de los tres puntos y "Instalar app" o "Agregar a pantalla de inicio".
- iPhone: tiene que ser desde Safari. Botón Compartir y "Agregar a inicio".

Pídeles que la instalen así y que la abran desde ese ícono. Es importante en iPhone: Safari puede borrar los datos de una página que no se usa en varias semanas, pero una app instalada en la pantalla de inicio está más protegida.

## 3. Publicar una actualización
1. Haz los cambios en `index.html`.
2. Sube el número de versión en DOS lugares:
   - en `index.html`: busca `APP_VERSION='1.0.0'`
   - en `sw.js`: busca `VER = '1.0.0'`
   Los dos deben tener el mismo número nuevo (por ejemplo 1.0.1).
3. En tu repositorio de GitHub: "Add file", "Upload files", arrastra los archivos con el mismo nombre y "Commit changes".
4. Espera uno o dos minutos.

Cuando tu papá o tu tío abran la app con señal, les aparece arriba "Hay una versión nueva" con un botón "Actualizar". También pueden ir a Más y tocar "Buscar actualización". Sus datos no se tocan.

Si no cambias el número en `sw.js`, la actualización no les llega.

## 4. Cuidar los datos de las pruebas
- Los datos viven en el celular de cada persona y dependen de la dirección del enlace. Si cambias la dirección (por ejemplo, cambias el nombre del repositorio), empiezan vacíos.
- Antes de cada actualización grande, pídeles un respaldo (Más, Respaldo y copia).
- Si algún día cambia la forma de guardar los datos, hay un lugar marcado dentro de la función `migrate` en `index.html` para agregar la conversión y que los datos viejos sigan funcionando.

## 5. Reportar problemas
Pídeles una captura de pantalla y el número de versión (está en Más, abajo).
