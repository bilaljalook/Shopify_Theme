/**
 * Enhanced Performance Module
 * Handles lazy loading, intersection observers, and performance monitoring
 */

class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.setupCriticalResourceLoading();
        this.markDOMLoaded();
        this.preloadCriticalImages();
        this.setupIntersectionObserver();
    }

    /**
     * Setup lazy loading for non-critical images
     */
    setupLazyLoading() {
        if ('loading' in HTMLImageElement.prototype) {
            // Native lazy loading support
            const images = document.querySelectorAll('img[data-src]');
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.loading = 'lazy';
            });
        } else {
            // Fallback for browsers without native lazy loading
            this.loadLazyLoadingPolyfill();
        }
    }

    /**
     * Load lazy loading polyfill for older browsers
     */
    loadLazyLoadingPolyfill() {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/vanilla-lazyload@17.8.3/dist/lazyload.min.js';
        script.onload = () => {
            new LazyLoad({
                elements_selector: 'img[data-src], [data-bg]',
                threshold: 300
            });
        };
        document.head.appendChild(script);
    }

    /**
     * Preload critical above-the-fold images
     */
    preloadCriticalImages() {
        const criticalImages = document.querySelectorAll('[data-critical-image]');
        criticalImages.forEach(img => {
            if (img.dataset.src) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = img.dataset.src;
                document.head.appendChild(link);
            }
        });
    }

    /**
     * Setup intersection observer for performance tracking
     */
    setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.handleElementInView(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            // Observe critical sections
            document.querySelectorAll('[data-observe]').forEach(el => {
                observer.observe(el);
            });
        }
    }

    /**
     * Handle element coming into view
     */
    handleElementInView(element) {
        // Load any deferred content
        if (element.dataset.deferredContent) {
            this.loadDeferredContent(element);
        }

        // Track performance metrics
        if (element.dataset.trackMetric) {
            this.trackMetric(element.dataset.trackMetric);
        }
    }

    /**
     * Load critical resources after initial page load
     */
    setupCriticalResourceLoading() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.loadNonCriticalCSS();
                this.loadNonCriticalJS();
            });
        } else {
            this.loadNonCriticalCSS();
            this.loadNonCriticalJS();
        }
    }

    /**
     * Load non-critical CSS after page load
     */
    loadNonCriticalCSS() {
        const nonCriticalCSS = [
            // Add any non-critical CSS files here
        ];

        nonCriticalCSS.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.media = 'print';
            link.onload = function () {
                this.media = 'all';
            };
            document.head.appendChild(link);
        });
    }

    /**
     * Load non-critical JavaScript after page load
     */
    loadNonCriticalJS() {
        const nonCriticalJS = [
            // Add any non-critical JS files here
        ];

        nonCriticalJS.forEach(src => {
            const script = document.createElement('script');
            script.src = src;
            script.defer = true;
            document.head.appendChild(script);
        });
    }

    /**
     * Mark DOM as loaded and remove loading class
     */
    markDOMLoaded() {
        document.body.classList.remove('js-loading');
        document.body.classList.add('js-loaded');
        document.body.removeAttribute('data-js-loading');
    }

    /**
     * Track performance metrics
     */
    trackMetric(metricName) {
        if ('performance' in window && performance.mark) {
            performance.mark(`metric-${metricName}`);
        }
    }

    /**
     * Load deferred content
     */
    loadDeferredContent(element) {
        // Implementation for loading deferred content
        const content = element.dataset.deferredContent;
        if (content) {
            fetch(content)
                .then(response => response.text())
                .then(html => {
                    element.innerHTML = html;
                    element.removeAttribute('data-deferred-content');
                })
                .catch(error => console.warn('Failed to load deferred content:', error));
        }
    }
}

// Initialize performance optimizer
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PerformanceOptimizer();
    });
} else {
    new PerformanceOptimizer();
}

// Export for use in other modules
window.PerformanceOptimizer = PerformanceOptimizer;
