/**
 * Automated Blog Generation System for Financiera Incentiva
 * Generates financial education articles using OpenAI API
 * Downloads images from Unsplash API
 * Creates HTML files automatically
 */

require('dotenv').config();
const OpenAI = require('openai');
const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const { format } = require('date-fns');
const { es } = require('date-fns/locale');
const slugify = require('slugify');

class BlogGenerator {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
    this.unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;
    this.baseDir = process.cwd();
    this.articlesDir = path.join(this.baseDir, 'articles');
    this.imagesDir = path.join(this.baseDir, 'assets', 'images', 'articles');
    
    // Financial topics for variety
    this.topics = [
      'Mejora tu historial crediticio',
      'Estrategias de ahorro para empleados',
      'Beneficios del crédito vía nómina',
      'Cómo planificar la compra de tu auto',
      'Inversiones seguras para principiantes',
      'Presupuesto familiar efectivo',
      'Diferencias entre crédito tradicional y nómina',
      'Construcción de patrimonio personal',
      'Finanzas personales para millennials',
      'Importancia del fondo de emergencia',
      'Crédito responsable y sostenible',
      'Educación financiera básica'
    ];
    
    this.init();
  }

  async init() {
    // Create directories if they don't exist
    await fs.ensureDir(this.articlesDir);
    await fs.ensureDir(this.imagesDir);
  }

  /**
   * Generate a complete blog article
   */
  async generateArticle() {
    try {
      console.log('🚀 Iniciando generación de artículo...');
      
      // 1. Select a random topic
      const topic = this.getRandomTopic();
      console.log(`📝 Tema seleccionado: ${topic}`);
      
      // 2. Generate article content
      const articleData = await this.generateContent(topic);
      console.log('✅ Contenido generado');
      
      // 3. Download relevant image
      const imagePath = await this.downloadImage(topic);
      console.log(`🖼️ Imagen descargada: ${imagePath}`);
      
      // 4. Create HTML file
      const htmlPath = await this.createHtmlFile(articleData, imagePath);
      console.log(`📄 HTML creado: ${htmlPath}`);
      
      // 5. Update articles index
      await this.updateArticlesIndex(articleData, htmlPath);
      console.log('📚 Índice actualizado');
      
      console.log('🎉 ¡Artículo generado exitosamente!');
      return {
        success: true,
        articlePath: htmlPath,
        imagePath: imagePath,
        title: articleData.title
      };
      
    } catch (error) {
      console.error('❌ Error generando artículo:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Generate article content using OpenAI
   */
  async generateContent(topic) {
    const prompt = `
Eres un experto en educación financiera que trabaja para Financiera Incentiva, una SOFOM ENR especializada en créditos vía nómina y automotriz.

Escribe un artículo educativo sobre: "${topic}"

El artículo debe:
- Ser informativo y educativo
- Tener entre 800-1200 palabras
- Incluir consejos prácticos
- Mencionar sutilmente los servicios de Financiera Incentiva cuando sea relevante
- Usar un tono profesional pero accesible
- Incluir llamadas a la acción suaves

Estructura:
1. Título llamativo
2. Introducción (100 palabras)
3. 3-4 secciones principales con subtítulos
4. Conclusión con llamada a la acción
5. 3 puntos clave como resumen

Formato de respuesta JSON:
{
  "title": "Título del artículo",
  "introduction": "Introducción del artículo",
  "sections": [
    {
      "subtitle": "Subtítulo de la sección",
      "content": "Contenido de la sección"
    }
  ],
  "conclusion": "Conclusión del artículo",
  "keyPoints": ["Punto clave 1", "Punto clave 2", "Punto clave 3"],
  "metaDescription": "Descripción meta para SEO (150 caracteres max)"
}
`;

    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 2000
    });

    const content = response.choices[0].message.content;
    
    // Parse JSON response
    try {
      const articleData = JSON.parse(content);
      articleData.date = format(new Date(), 'dd \'de\' MMMM \'de\' yyyy', { locale: es });
      articleData.slug = slugify(articleData.title, { lower: true, strict: true });
      return articleData;
    } catch (parseError) {
      throw new Error('Error parsing OpenAI response: ' + parseError.message);
    }
  }

  /**
   * Download relevant image from Unsplash
   */
  async downloadImage(topic) {
    try {
      // Search for relevant image
      const searchQuery = this.getImageSearchQuery(topic);
      const imageUrl = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(searchQuery)}&orientation=landscape&client_id=${this.unsplashAccessKey}`;
      
      const response = await axios.get(imageUrl);
      const imageData = response.data;
      
      // Download the image
      const imageResponse = await axios.get(imageData.urls.regular, {
        responseType: 'stream'
      });
      
      const filename = `article-${Date.now()}.jpg`;
      const imagePath = path.join(this.imagesDir, filename);
      
      const writer = fs.createWriteStream(imagePath);
      imageResponse.data.pipe(writer);
      
      return new Promise((resolve, reject) => {
        writer.on('finish', () => resolve(`assets/images/articles/${filename}`));
        writer.on('error', reject);
      });
      
    } catch (error) {
      console.warn('⚠️ Error descargando imagen de Unsplash, usando placeholder');
      return 'assets/images/hero/hero-placeholder.svg';
    }
  }

  /**
   * Convert topic to image search query
   */
  getImageSearchQuery(topic) {
    const queries = {
      'Mejora tu historial crediticio': 'credit score financial planning',
      'Estrategias de ahorro': 'savings money planning',
      'Beneficios del crédito': 'financial benefits business',
      'Cómo planificar la compra': 'car buying financial planning',
      'Inversiones seguras': 'safe investments financial growth',
      'Presupuesto familiar': 'family budget financial planning',
      'Diferencias entre crédito': 'credit comparison financial services',
      'Construcción de patrimonio': 'wealth building financial growth',
      'Finanzas personales': 'personal finance money management',
      'Fondo de emergencia': 'emergency fund savings',
      'Crédito responsable': 'responsible credit financial advice',
      'Educación financiera': 'financial education learning'
    };
    
    // Find best match or use default
    for (const [key, value] of Object.entries(queries)) {
      if (topic.includes(key)) return value;
    }
    
    return 'financial planning business professional';
  }

  /**
   * Create HTML file for the article
   */
  async createHtmlFile(articleData, imagePath) {
    const htmlTemplate = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${articleData.title} | Financiera Incentiva</title>
    <meta name="description" content="${articleData.metaDescription}">
    <meta name="keywords" content="finanzas, crédito, nómina, educación financiera, Financiera Incentiva">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://financieraincentiva.com/${articleData.slug}.html">
    <meta property="og:title" content="${articleData.title}">
    <meta property="og:description" content="${articleData.metaDescription}">
    <meta property="og:image" content="https://financieraincentiva.com/${imagePath}">
    
    <!-- CSS -->
    <link rel="stylesheet" href="css/core/variables.css">
    <link rel="stylesheet" href="css/components/layout.css">
    <link rel="stylesheet" href="css/components/news.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <div class="header-content">
                <div class="logo">
                    <a href="index.html">
                        <img src="assets/images/logos/logo_fincentiva_original.png" alt="Financiera Incentiva" height="40">
                    </a>
                </div>
                <nav class="nav">
                    <a href="index.html" class="nav-link">Inicio</a>
                    <a href="nosotros.html" class="nav-link">Nosotros</a>
                    <a href="colaboradores.html" class="nav-link">Colaboradores</a>
                    <a href="empresas.html" class="nav-link">Empresas</a>
                    <a href="automotriz.html" class="nav-link">Automotriz</a>
                    <a href="noticias.html" class="nav-link">Noticias</a>
                </nav>
            </div>
        </div>
    </header>

    <!-- Article Content -->
    <main class="article-main">
        <div class="container">
            <article class="article-content">
                <!-- Article Header -->
                <header class="article-header">
                    <div class="article-meta">
                        <time datetime="${new Date().toISOString()}">${articleData.date}</time>
                        <span class="article-category">Educación Financiera</span>
                    </div>
                    <h1 class="article-title">${articleData.title}</h1>
                    <div class="article-image">
                        <img src="${imagePath}" alt="${articleData.title}" loading="lazy">
                    </div>
                </header>

                <!-- Article Body -->
                <div class="article-body">
                    <div class="article-introduction">
                        ${articleData.introduction}
                    </div>

                    ${articleData.sections.map(section => `
                    <section class="article-section">
                        <h2 class="section-title">${section.subtitle}</h2>
                        <div class="section-content">
                            ${section.content.replace(/\n/g, '</p><p>')}
                        </div>
                    </section>
                    `).join('')}

                    <div class="article-conclusion">
                        <h2>Conclusión</h2>
                        ${articleData.conclusion}
                    </div>

                    <!-- Key Points -->
                    <div class="key-points">
                        <h3>Puntos Clave</h3>
                        <ul>
                            ${articleData.keyPoints.map(point => `<li>${point}</li>`).join('')}
                        </ul>
                    </div>

                    <!-- Call to Action -->
                    <div class="article-cta">
                        <h3>¿Necesitas más información?</h3>
                        <p>En Financiera Incentiva estamos comprometidos con tu educación financiera. Si tienes dudas sobre créditos vía nómina o automotriz, nuestro equipo está listo para ayudarte.</p>
                        <div class="cta-buttons">
                            <a href="index.html#contacto" class="btn btn-primary">Contactar Asesor</a>
                            <a href="noticias.html" class="btn btn-secondary">Más Artículos</a>
                        </div>
                    </div>
                </div>
            </article>

            <!-- Related Articles -->
            <aside class="related-articles">
                <h3>Artículos Relacionados</h3>
                <div class="related-grid">
                    <a href="articulo-beneficios-nomina.html" class="related-card">
                        <h4>Beneficios del Crédito Vía Nómina</h4>
                        <p>Descubre las ventajas únicas de este tipo de financiamiento.</p>
                    </a>
                    <a href="articulo-mejorar-historial.html" class="related-card">
                        <h4>Cómo Mejorar tu Historial Crediticio</h4>
                        <p>Estrategias efectivas para construir un mejor perfil financiero.</p>
                    </a>
                    <a href="articulo-tendencias-financieras.html" class="related-card">
                        <h4>Tendencias Financieras 2024</h4>
                        <p>Las últimas innovaciones en el sector financiero mexicano.</p>
                    </a>
                </div>
            </aside>
        </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h4>Financiera Incentiva</h4>
                    <p>SOFOM ENR especializada en créditos vía nómina y automotriz con 14 años de experiencia.</p>
                </div>
                <div class="footer-section">
                    <h4>Contacto</h4>
                    <p>📞 (81) 8000-0000<br>
                    📧 info@financieraincentiva.com</p>
                </div>
                <div class="footer-section">
                    <h4>Legal</h4>
                    <p>CONDUSEF: 4563-450-038762<br>
                    Entidad No Regulada</p>
                </div>
            </div>
        </div>
    </footer>

    <script src="js/app.js"></script>
</body>
</html>`;

    const filename = `${articleData.slug}.html`;
    const filePath = path.join(this.baseDir, filename);
    
    await fs.writeFile(filePath, htmlTemplate, 'utf8');
    return filename;
  }

  /**
   * Update the articles index
   */
  async updateArticlesIndex(articleData, htmlPath) {
    const indexPath = path.join(this.articlesDir, 'index.json');
    
    let articles = [];
    if (await fs.pathExists(indexPath)) {
      articles = await fs.readJson(indexPath);
    }
    
    articles.unshift({
      title: articleData.title,
      slug: articleData.slug,
      date: new Date().toISOString(),
      description: articleData.metaDescription,
      path: htmlPath,
      category: 'Educación Financiera'
    });
    
    // Keep only last 50 articles
    articles = articles.slice(0, 50);
    
    await fs.writeJson(indexPath, articles, { spaces: 2 });
  }

  /**
   * Get random topic
   */
  getRandomTopic() {
    return this.topics[Math.floor(Math.random() * this.topics.length)];
  }
}

// Execute if run directly
if (require.main === module) {
  const generator = new BlogGenerator();
  generator.generateArticle()
    .then(result => {
      if (result.success) {
        console.log('✅ Generación exitosa:', result.title);
        process.exit(0);
      } else {
        console.error('❌ Error:', result.error);
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('❌ Error fatal:', error);
      process.exit(1);
    });
}

module.exports = BlogGenerator; 