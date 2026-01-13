import { ref, onUnmounted } from "vue";
import { gsap } from "gsap";

export function useJourneySlideshow() {
  const currentSlide = ref(0); // Start at 0 for pre-rendering
  const isPlaying = ref(false);
  const isPaused = ref(false);
  let autoPlayTimer = null;
  let timeline = null;
  let isInitialized = false;

  // Journey slides - telling your story
  const slides = [
    {
      id: "intro",
      title: "Hi, I'm Ankit Chhetri",
      subtitle: "Software Engineer with 1.5 years of experience",
      description:
        "Passionate about building AI-powered tools and automating workflows",
      duration: 3500,
    },
    {
      id: "education",
      title: "The Foundation",
      subtitle: "B.Tech Information Technology, CGPA 8.6",
      description: "Sikkim Manipal Institute of Technology (2020-2024)",
      duration: 3500,
    },
    {
      id: "current",
      title: "Current Role",
      subtitle: "Associate Software Engineer @ WebMD",
      description:
        "Developing AI-powered tools to enhance developer efficiency by 40%",
      duration: 3500,
    },
    {
      id: "project-gateway",
      title: "AI Gateway Service",
      subtitle: "Multi-provider AI service with cost tracking & rate limiting",
      description:
        "Built gateway connecting to multiple AI providers with cost tracking and rate limit system for user/application control",
      duration: 3500,
    },
    {
      id: "project-sdlc",
      title: "AI SDLC",
      subtitle: "AI-Powered IDE & Agile Story Generator",
      description:
        "Developed tools for quick task delivery and prompt-ready agile stories for efficient IDE coding",
      duration: 3500,
    },
    {
      id: "project-metrics",
      title: "Productivity Metrics System",
      subtitle: "Org-level metrics dashboard for developer productivity",
      description:
        "Implemented dashboard tracking AI tool usage, stories closed, rework rate, and AI vs non-AI committed code",
      duration: 3500,
    },
    {
      id: "skills",
      title: "Technical Arsenal",
      subtitle:
        "Vue 3 · React · Angular · TypeScript · FastAPI · Django · Flask · Python",
      description:
        "AWS · PostgreSQL · MySQL · DynamoDB · VSCode Extensions · Agentic AI · LangChain · AI Workflow Automation",
      duration: 3500,
    },
    {
      id: "contact",
      title: "Let's Connect",
      subtitle: "ankitchhetri712@gmail.com · (+91) 9474835712",
      description: "Ready to collaborate on innovative AI-powered solutions",
      duration: 3500,
    },
  ];

  const totalSlides = slides.length;

  const createSlideTransition = () => {
    if (timeline) timeline.kill();

    timeline = gsap.timeline({
      defaults: { ease: "power2.out" },
    });

    // Show journey slide container
    timeline.to(
      ".journey-slide-container",
      {
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.25,
      },
      0,
    );

    // Show dark overlay
    timeline.to(
      ".journey-overlay",
      {
        opacity: 1,
        duration: 0.25,
      },
      0,
    );

    // Hide homepage content
    timeline.to(
      [".hero-section", ".project-carousel", ".nav-dots"],
      {
        opacity: 0,
        duration: 0.25,
      },
      0,
    );

    // Animate slide content in
    timeline.fromTo(
      ".journey-content > *",
      {
        opacity: 0,
        y: 15,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.08,
        ease: "power2.out",
      },
      0.15,
    );

    return timeline;
  };

  const goToSlide = (index) => {
    if (index < 0 || index >= totalSlides) return;

    currentSlide.value = index;

    // For slide transitions (not the first slide), we need to re-animate content
    if (timeline) timeline.kill();

    timeline = gsap.timeline({
      defaults: { ease: "power2.out" },
    });

    // Fade out old content
    timeline.to(".journey-content > *", {
      opacity: 0,
      y: -10,
      duration: 0.2,
      stagger: 0.03,
    });

    // Fade in new content
    timeline.fromTo(
      ".journey-content > *",
      {
        opacity: 0,
        y: 15,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.08,
        ease: "power2.out",
      },
      0.25,
    );

    // Clear existing timer
    if (autoPlayTimer) {
      clearTimeout(autoPlayTimer);
      autoPlayTimer = null;
    }

    // Auto-advance if playing and not paused
    if (isPlaying.value && !isPaused.value && index < totalSlides - 1) {
      autoPlayTimer = setTimeout(() => {
        nextSlide();
      }, slides[index].duration);
    }
  };

  const nextSlide = () => {
    if (currentSlide.value < totalSlides - 1) {
      goToSlide(currentSlide.value + 1);
    } else {
      // End of slideshow
      stopSlideshow();
    }
  };

  const previousSlide = () => {
    if (currentSlide.value > 0) {
      goToSlide(currentSlide.value - 1);
    }
  };

  const startSlideshow = () => {
    if (isPlaying.value) return;

    isPlaying.value = true;
    isPaused.value = false;

    // Everything is pre-rendered, just start the animation immediately
    if (!isInitialized) {
      isInitialized = true;
      currentSlide.value = 0; // Ensure we're at slide 0
      createSlideTransition();

      // Auto-advance after duration
      if (currentSlide.value < totalSlides - 1) {
        autoPlayTimer = setTimeout(() => {
          nextSlide();
        }, slides[0].duration);
      }
    } else {
      // Resume from current slide
      goToSlide(currentSlide.value);
    }
  };

  const pauseSlideshow = () => {
    isPaused.value = !isPaused.value;

    if (isPaused.value) {
      // Pause: clear timer
      if (autoPlayTimer) {
        clearTimeout(autoPlayTimer);
        autoPlayTimer = null;
      }
    } else {
      // Resume: restart timer for current slide
      if (currentSlide.value >= 0 && currentSlide.value < totalSlides - 1) {
        autoPlayTimer = setTimeout(() => {
          nextSlide();
        }, slides[currentSlide.value].duration);
      }
    }
  };

  const stopSlideshow = () => {
    isPlaying.value = false;
    isPaused.value = false;

    if (autoPlayTimer) {
      clearTimeout(autoPlayTimer);
      autoPlayTimer = null;
    }

    if (timeline) {
      timeline.kill();
      timeline = null;
    }

    // Animate back to homepage
    const exitTimeline = gsap.timeline({
      defaults: { ease: "power2.inOut" },
    });

    // Fade out journey content
    exitTimeline.to(".journey-content > *", {
      opacity: 0,
      y: -15,
      duration: 0.25,
      stagger: 0.05,
    });

    // Hide journey slide container
    exitTimeline.to(
      ".journey-slide-container",
      {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.3,
      },
      0.2,
    );

    // Hide overlay
    exitTimeline.to(
      ".journey-overlay",
      {
        opacity: 0,
        duration: 0.3,
      },
      0.2,
    );

    // Show homepage content
    exitTimeline.to(
      [".hero-section", ".project-carousel", ".nav-dots"],
      {
        opacity: 1,
        duration: 0.4,
      },
      0.3,
    );

    // Reset to initial state after animation completes
    exitTimeline.call(() => {
      currentSlide.value = 0;
      isInitialized = false;
    });
  };

  onUnmounted(() => {
    if (autoPlayTimer) clearTimeout(autoPlayTimer);
    if (timeline) timeline.kill();
  });

  return {
    currentSlide,
    isPlaying,
    isPaused,
    totalSlides,
    slides,
    startSlideshow,
    pauseSlideshow,
    stopSlideshow,
    goToSlide,
    nextSlide,
    previousSlide,
  };
}
