/**
 * PartnersLogoManager
 * Carga dinámicamente los logos de los socios desde un JSON
 * y los inserta en un carrusel de scroll infinito.
 */
class PartnersLogoManager {
    constructor() {
        this.scroller = document.querySelector('.partners-scroller');
        if (!this.scroller) return;

        this.track = this.scroller.querySelector('.partners-track');
        this.logoManifestUrl = 'js/partner-logos.json';

        this.init();
    }

    async init() {
        try {
            const logoFilenames = await this.fetchLogos();
            if (logoFilenames.length === 0) {
                this.scroller.style.display = 'none'; // Ocultar si no hay logos
                return;
            }
            
            // Duplicar la lista de logos para el efecto de scroll infinito
            const allLogos = [...logoFilenames, ...logoFilenames];
            this.populateTrack(allLogos);

        } catch (error) {
            console.error('Error al cargar los logos de los socios:', error);
            this.scroller.style.display = 'none'; // Ocultar en caso de error
        }
    }

    async fetchLogos() {
        const response = await fetch(this.logoManifestUrl);
        if (!response.ok) {
            throw new Error(`No se pudo encontrar el archivo: ${this.logoManifestUrl}`);
        }
        return await response.json();
    }

    populateTrack(filenames) {
        this.track.innerHTML = ''; // Limpiar el contenedor
        const fragment = document.createDocumentFragment();

        for (const filename of filenames) {
            const logoItem = document.createElement('div');
            logoItem.className = 'partner-logo-item';
            
            const img = document.createElement('img');
            img.src = `assets/images/partners/${filename}`;
            img.alt = `Logo de ${filename.split('.')[0]}`; // Alt text básico
            
            logoItem.appendChild(img);
            fragment.appendChild(logoItem);
        }

        this.track.appendChild(fragment);
    }
}

export default PartnersLogoManager;
