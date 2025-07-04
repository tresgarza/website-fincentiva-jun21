# 🤖 Sistema de Generación Automática de Blog

## Descripción General

Este sistema genera automáticamente artículos de educación financiera para Financiera Incentiva usando:
- **OpenAI GPT-4** para generar contenido profesional
- **Unsplash API** para descargar imágenes relevantes
- **GitHub Actions** para automatización programada
- **Node.js** para la lógica de generación

## 🚀 Configuración Inicial

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Configurar Variables de Entorno

Copia `env.example` a `.env` y configura:

```env
# OpenAI API (Requerido)
OPENAI_API_KEY=sk-your-openai-api-key-here

# Unsplash API (Opcional - usa placeholder si no está configurado)
UNSPLASH_ACCESS_KEY=your-unsplash-access-key-here
```

### 3. Configurar GitHub Secrets

En tu repositorio de GitHub, ve a **Settings > Secrets and variables > Actions** y agrega:

- `OPENAI_API_KEY`: Tu clave de API de OpenAI
- `UNSPLASH_ACCESS_KEY`: Tu clave de acceso a Unsplash

## 📅 Programación Automática

El sistema está configurado para generar artículos:
- **Lunes a las 9:00 AM** (hora de México)
- **Jueves a las 9:00 AM** (hora de México)

Esto equivale a 2 artículos por semana, 8-10 artículos por mes.

## 🎯 Funcionalidades

### Generación Automática
- Selecciona temas aleatorios de educación financiera
- Genera contenido de 800-1200 palabras
- Descarga imágenes relevantes de Unsplash
- Crea archivos HTML completos
- Actualiza la página de noticias automáticamente

### Temas Incluidos
- Mejora de historial crediticio
- Estrategias de ahorro para empleados
- Beneficios del crédito vía nómina
- Planificación de compra de auto
- Inversiones seguras para principiantes
- Presupuesto familiar efectivo
- Y más...

## 🛠️ Uso Manual

### Generar Artículo Individual
```bash
npm run generate-blog
```

### Generar con Tema Específico
```bash
node scripts/generate-blog.js --topic="Tu tema personalizado"
```

### Actualizar Página de Noticias
```bash
node scripts/update-news-page.js
```

## 📁 Estructura de Archivos

```
├── scripts/
│   ├── generate-blog.js      # Script principal de generación
│   └── update-news-page.js   # Actualizador de página de noticias
├── .github/workflows/
│   └── auto-blog.yml         # Configuración de GitHub Actions
├── articles/
│   └── index.json           # Índice de artículos generados
├── assets/images/articles/   # Imágenes descargadas
└── [nuevos-articulos].html  # Archivos HTML generados
```

## 🎨 Características del Contenido

### Estructura de Artículos
- **Título SEO-optimizado**
- **Introducción de 100 palabras**
- **3-4 secciones principales** con subtítulos
- **Conclusión** con llamada a la acción
- **3 puntos clave** como resumen
- **Meta tags** para SEO y redes sociales

### Diseño Profesional
- Responsive design
- Navegación consistente
- Footer corporativo
- Call-to-actions integrados
- Artículos relacionados

## 🔧 Personalización

### Modificar Temas
Edita el array `topics` en `scripts/generate-blog.js`:

```javascript
this.topics = [
  'Tu nuevo tema 1',
  'Tu nuevo tema 2',
  // ...
];
```

### Cambiar Horarios
Modifica el cron en `.github/workflows/auto-blog.yml`:

```yaml
schedule:
  - cron: '0 15 * * 1,4'  # Lunes y Jueves 15:00 UTC
```

### Personalizar Prompts
Ajusta el prompt de OpenAI en el método `generateContent()` para cambiar el estilo o enfoque.

## 🚨 Solución de Problemas

### Error: "OPENAI_API_KEY not found"
- Verifica que el secret esté configurado en GitHub
- Asegúrate que el .env local tenga la clave para pruebas

### Error: "Failed to download image"
- Verifica la clave de Unsplash
- El sistema usará placeholder si falla

### Error: "Failed to update noticias.html"
- Verifica que el archivo existe
- Revisa la estructura HTML del grid

## 💰 Costos Estimados

### OpenAI API
- **GPT-4**: ~$0.03-0.06 por artículo
- **8 artículos/mes**: ~$0.24-0.48/mes

### Unsplash API
- **Gratis**: 50 descargas/hora
- Suficiente para el uso proyectado

### GitHub Actions
- **Gratis**: 2000 minutos/mes para repos públicos
- Cada ejecución: ~2-3 minutos

## 🔮 Funciones Futuras

### Posibles Mejoras
- [ ] Integración con Google Analytics
- [ ] Generación de imágenes con DALL-E
- [ ] Newsletter automático
- [ ] Optimización SEO avanzada
- [ ] Integración con redes sociales
- [ ] A/B testing de títulos

## 📞 Soporte

Para problemas o mejoras:
1. Revisa los logs de GitHub Actions
2. Verifica la configuración de secrets
3. Contacta al equipo de desarrollo

---

**Financiera Incentiva** - Sistema de Generación Automática de Contenido v1.0 