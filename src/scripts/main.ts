import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

gsap.defaults({
    ease: "ease",
    duration: 1,
});

gsap.config({
    nullTargetWarn: true,
    autoSleep: 60,
    force3D: false,
});

import {
    runDefault,
    runLayoutDefault,
    // runComponentDefault,
    // runModuleDefault
} from "./utils/runner-functions";

import { initVariables } from "./utils/variables";
import { initLinkPrefetch } from "./utils/link-prefetch";
import { initScroller } from "./base/scroll";

function init() {
    initGlobalScripts();
    initLayoutScripts();
    initComponentScripts();
    initModuleScripts();
}

function initGlobalScripts() {
    initVariables();
    initScroller();
    initLinkPrefetch();
    runDefault("grid");
}

function initLayoutScripts() {
    // runLayoutDefault("footer");
    runLayoutDefault("header");
}

function initComponentScripts() {
    // runComponentDefault("modal", "[data-video-src]");
}

function initModuleScripts() {
    // runModuleDefault("slider", ".slider");
}

function safeInit() {
    requestAnimationFrame(() => setTimeout(init, 1));
}

if (!(document.readyState === "loading")) safeInit();
else document.addEventListener("DOMContentLoaded", safeInit);
