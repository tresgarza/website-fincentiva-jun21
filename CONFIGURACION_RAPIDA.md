# 🚀 Configuración Rápida - Sistema de Blog Automático

## ✅ ¿Qué se ha creado?

El sistema de generación automática de blog ya está listo. Incluye:

- **✅ Scripts de generación** (`scripts/generate-blog.js`)
- **✅ Automatización GitHub Actions** (`.github/workflows/auto-blog.yml`)
- **✅ Sistema de actualización** (`scripts/update-news-page.js`)
- **✅ Dependencias instaladas** (Node.js packages)
- **✅ Pruebas exitosas** (todos los tests pasaron)

## 🔑 Configuración de API Keys

### Paso 1: Obtener API Key de OpenAI
1. Ve a [platform.openai.com](https://platform.openai.com)
2. Crea una cuenta o inicia sesión
3. Ve a **API Keys** y crea una nueva clave
4. Copia la clave (empieza con `sk-`)

### Paso 2: Obtener API Key de Unsplash (Opcional)
1. Ve a [unsplash.com/developers](https://unsplash.com/developers)
2. Crea una aplicación
3. Copia el **Access Key**

### Paso 3: Configurar GitHub Secrets
1. Ve a tu repositorio en GitHub
2. **Settings** → **Secrets and variables** → **Actions**
3. Agrega estos secrets:
   - `OPENAI_API_KEY`: Tu clave de OpenAI
   - `UNSPLASH_ACCESS_KEY`: Tu clave de Unsplash (opcional)

## 📅 ¿Cuándo se ejecuta?

El sistema está programado para generar artículos:
- **Lunes a las 9:00 AM** (hora de México)
- **Jueves a las 9:00 AM** (hora de México)

Esto resulta en **8-10 artículos por mes**.

## 🎯 Contenido que genera

### Temas automáticos:
- ✅ Mejora de historial crediticio
- ✅ Estrategias de ahorro para empleados
- ✅ Beneficios del crédito vía nómina
- ✅ Planificación de compra de auto
- ✅ Inversiones seguras para principiantes
- ✅ Presupuesto familiar efectivo
- ✅ Diferencias entre crédito tradicional y nómina
- ✅ Construcción de patrimonio personal
- ✅ Finanzas personales para millennials
- ✅ Importancia del fondo de emergencia
- ✅ Crédito responsable y sostenible
- ✅ Educación financiera básica

### Cada artículo incluye:
- 📝 800-1200 palabras de contenido profesional
- 🖼️ Imagen relevante de Unsplash
- 🔍 Meta tags para SEO
- 📱 Diseño responsive
- 🎯 Call-to-actions de Financiera Incentiva
- 📊 3 puntos clave como resumen

## 💰 Costos estimados

- **OpenAI GPT-4**: ~$0.24-0.48/mes (8 artículos)
- **Unsplash**: Gratis (50 descargas/hora)
- **GitHub Actions**: Gratis (suficientes minutos)

**Total: Menos de $1 USD por mes**

## 🧪 Probar el sistema

### Generar artículo manualmente:
```bash
npm run generate-blog
```

### Ejecutar pruebas:
```bash
npm run test-blog
```

### Actualizar página de noticias:
```bash
npm run update-news
```

## 📁 Archivos creados automáticamente

```
├── [titulo-del-articulo].html     # Artículo completo
├── assets/images/articles/        # Imágenes descargadas
├── articles/index.json           # Índice de artículos
└── noticias.html                 # Actualizada automáticamente
```

## ⚡ Activación manual

Si quieres generar un artículo ahora mismo:

1. Ve a **Actions** en tu repositorio de GitHub
2. Selecciona **"Automated Blog Generation"**
3. Click en **"Run workflow"**
4. Opcionalmente agrega un tema personalizado
5. Click **"Run workflow"**

## 📞 Soporte

Si algo no funciona:
1. Revisa que los secrets estén configurados
2. Ve a **Actions** en GitHub para ver logs de errores
3. Verifica que tengas créditos en OpenAI

---

🎉 **¡El sistema está listo para generar contenido automáticamente!** 