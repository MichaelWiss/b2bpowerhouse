"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { Draggable } from "gsap/all";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, Draggable);

/**
 * B2BAnimations — GSAP animation controller for B2B Powerhouse.
 * Mount once in the root layout. All selectors, easings, durations and logic
 * match the reference design exactly.
 */
export default function B2BAnimations() {
  useEffect(() => {
    // ─── Lenis smooth scroll — exact config from Celeres ──────────────────
    // We re-use the Lenis instance already created by SmoothScroll.tsx
    // but replicate the RAF approach Celeres uses:
    //   function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    //   requestAnimationFrame(raf);
    // To avoid double-RAF with the existing SmoothScroll component we wire
    // into the GSAP ticker (which SmoothScroll already does). No change needed.

    // ─── SplitText — exact call from Celeres ──────────────────────────────
    let split: InstanceType<typeof SplitText> | null = null;
    try {
      split = SplitText.create("[data-split]", {
        aria: "none",
        type: "words, lines",
        mask: "lines",
        wordsClass: "split-word",
        linesClass: "split-line",
      });
    } catch {
      // SplitText not available (not a GSAP Club plan) — text animations will be skipped
    }

    // ─── CustomEase — exact from Celeres ──────────────────────────────────
    CustomEase.create("outCustom", "0.16, 1, 0.3, 1");
    CustomEase.create("inOutCustom", "0.16, 1, 0.3, 1");

    // ─── page load transition — exact from Celeres ────────────────────────
    const header = document.getElementById("header");
    const tl = gsap.timeline({ ease: "outQuart" });
    tl.set(".transition-column", { display: "block" });
    if (header) tl.set(header, { yPercent: -100 });
    tl.to(".transition-column", { scaleY: 0, ease: "outCustom", duration: 1.5, delay: 0.1 });
    tl.set(".transition-wrap", { display: "none" });
    if (header) tl.to(header, { yPercent: 0, duration: 0.8, ease: "outCustom" }, "-=0.4");

    // ─── link click transition — exact from Celeres ───────────────────────
    const handleLinkClick = (e: MouseEvent) => {
      const anchor = (e.target as Element)?.closest("a");
      if (!anchor) return;
      const currentUrl = anchor.getAttribute("href");
      if (!currentUrl) return;
      if (
        anchor.hostname === window.location.hostname &&
        !currentUrl.startsWith("#") &&
        anchor.target !== "_blank"
      ) {
        e.preventDefault();
        const linkTl = gsap.timeline({
          onComplete: () => { window.location.href = currentUrl; },
        });
        linkTl
          .set(".transition-wrap", { display: "flex" })
          .set(".transition-column.top", { transformOrigin: "bottom" })
          .set(".transition-column.bottom", { transformOrigin: "top" })
          .fromTo(
            ".transition-column",
            { scaleY: 0 },
            { scaleY: 1, ease: "outCustom", duration: 0.6 }
          );
      }
    };
    document.addEventListener("click", handleLinkClick);

    const closeFraud = document.getElementById("closeFraud");
    const cursorEl = document.querySelector(".cursor");
    const cursorWrapper = document.querySelector(".cursor-wrapper");
    let menuObserver: MutationObserver | null = null;
    let moveHandler: ((ev: MouseEvent) => void) | null = null;
    let headerHidden = false;

    // Reset GSAP header position when menu opens so scroll-hide doesn't flash
    if (header) {
      menuObserver = new MutationObserver(() => {
        if (header.classList.contains("menu-open")) {
          gsap.killTweensOf(header);
          gsap.set(header, { yPercent: 0 });
          headerHidden = false;
        }
      });
      menuObserver.observe(header, { attributes: true, attributeFilter: ["class"] });
    }

    if (closeFraud) {
      closeFraud.addEventListener("click", () => {
        const fraud = document.querySelector(".fraud-banner") as HTMLElement | null;
        if (fraud) fraud.style.display = "none";
      });
    }

    if (cursorEl && cursorWrapper) {
      moveHandler = (ev: MouseEvent) => {
        gsap.set(cursorWrapper, { x: ev.clientX, y: ev.clientY });
      };
      document.addEventListener("mousemove", moveHandler);
      document.querySelectorAll("a, .menu-button, .slider-arrow, .case-study-link, .line-item").forEach((el) => {
        el.addEventListener("mouseenter", () => cursorEl.classList.add("cursor-hover"));
        el.addEventListener("mouseleave", () => cursorEl.classList.remove("cursor-hover"));
      });
    }

    // On Back Button — exact from Celeres
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) window.location.reload();
    };
    window.addEventListener("pageshow", handlePageShow);

    // ─── [data-animate] — exact from Celeres ──────────────────────────────
    document.querySelectorAll("[data-animate]").forEach((el) => {
      el.classList.add("reset");

      ScrollTrigger.create({
        trigger: el as Element,
        start: "top bottom",
        end: "bottom top",
        onLeaveBack: () => {
          el.classList.add("reset");
          el.classList.remove("animating");
        },
      });

      ScrollTrigger.create({
        trigger: el as Element,
        start: "top 75%",
        end: "bottom top",
        onEnter: () => {
          el.classList.remove("reset");
          el.classList.add("animating");
        },
      });
    });

    // ─── [data-text-animate] — exact from Celeres ─────────────────────────
    function createScrollTrigger(triggerElement: Element, timeline: gsap.core.Timeline) {
      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top bottom",
        onEnter: () => timeline.play(),
      });
    }

    document.querySelectorAll("[data-text-animate]").forEach((el) => {
      const textTl = gsap.timeline({ paused: true });
      textTl.fromTo(
        el.querySelectorAll(".split-word"),
        { yPercent: 100 },
        { yPercent: 0, stagger: 0.1, duration: 1.5, ease: "outCustom" },
        0.25
      );
      createScrollTrigger(el, textTl);
    });

    // ─── [data-header-bg] — exact from Celeres ────────────────────────────
    document.querySelectorAll("[data-header-bg]").forEach((el) => {
      const classSetting = el.getAttribute("data-header-bg") || "";
      const targetEl = document.querySelector(".header");
      ScrollTrigger.create({
        trigger: el as Element,
        start: "top 61px",
        end: "bottom top",
        onToggle: ({ isActive }) => {
          if (!targetEl) return;
          if (isActive) {
            targetEl.classList.add(classSetting);
          } else {
            targetEl.classList.remove(classSetting);
          }
        },
      });
    });

    // ─── Header scroll-hide — exact from Celeres ──────────────────────────
    ScrollTrigger.create({
      start: 0,
      end: 99999,
      onUpdate(self) {
        if (!header) return;
        if (header.classList.contains("menu-open")) return;
        const scrolled = self.scroll() > 80;
        if (self.direction === 1 && scrolled && !headerHidden) {
          gsap.to(header, { yPercent: -100, duration: 0.45, ease: "power2.inOut", overwrite: true });
          headerHidden = true;
        } else if (self.direction === -1 && headerHidden) {
          gsap.to(header, { yPercent: 0, duration: 0.45, ease: "power2.out", overwrite: true });
          headerHidden = false;
        }
      },
    });

    // ─── Lazy load helper — exact from Celeres ────────────────────────────
    function handleLazyLoad(config: { lazy?: boolean; timeout?: number } = {}) {
      const lazyImages = gsap.utils.toArray<HTMLImageElement>("img[loading='lazy']");
      const timeout = gsap.delayedCall(config.timeout ?? 1, () => ScrollTrigger.refresh()).pause();
      const lazyMode = config.lazy !== false;
      let imgLoaded = lazyImages.length;
      const onImgLoad = () => {
        if (lazyMode) {
          timeout.restart(true);
        } else {
          imgLoaded--;
          if (!imgLoaded) ScrollTrigger.refresh();
        }
      };
      lazyImages.forEach((img) => {
        if (!lazyMode) img.loading = "eager";
        if (img.naturalWidth) {
          onImgLoad();
        } else {
          img.addEventListener("load", onImgLoad);
        }
      });
    }
    handleLazyLoad({ lazy: false, timeout: 1 });

    // ─── Intro animation — exact from Celeres ─────────────────────────────
    const introTrack = document.querySelector(".intro-track");
    const introTaglineWords = document.querySelectorAll(".tagline .split-word");
    const introTagline = document.querySelectorAll(".tagline .split-line");
    const introVideoFrame = document.querySelector(".intro-video");
    const introVideo = document.querySelector(".intro-video-file");
    const introContent = document.querySelectorAll(".intro-content .split-line");
    const introArrow = document.querySelector(".intro-arrow");

    if (introTrack && introTaglineWords.length) {
      const loadAnimation = gsap.timeline();
      loadAnimation
        .set(introTaglineWords, { yPercent: 100 })
        .set(introVideo, { opacity: 0, scale: 0.8 })
        .to(introTaglineWords, { yPercent: 0, stagger: 0.1, duration: 1.5, ease: "outCustom" }, 0.5)
        .to(introVideo, { opacity: 1, scale: 1, duration: 1.5, ease: "outCustom" }, "<0.5");

      const introAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: introTrack as Element,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      gsap.set(introContent, { yPercent: 100 });
      gsap.set(introArrow, { opacity: 0 });

      introAnimation
        .to(introTagline, { yPercent: -100, duration: 1, stagger: 0.1 })
        .to(introVideo, { width: "100%", height: "100%", y: "0svh", duration: 2 }, "<")
        .to(introVideoFrame, { yPercent: -10, duration: 2 }, "<")
        .to(introContent, { yPercent: 0, duration: 1, stagger: 0.1 }, ">-1")
        .to(introArrow, { opacity: 1, duration: 1 }, "<");
    }

    // ─── Gallery animation — exact from Celeres ───────────────────────────
    const gallery = document.querySelector(".gallery");
    if (gallery) {
      const galleryAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: gallery as Element,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      galleryAnimation
        .fromTo(".gallery-column.one .gallery-image", { scale: 0.4 }, { scale: 1.2 })
        .fromTo(".gallery-column.two .gallery-image", { scale: 1.4 }, { scale: 0.6 }, "<")
        .fromTo(".gallery-column.three .gallery-image", { scale: 0.1 }, { scale: 1 }, "<");
    }

    // ─── Split sideways — exact from Celeres ──────────────────────────────
    const splitSection = document.querySelector("#split-animation");
    const splitSideways = document.querySelector(".split-sideways");
    const splitImage = document.querySelector(".split-image");
    if (splitSection && splitSideways) {
      const splitSectionAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: splitSection as Element,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        },
      });
      splitSectionAnimation
        .to(splitSideways, { xPercent: -100 })
        .to(splitImage, { width: "101%", height: "101%" })
        .to(splitSideways, { xPercent: -200 });
    }

    // ─── Capital image animation — exact from Celeres ─────────────────────
    const capitalTrack = document.querySelector(".capital-image");
    if (capitalTrack) {
      const capitalAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: capitalTrack as Element,
          start: "top center",
          end: "bottom 75%",
          scrub: 1,
        },
      });

      capitalAnimation
        .to(".capital-image-bg", {
          webkitFilter: "blur(5px)",
          filter: "blur(5px)",
          scale: 1.1,
          duration: 1,
          ease: "none",
        })
        .to(
          ".capital-image-front",
          { opacity: 1, scale: 0.4, duration: 1, ease: "none" },
          "<"
        );
    }

    // ─── Carousel — exact horizontalLoop from Celeres ─────────────────────
    const carouselEl = document.querySelector(".carousel");
    if (carouselEl) {
      const slides = gsap.utils.toArray<HTMLElement>(".carousel-slide");
      let activeSlide: HTMLElement | undefined;

      // Override CSS — exact from Celeres
      gsap.set(".carousel", {
        overflow: "visible",
        "scroll-snap-type": "none",
        cursor: "none",
      });

      // Initial blur on all images — exact from Celeres
      gsap.set(".carousel-slide .carousel-image", { webkitFilter: "blur(5px)", filter: "blur(5px)" });

      const loop = horizontalLoop(slides, {
        paused: true,
        paddingRight: 0,
        center: true,
        draggable: true,
        onChange: (slide: HTMLElement) => {
          if (activeSlide) {
            gsap.to(".active .carousel-image", {
              webkitFilter: "blur(5px)",
              filter: "blur(5px)",
              duration: 1.5,
            });
            activeSlide.classList.remove("active");
          }
          slide.classList.add("active");
          activeSlide = slide;

          gsap.timeline().to(".active .carousel-image", {
            webkitFilter: "blur(0px)",
            filter: "blur(0px)",
            ease: "outCustom",
            duration: 0.5,
          }, 0);
        },
      });

      // Click any slide to center it — exact from Celeres
      slides.forEach((slide, i) => {
        slide.addEventListener("click", () =>
          loop.toIndex(i, { duration: 1, ease: "expo" })
        );
      });

      // Centre on initial slide — exact from Celeres
      loop.toIndex(0, { duration: 0 });
    }

    return () => {
      document.removeEventListener("click", handleLinkClick);
      window.removeEventListener("pageshow", handlePageShow);
      if (moveHandler) {
        document.removeEventListener("mousemove", moveHandler);
      }
      if (menuObserver) {
        menuObserver.disconnect();
      }
      ScrollTrigger.getAll().forEach((st) => st.kill());
      tl.kill();
      if (split) split.revert();
    };
  }, []);

  return null;
}

