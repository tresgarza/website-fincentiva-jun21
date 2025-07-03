# 📸 Guía de Imágenes - Financiera Incentiva

## 📁 **Estructura de Carpetas**

```
assets/images/
├── hero/                   # Imágenes principales del hero section
│   ├── hero-main.jpg      # Imagen principal del hero
│   ├── hero-bg.jpg        # Backgrounds alternativos
│   └── hero-mobile.jpg    # Versión optimizada para móvil
├── sections/              # Imágenes de secciones
│   ├── about-us.jpg
│   ├── services-*.jpg
│   └── testimonials-*.jpg
├── logos/                 # Logos y marcas
│   ├── logo-main.svg
│   ├── partners/
│   └── certifications/
└── team/                  # Fotos del equipo
    ├── ceo.jpg
    ├── directors/
    └── team-photo.jpg
```

## 🎯 **Especificaciones por Tipo de Imagen**

### **Hero Section**
- **Resolución:** 1920x1080px (16:9)
- **Formato:** JPG optimizado (WebP si es posible)
- **Tamaño máximo:** 200KB
- **Nombre:** `hero-main.jpg`

### **Secciones**
- **Resolución:** 800x600px (4:3) o 1200x800px (3:2)
- **Formato:** JPG optimizado
- **Tamaño máximo:** 150KB
- **Nombres descriptivos:** `services-credito.jpg`

### **Logos**
- **Formato:** SVG (preferido) o PNG transparente
- **Tamaño:** Vectorial o mínimo 200x200px
- **Fondo:** Transparente

## 🚀 **Cómo Subir y Usar Imágenes**

### 1. **Guarda tu imagen** en la carpeta correspondiente:
```bash
# Ejemplo: Guardar imagen del hero
# Copia tu archivo como: assets/images/hero/hero-main.jpg
```

### 2. **Actualiza el código** (automático):
```javascript
// El sistema detectará automáticamente la nueva imagen
// No necesitas cambiar URLs complejas, solo el nombre del archivo
```

### 3. **Verifica en el navegador**:
- URL local: `http://localhost:8000/assets/images/hero/hero-main.jpg`
- La imagen debe cargar perfectamente

## 🛠️ **Herramientas de Optimización Recomendadas**

### **Online (Gratis):**
- **TinyPNG/TinyJPG:** Compresión sin pérdida de calidad
- **Squoosh (Google):** Optimización avanzada
- **JPEG Optimizer:** Ajuste de calidad específico

### **Mac (Nativas):**
- **ImageOptim:** Compresión batch
- **Preview:** Redimensionar y exportar
- **Photoshop/GIMP:** Edición profesional

## 📱 **Responsive Images**

Para cada imagen importante, crea 3 versiones:

```
hero-main.jpg          # Desktop (1920x1080)
hero-main-tablet.jpg   # Tablet (1024x768)  
hero-main-mobile.jpg   # Mobile (750x500)
```

## 🔄 **Sistema de Actualización Automática**

He configurado el código para que sea súper fácil cambiar imágenes:

### **Cambio Rápido:**
1. Guarda tu nueva imagen como `assets/images/hero/hero-main.jpg`
2. Refresca el navegador
3. ¡Listo! La nueva imagen aparece automáticamente

### **Cambio Programático:**
```javascript
// En la consola del navegador:
const heroManager = window.FinanceiraApp.getModule('hero');
heroManager.updateHeroImage('./assets/images/hero/hero-main.jpg');
```

## ⚡ **Mejores Prácticas**

### ✅ **Hacer:**
- Usar nombres descriptivos: `hero-financiera-2024.jpg`
- Optimizar SIEMPRE antes de subir
- Mantener aspect ratios consistentes
- Usar WebP cuando sea posible
- Crear versiones responsive

### ❌ **Evitar:**
- Nombres genéricos: `imagen1.jpg`
- Imágenes sin optimizar (>500KB)
- Formatos innecesarios (BMP, TIFF)
- URLs externas para imágenes críticas
- Imágenes sin alt text

## 🎨 **Paleta de Colores para Referencia**

Al editar imágenes, mantén consistencia con:

- **Verde Principal:** #39a860
- **Azul Secundario:** #0771f6  
- **Naranja Acento:** #FF7A00
- **Grises:** #f8f9fa, #6c757d, #212529

## 📊 **Checklist de Calidad**

Antes de usar cualquier imagen, verifica:

- [ ] ✅ Resolución adecuada para su uso
- [ ] ✅ Archivo optimizado (<200KB para hero)
- [ ] ✅ Nombre descriptivo y organizado
- [ ] ✅ Alt text definido en el HTML
- [ ] ✅ Funciona en móvil y desktop
- [ ] ✅ Carga rápidamente
- [ ] ✅ Colores consistentes con la marca

---

**💡 Tip:** Si necesitas generar imágenes con IA, usa el prompt del archivo `HERO_IMAGE_INSTRUCTIONS.md` como base y ajústalo según necesites. 