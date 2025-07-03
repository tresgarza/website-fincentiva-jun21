/**
 * SimpleProcessManager
 * Activa animaciones de los pasos al entrar en el viewport.
 * Cada .step-item obtiene la clase .in-view con IntersectionObserver.
 * Esta es una implementación simplificada y robusta.
 */
class SimpleProcessManager {
    constructor() {
        this.steps = Array.from(document.querySelectorAll('.step-item'));
        if (!this.steps.length) {
            console.warn('SimpleProcessManager: No se encontraron elementos .step-item');
            return;
        }

        this.initObserver();
    }

    initObserver() {
        const options = {
            root: null,
            // Trigger cuando al menos un 10% del elemento es visible,
            // empezando a observar 20% antes del final del viewport.
            rootMargin: '0px 0px -20% 0px',
            threshold: 0.1,
        };

        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // Si el elemento está intersectando con el viewport
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    // Una vez que el paso ha sido animado, dejamos de observarlo.
                    // Esto previene que la animación se revierta y mejora el rendimiento.
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        // Observar cada uno de los pasos.
        this.steps.forEach(step => io.observe(step));
    }
}

export default SimpleProcessManager; 