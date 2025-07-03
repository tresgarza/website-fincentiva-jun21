# 🎨 Instrucciones para Generar la Nueva Imagen del Hero

## 📋 **Prompt Completo para IA de Generación de Imágenes**

Usa exactamente este prompt en tu herramienta de generación de imágenes (DALL-E, Midjourney, etc.):

```
Create a modern, professional hero image for a Mexican fintech company called "Financiera Incentiva". The image should show:

MAIN SUBJECT: A diverse group of 3-4 young Mexican professionals (mix of men and women, ages 25-35) in a modern office environment, looking confident and successful. One person should be holding a smartphone showing a financial app interface.

SETTING: Bright, modern office space with large windows showing Mexico City skyline in soft focus background. Clean, minimalist design with warm lighting.

VISUAL ELEMENTS:
- Floating holographic financial icons around them (peso signs, graphs trending upward, credit cards, digital documents)
- Subtle golden/green light rays suggesting growth and prosperity
- Modern laptops and tablets on sleek desks
- Plants and modern furniture suggesting work-life balance

STYLE: 
- Photorealistic but with subtle digital enhancement
- Warm, professional lighting (golden hour feel)
- Clean, modern aesthetic
- Colors: Deep greens (#39a860), blues (#0771f6), and warm oranges (#FF7A00)
- High resolution, suitable for web (16:9 aspect ratio)

MOOD: Success, innovation, trust, Mexican pride, digital transformation, financial growth, team collaboration

TECHNICAL: Professional photography style, shallow depth of field, no text overlays, optimized for web display at 1200x675px minimum.
```

## 🔧 **Cómo Implementar la Nueva Imagen**

Una vez que generes la imagen:

1. **Descarga la imagen** en alta resolución
2. **Guárdala** como `hero-financiera-incentiva.jpg` o `.png`
3. **Súbela** a tu servidor o servicio de hosting de imágenes
4. **Actualiza** la URL en el código:

### Opción 1: Cambio Manual en HTML
```html
<!-- En index.html, línea ~50 -->
<img src="TU_NUEVA_URL_AQUI" alt="Soluciones financieras Financiera Incentiva" id="hero-main-image">
```

### Opción 2: Cambio Programático (Recomendado)
```javascript
// En la consola del navegador después de subir la imagen:
const heroManager = window.FinanceiraApp.getModule('hero');
if (heroManager) {
    heroManager.updateHeroImage('TU_NUEVA_URL_AQUI');
    heroManager.triggerCelebration(); // ¡Opcional: efecto de celebración!
}
```

## 🎯 **Alternativas de Prompt por Estilo**

### Estilo 1: Más Corporate
```
Replace "diverse group" with "executive team in business attire"
Add "glass conference room" instead of "open office"
```

### Estilo 2: Más Tecnológico
```
Add "multiple screens showing financial data"
Include "AR/VR elements floating in space"
Emphasize "futuristic UI elements"
```

### Estilo 3: Más Humano/Cercano
```
Replace "office" with "modern co-working space"
Add "people helping each other, mentoring"
Include "warm, friendly expressions and body language"
```

## 📱 **Optimización de Imagen**

Después de generar, asegúrate de:

- ✅ **Resolución:** Mínimo 1200x675px (aspecto 16:9)
- ✅ **Formato:** JPG optimizado o WebP para mejor performance
- ✅ **Tamaño:** Máximo 200KB para carga rápida
- ✅ **Alt text:** Descriptivo para accesibilidad

## 🚀 **Efectos Especiales Disponibles**

Una vez implementada la nueva imagen, puedes probar estos efectos especiales:

```javascript
const heroManager = window.FinanceiraApp.getModule('hero');

// Efecto de celebración con partículas doradas
heroManager.triggerCelebration();

// Cambiar imagen con transición suave
heroManager.updateHeroImage('nueva-url.jpg');
```

## 🎨 **Paleta de Colores Exacta**

Para referencia del diseñador o IA:

- **Verde Principal:** `#39a860` (RGB: 57, 168, 96)
- **Azul Secundario:** `#0771f6` (RGB: 7, 113, 246)  
- **Naranja Acento:** `#FF7A00` (RGB: 255, 122, 0)
- **Fondo Gradiente:** Transición suave entre verde y azul

---

**💡 Tip:** Si la primera generación no es perfecta, puedes iterar refinando los elementos específicos que quieras mejorar en el prompt. 