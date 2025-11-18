import gsap from "gsap";
import { toggleScroll } from "../utils/functions";
import { inner, bp } from "../utils/variables";
let header, nav, navItems, menuBtn;

const navActiveClass = "header__nav--active";
const navItemActiveClass = "header__nav__item--active";
const allDropdownChildren = ".header__nav__item__dropdown__content > *:not(.header__nav__item__dropdown__bg)";
export default function initHeader() {
    header = document.querySelector(".header");
    nav = document.querySelector(".header__nav");
    if (!header) return;
    initCloseHeaderOnBGClick();
    if (inner.w < bp.lg) {
        initMenuBtn();
        initMenuBackBtn();
        if (nav) initNavMbl();
    } else {
        if (nav) initNav();
    }
}
function initCloseHeaderOnBGClick() {
    // Close header on bg click
    const headerBG = header.querySelector(".header__bg");
    headerBG.addEventListener("click", () => {
        closeAllNavs();
        if (inner.w < bp["xlg"]) {
            menuBtn.classList.remove("menu-btn--active");
        }
    });
}
function initNav() {
    navItems = nav.querySelectorAll(".header__nav__item");
    navItems.forEach(navItem => {
        gsap.set(navItem.querySelectorAll(allDropdownChildren), { opacity: 0 });
        const trigger = navItem.querySelector(".header__nav__item__trigger");
        if (!trigger) return;
        let isClicked;
        trigger.addEventListener("click", () => {
            isClicked = true;
            setTimeout(() => {
                if (isClicked) navItemClick(navItem);
            }, 100);
            toggleScroll("disable");
            if (nav.classList.contains(navActiveClass) && navItem.classList.contains(navItemActiveClass)) {
                closeAllNavs();
                isClicked = false;
            }
        });
    });
}
function navItemClick(navItem) {
    if (!navItem.classList.contains(navItemActiveClass)) {
        nav.classList.add(navActiveClass);
        collapseAllNavs();
        header.classList.add("header--active");
        navItem.classList.add(navItemActiveClass);
        animateDropdown(navItem);
    }
}
function animateDropdown(navItem) {
    const dropdownChilds = navItem.querySelectorAll(allDropdownChildren);
    const sortedChilds = Array.from(dropdownChilds as NodeListOf<HTMLElement>).sort((a, b) => {
        return parseInt(window.getComputedStyle(a).order, 10) - parseInt(window.getComputedStyle(b).order, 10);
    });
    gsap.fromTo(
        sortedChilds,
        {
            opacity: 0,
            y: -5,
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.12,
            delay: 0.7,
        }
    );
}
function closeAllNavs() {
    nav.classList.remove(navActiveClass);
    collapseAllNavs();
    toggleScroll("enable");
}
function collapseAllNavs() {
    navItems.forEach(navItem => {
        header.classList.remove("header--active");
        navItem.classList.remove(navItemActiveClass);
        gsap.to(navItem.querySelectorAll(allDropdownChildren), {
            opacity: 0,
            y: -3,
            duration: 0.3,
            stagger: 0.07,
        });
    });
}
function closeNavItems() {
    navItems.forEach(navItem => {
        navItem.classList.remove(navItemActiveClass);
        gsap.to(navItem.querySelectorAll(allDropdownChildren), {
            opacity: 0,
            y: -3,
            duration: 0.3,
            stagger: 0.07,
        });
    });
}
// Mobile Header :point_down:
function initMenuBtn() {
    menuBtn = document.querySelector(".menu-btn");
    menuBtn?.addEventListener("click", () => {
        header.classList.toggle("header--active");
        if (header.classList.contains("header--active")) {
            toggleScroll("disable");
        } else {
            toggleScroll("enable");
            setTimeout(() => {
                closeNavItems();
            }, 500);
        }
    });
}
function initMenuBackBtn() {
    const menuBackBtns = document.querySelectorAll(".header__nav__item__dropdown__back");
    menuBackBtns?.forEach(btn => {
        btn?.addEventListener("click", () => {
            const servicesMenuList = document.querySelector<HTMLElement>(".services-menu__list.active");
            const isServicesMenuActive = servicesMenuList?.classList.contains("active");
            if (isServicesMenuActive) {
                servicesMenuList?.classList.remove("active");
            } else {
                closeNavItems();
            }
        });
    });
}
function initNavMbl() {
    navItems = nav.querySelectorAll(".header__nav__item");
    navItems.forEach(navItem => {
        gsap.set(navItem.querySelectorAll(allDropdownChildren), { opacity: 0 });
        const trigger = navItem.querySelector(".header__nav__item__trigger");
        if (!trigger) return;
        let isClicked;
        trigger.addEventListener("click", () => {
            isClicked = true;
            setTimeout(() => {
                if (isClicked) navItemClick(navItem);
            }, 100);
            toggleScroll("disable");
            if (nav.classList.contains(navActiveClass) && navItem.classList.contains(navItemActiveClass)) {
                closeAllNavs();
                isClicked = false;
            }
        });
    });
}
