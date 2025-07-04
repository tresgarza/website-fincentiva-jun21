/**
 * Updates noticias.html with the latest generated articles
 * Automatically adds new article cards to the news grid
 */

const fs = require('fs-extra');
const path = require('path');

class NewsPageUpdater {
  constructor() {
    this.baseDir = process.cwd();
    this.noticiasPath = path.join(this.baseDir, 'noticias.html');
    this.articlesDir = path.join(this.baseDir, 'articles');
  }

  async updateNewsPage() {
    try {
      console.log('🔄 Actualizando página de noticias...');
      
      // Read current noticias.html
      const noticiasContent = await fs.readFile(this.noticiasPath, 'utf8');
      
      // Get latest articles
      const articles = await this.getLatestArticles();
      
      // Generate new article cards HTML
      const newCardsHtml = this.generateArticleCards(articles);
      
      // Update the HTML content
      const updatedContent = this.replaceArticleCards(noticiasContent, newCardsHtml);
      
      // Write back to file
      await fs.writeFile(this.noticiasPath, updatedContent, 'utf8');
      
      console.log('✅ Página de noticias actualizada');
      return true;
      
    } catch (error) {
      console.error('❌ Error actualizando página de noticias:', error);
      return false;
    }
  }

  async getLatestArticles() {
    const indexPath = path.join(this.articlesDir, 'index.json');
    
    if (await fs.pathExists(indexPath)) {
      const articles = await fs.readJson(indexPath);
      return articles.slice(0, 12); // Show latest 12 articles
    }
    
    // Fallback: scan for HTML files
    const htmlFiles = await this.scanForArticles();
    return htmlFiles.slice(0, 12);
  }

  async scanForArticles() {
    const files = await fs.readdir(this.baseDir);
    const articleFiles = files.filter(file => 
      file.endsWith('.html') && 
      (file.startsWith('articulo-') || file.match(/^[a-z-]+-[0-9]+\.html$/))
    );
    
    const articles = [];
    
    for (const file of articleFiles) {
      try {
        const content = await fs.readFile(path.join(this.baseDir, file), 'utf8');
        const titleMatch = content.match(/<title>([^|]+)/);
        const descMatch = content.match(/<meta name="description" content="([^"]+)"/);
        const dateMatch = content.match(/<time datetime="([^"]+)"/);
        
        articles.push({
          title: titleMatch ? titleMatch[1].trim() : 'Artículo sin título',
          description: descMatch ? descMatch[1] : 'Artículo de educación financiera',
          path: file,
          date: dateMatch ? dateMatch[1] : new Date().toISOString(),
          category: 'Educación Financiera'
        });
      } catch (error) {
        console.warn(`⚠️ Error leyendo ${file}:`, error.message);
      }
    }
    
    // Sort by date (newest first)
    return articles.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  generateArticleCards(articles) {
    return articles.map(article => {
      const date = new Date(article.date);
      const formattedDate = date.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      return `                    <article class="news-card">
                        <div class="card-image">
                            <img src="assets/images/hero/hero-placeholder.svg" alt="${article.title}" loading="lazy">
                            <div class="card-category">${article.category}</div>
                        </div>
                        <div class="card-content">
                            <h3 class="card-title">
                                <a href="${article.path}">${article.title}</a>
                            </h3>
                            <p class="card-description">${article.description}</p>
                            <div class="card-meta">
                                <time datetime="${article.date}">${formattedDate}</time>
                                <a href="${article.path}" class="read-more">Leer más →</a>
                            </div>
                        </div>
                    </article>`;
    }).join('\n');
  }

  replaceArticleCards(content, newCardsHtml) {
    const placeholder = '<!-- ARTICLES_JSON_REPLACE -->';
    return content.replace(placeholder, newCardsHtml);
  }
}

// Execute if run directly
if (require.main === module) {
  const updater = new NewsPageUpdater();
  updater.updateNewsPage()
    .then(success => {
      if (success) {
        console.log('✅ Página de noticias actualizada exitosamente');
        process.exit(0);
      } else {
        console.error('❌ Error al actualizar página de noticias');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('❌ Error fatal:', error);
      process.exit(1);
    });
}

module.exports = NewsPageUpdater; 