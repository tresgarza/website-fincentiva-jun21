# 🏢 Financiera Incentiva - Sistema de Logos Adaptativo

Este directorio contiene todos los logos de Financiera Incentiva y el sistema adaptativo que automáticamente selecciona el logo correcto según el contexto.

## 📋 **LOGOS DISPONIBLES**

### **Logos Principales de Financiera Incentiva**
- `logo_fincentiva_original.png` - **Letra NEGRA + Flecha VERDE**
  - Para fondos claros/blancos
  - Headers, secciones con fondo claro
  - Documentos en papel blanco

- `logo_fincentiva_letra_blanca_flecha_verde.png` - **Letra BLANCA + Flecha VERDE**
  - Para fondos oscuros/negros
  - Footers, secciones con fondo oscuro
  - Presentaciones con fondo oscuro

### **Logos Institucionales**
- `condusef-logo.png` - Comisión Nacional para la Protección y Defensa de los Usuarios de Servicios Financieros
- `buro-credito-logo.png` - Buró de Crédito para reporte de historial crediticio
- `cnbv-logo.png` - Comisión Nacional Bancaria y de Valores

## 🎨 **SISTEMA ADAPTATIVO**

### **Clases CSS Disponibles**
```css
.logo-adaptive        /* Aplica transiciones y comportamiento adaptativo */
.logo-header         /* Tamaño optimizado para headers (40px) */
.logo-footer         /* Tamaño optimizado para footers (35px) */
.logo-hero           /* Tamaño optimizado para hero sections (45px) */
.logo-section        /* Tamaño optimizado para secciones internas (30px) */
```

### **Contextos de Uso Automático**
- **Headers**: Logo negro automáticamente (fondos claros)
- **Footers**: Logo blanco automáticamente (fondos oscuros)
- **Hero Sections**: Logo negro (fondos generalmente claros)
- **Secciones**: Se adapta según el fondo

## 📱 **RESPONSIVE**
El sistema incluye breakpoints responsive:
- Desktop: Tamaños completos
- Mobile (≤768px): Tamaños reducidos automáticamente

## 🔄 **IMPLEMENTACIÓN**

### **HTML Estructura**
```html
<!-- Header - Logo para fondo claro -->
<a href="index.html" class="logo-link logo-adaptive">
    <img src="assets/images/logos/logo_fincentiva_original.png" 
         alt="Financiera Incentiva" 
         class="logo logo-header">
</a>

<!-- Footer - Logo para fondo oscuro -->
<img src="assets/images/logos/logo_fincentiva_letra_blanca_flecha_verde.png" 
     alt="Financiera Incentiva" 
     class="footer-logo logo-footer logo-adaptive">
```

### **Variables CSS**
```css
--logo-light-bg: url('/assets/images/logos/logo_fincentiva_original.png');
--logo-dark-bg: url('/assets/images/logos/logo_fincentiva_letra_blanca_flecha_verde.png');
```

## 🌟 **MEJORES PRÁCTICAS**

### **Cuándo usar cada logo:**
1. **Logo Negro** (`logo_fincentiva_original.png`):
   - Fondos blancos o claros
   - Headers con fondo blanco
   - Secciones con fondo claro
   - Documentos PDF con fondo blanco

2. **Logo Blanco** (`logo_fincentiva_letra_blanca_flecha_verde.png`):
   - Fondos oscuros o negros
   - Footers con fondo oscuro
   - Secciones con gradientes oscuros
   - Presentaciones con fondo oscuro

### **Contraste y Legibilidad**
- **Siempre** verificar que hay suficiente contraste
- El logo debe ser **claramente legible**
- En caso de duda, usar el logo blanco sobre fondos oscuros
- Probar en diferentes dispositivos y tamaños

## 🎯 **UBICACIONES ESTRATÉGICAS**

### **Implementado en todas las páginas:**
- ✅ `index.html` - Header y Footer
- ✅ `colaboradores.html` - Header y Footer  
- ✅ `empresas.html` - Header y Footer
- ✅ `automotriz.html` - Header y Footer
- ✅ `nosotros.html` - Header y Footer
- ✅ `noticias.html` - Header y Footer

### **Ubicaciones especiales:**
- Value proposition (marca de agua sutil)
- Formularios de contacto empresarial
- Secciones de testimonios

## 🚀 **RENDIMIENTO**
- Logos optimizados para web
- Carga rápida con preload automático
- Transiciones suaves entre estados
- Cache-busting implementado

---

**Versión**: 2025 Adaptive Logo System  
**Actualizado**: Diciembre 2024  
**Mantenedor**: Financiera Incentiva Development Team 