// ─── horizontalLoop — EXACT source from Celeres / GSAP helper ─────────────────
// Source: https://gsap.com/docs/v3/HelperFunctions/helpers/seamlessLoop
// This is the verbatim function from the Celeres HTML, adapted for TypeScript.
type LoopConfig = {
  repeat?: number;
  paused?: boolean;
  speed?: number;
  snap?: number | false;
  paddingRight?: number;
  reversed?: boolean;
  center?: boolean | string;
  draggable?: boolean;
  onChange?: (item: HTMLElement, index: number) => void;
};

type LoopTimeline = gsap.core.Timeline & {
  next: (vars?: gsap.TweenVars) => gsap.core.Tween;
  previous: (vars?: gsap.TweenVars) => gsap.core.Tween;
  current: () => number;
  toIndex: (index: number, vars?: gsap.TweenVars) => gsap.core.Tween | number;
  closestIndex: (setCurrent?: boolean) => number;
  times: number[];
  draggable?: InstanceType<typeof Draggable>;
};

function horizontalLoop(items: HTMLElement[], config: LoopConfig): LoopTimeline {
  let timeline!: LoopTimeline;
  items = gsap.utils.toArray(items);
  config = config || {};

  gsap.context(() => {
    const onChange = config.onChange;
    let lastIndex = 0;
    const tl: LoopTimeline = gsap.timeline({
      repeat: config.repeat,
      onUpdate:
        onChange &&
        function (this: gsap.core.Timeline) {
          const i = (tl as LoopTimeline).closestIndex();
          if (lastIndex !== i) {
            lastIndex = i;
            onChange(items[i], i);
          }
        },
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => { tl.totalTime(tl.rawTime() + tl.duration() * 100); },
    }) as LoopTimeline;

    const length = items.length;
    const startX = items[0].offsetLeft;
    const times: number[] = [];
    const widths: number[] = [];
    const spaceBefore: number[] = [];
    const xPercents: number[] = [];
    let curIndex = 0;
    let indexIsDirty = false;
    const center = config.center;
    const pixelsPerSecond = (config.speed || 1) * 100;
    const snap =
      config.snap === false
        ? (v: number) => v
        : gsap.utils.snap(config.snap || 1);
    let timeOffset = 0;
    const container =
      center === true
        ? items[0].parentNode as HTMLElement
        : (gsap.utils.toArray(center as string)[0] as HTMLElement) ||
          (items[0].parentNode as HTMLElement);
    let totalWidth: number;

    const getTotalWidth = () =>
      items[length - 1].offsetLeft +
      (xPercents[length - 1] / 100) * widths[length - 1] -
      startX +
      spaceBefore[0] +
      items[length - 1].offsetWidth *
        (gsap.getProperty(items[length - 1], "scaleX") as number) +
      (parseFloat(String(config.paddingRight)) || 0);

    const populateWidths = () => {
      let b1 = container.getBoundingClientRect();
      let b2: DOMRect;
      items.forEach((el, i) => {
        widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string);
        xPercents[i] = snap(
          (parseFloat(gsap.getProperty(el, "x", "px") as string) / widths[i]) *
            100 +
            (gsap.getProperty(el, "xPercent") as number)
        );
        b2 = el.getBoundingClientRect();
        spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
        b1 = b2;
      });
      gsap.set(items, { xPercent: (i) => xPercents[i] });
      totalWidth = getTotalWidth();
    };

    let timeWrap: (v: number) => number;

    const populateOffsets = () => {
      timeOffset = center
        ? (tl.duration() * (container.offsetWidth / 2)) / totalWidth
        : 0;
      if (center) {
        times.forEach((t, i) => {
          times[i] = timeWrap(
            tl.labels["label" + i] +
              (tl.duration() * widths[i]) / 2 / totalWidth -
              timeOffset
          );
        });
      }
    };

    const getClosest = (values: number[], value: number, wrap: number) => {
      let i = values.length;
      let closest = 1e10;
      let index = 0;
      while (i--) {
        let d = Math.abs(values[i] - value);
        if (d > wrap / 2) d = wrap - d;
        if (d < closest) {
          closest = d;
          index = i;
        }
      }
      return index;
    };

    const populateTimeline = () => {
      tl.clear();
      for (let i = 0; i < length; i++) {
        const item = items[i];
        const curX = (xPercents[i] / 100) * widths[i];
        const distanceToStart =
          item.offsetLeft + curX - startX + spaceBefore[0];
        const distanceToLoop =
          distanceToStart +
          widths[i] * (gsap.getProperty(item, "scaleX") as number);
        tl.to(
          item,
          {
            xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
            duration: distanceToLoop / pixelsPerSecond,
          },
          0
        )
          .fromTo(
            item,
            {
              xPercent: snap(
                ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
              ),
            },
            {
              xPercent: xPercents[i],
              duration:
                (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
              immediateRender: false,
            },
            distanceToLoop / pixelsPerSecond
          )
          .add("label" + i, distanceToStart / pixelsPerSecond);
        times[i] = distanceToStart / pixelsPerSecond;
      }
      timeWrap = gsap.utils.wrap(0, tl.duration());
    };

    const refresh = (deep?: boolean) => {
      const progress = tl.progress();
      tl.progress(0, true);
      populateWidths();
      if (deep) populateTimeline();
      populateOffsets();
      if (deep && tl.draggable && tl.paused()) {
        tl.time(times[curIndex], true);
      } else {
        tl.progress(progress, true);
      }
    };

    const onResize = () => refresh(true);

    let proxy: HTMLElement;
    gsap.set(items, { x: 0 });
    populateWidths();
    populateTimeline();
    populateOffsets();
    window.addEventListener("resize", onResize);

    function toIndex(index: number, vars?: gsap.TweenVars): gsap.core.Tween | number {
      vars = vars || {};
      if (Math.abs(index - curIndex) > length / 2) {
        index += index > curIndex ? -length : length;
      }
      const newIndex = gsap.utils.wrap(0, length, index);
      let time = times[newIndex];
      if ((time > tl.time()) !== index > curIndex && index !== curIndex) {
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      if (time < 0 || time > tl.duration()) {
        (vars as Record<string, unknown>).modifiers = { time: timeWrap };
      }
      curIndex = newIndex;
      (vars as Record<string, unknown>).overwrite = true;
      gsap.killTweensOf(proxy);
      if ((vars as Record<string, unknown>).duration === 0) {
        tl.time(timeWrap(time));
        return 0;
      }
      return tl.tweenTo(time, vars);
    }

    tl.toIndex = (index, vars) => toIndex(index, vars);

    tl.closestIndex = (setCurrent?: boolean) => {
      const index = getClosest(times, tl.time(), tl.duration());
      if (setCurrent) {
        curIndex = index;
        indexIsDirty = false;
      }
      return index;
    };

    tl.current = () => (indexIsDirty ? tl.closestIndex(true) : curIndex);
    tl.next = (vars) => toIndex(tl.current() + 1, vars) as gsap.core.Tween;
    tl.previous = (vars) => toIndex(tl.current() - 1, vars) as gsap.core.Tween;
    tl.times = times;

    tl.progress(1, true).progress(0, true); // pre-render

    if (config.reversed) {
      tl.vars.onReverseComplete?.call(tl);
      tl.reverse();
    }

    if (config.draggable && typeof Draggable === "function") {
      proxy = document.createElement("div");
      const wrap = gsap.utils.wrap(0, 1);
      let ratio: number,
        startProgress: number,
        lastSnap: number,
        initChangeX: number,
        wasPlaying: boolean;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const dragRef: { current: any } = { current: null };

      const align = () => {
        tl.progress(wrap(startProgress + ((dragRef.current.startX - dragRef.current.x) * ratio)));
      };
      const syncIndex = () => tl.closestIndex(true);

      const draggable = Draggable.create(proxy, {
        trigger: items[0].parentNode as HTMLElement,
        type: "x",
        onPressInit(this: InstanceType<typeof Draggable>) {
          const x = this.x;
          gsap.killTweensOf(tl);
          wasPlaying = !tl.paused();
          tl.pause();
          startProgress = tl.progress();
          refresh();
          ratio = 1 / totalWidth;
          initChangeX = startProgress / -ratio - x;
          gsap.set(proxy, { x: startProgress / -ratio });
        },
        onDrag: align,
        onThrowUpdate: align,
        overshootTolerance: 0,
        inertia: true,
        snap(value: number) {
          if (Math.abs(startProgress / -ratio - dragRef.current.x) < 10) {
            return lastSnap + initChangeX;
          }
          const time = -(value * ratio) * tl.duration();
          const wrappedTime = timeWrap(time);
          const snapTime = times[getClosest(times, wrappedTime, tl.duration())];
          let dif = snapTime - wrappedTime;
          if (Math.abs(dif) > tl.duration() / 2) {
            dif += dif < 0 ? tl.duration() : -tl.duration();
          }
          lastSnap = (time + dif) / tl.duration() / -ratio;
          return lastSnap;
        },
        onRelease() {
          syncIndex();
          if (dragRef.current.isThrowing) indexIsDirty = true;
        },
        onThrowComplete() {
          syncIndex();
          if (wasPlaying) tl.play();
        },
      })[0];

      dragRef.current = draggable;
      tl.draggable = dragRef.current;
    }

    tl.closestIndex(true);
    lastIndex = curIndex;
    if (onChange) onChange(items[curIndex], curIndex);
    timeline = tl;

    return () => window.removeEventListener("resize", onResize);
  });

  return timeline;
}
