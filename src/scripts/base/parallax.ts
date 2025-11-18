import imagesLoaded from "imagesloaded";
// @ts-expect-error : SimpleParallax is a vanilla JS library with no TypeScript type definitions
import SimpleParallax from "simple-parallax-js/vanilla";

const parallaxConfigs = {
    lg: { scale: 1.15 },
    sm: { scale: 1.07 },
};

export function initParallax() {
    imagesLoaded(document.querySelectorAll("[data-parallax]")).on("always", () => {
        Object.entries(parallaxConfigs).forEach(([presetKey, configOptions]) => {
            const parallaxEls = document.querySelectorAll<HTMLImageElement>(`[data-parallax="${presetKey}"]`);
            if (parallaxEls.length === 0) return;

            const parallax = new SimpleParallax(parallaxEls, {
                delay: 0.1,
                orientation: "down",
                overflow: false,
                wrapper: ".main",
                customWrapper: ".parallax",
                ...configOptions,
            });

            setTimeout(() => parallax.refresh(), 300);
        });
    });
}
