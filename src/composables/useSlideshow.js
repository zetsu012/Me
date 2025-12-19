import { ref, onUnmounted } from 'vue'
import { gsap } from 'gsap'

export function useSlideshow() {
  const currentSlide = ref(0)
  const isPlaying = ref(false)
  const isPaused = ref(false)
  let slideInterval = null
  let timeline = null

  // Slide configuration: [selector, duration in seconds]
  const slides = [
    { name: 'hero', selector: '.hero-section, .project-carousel', duration: 3 },
    { name: 'projects', selector: '.project-grid', duration: 5 },
    { name: 'about', selector: '.about-section', duration: 6 }
  ]

  const totalSlides = slides.length

  const createTransitionTimeline = (fromIndex, toIndex) => {
    if (timeline) timeline.kill()

    timeline = gsap.timeline({
      defaults: { ease: 'power3.inOut' }
    })

    const fromSlide = slides[fromIndex]
    const toSlide = slides[toIndex]

    // Smoothly fade out current slide
    timeline.to(fromSlide.selector, {
      opacity: 0,
      duration: 0.6,
      pointerEvents: 'none',
      ease: 'power2.in'
    })

    // Show solid dark overlay for readability
    timeline.to('.slideshow-overlay', {
      opacity: 1,
      duration: 0.8
    }, 0)

    // Keep navbar fully visible
    timeline.to('.navbar', {
      opacity: 1,
      duration: 0.6
    }, 0)

    // Fade out nav dots smoothly
    timeline.to('.nav-dots', {
      opacity: 0,
      duration: 0.5
    }, 0)

    // Elegant fade in of next slide with slight scale
    timeline.fromTo(toSlide.selector, {
      opacity: 0,
      scale: 0.98
    }, {
      opacity: 1,
      scale: 1,
      pointerEvents: 'auto',
      duration: 0.8,
      ease: 'power3.out'
    }, 0.6)

    // If moving to projects slide, staggered card animations
    if (toSlide.name === 'projects') {
      timeline.fromTo('.project-card', {
        opacity: 0,
        y: 30,
        scale: 0.95
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: {
          amount: 0.4,
          from: 'start'
        },
        ease: 'power3.out'
      }, 1.0)
    }

    // If moving to about slide, cascade the glass cards elegantly
    if (toSlide.name === 'about') {
      timeline.fromTo('.glass-card', {
        opacity: 0,
        y: 40,
        scale: 0.96
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: {
          amount: 0.6,
          from: 'start',
          grid: 'auto'
        },
        ease: 'power3.out'
      }, 1.0)
    }

    return timeline
  }

  const goToSlide = (index) => {
    if (index === currentSlide.value || index < 0 || index >= totalSlides) return

    createTransitionTimeline(currentSlide.value, index)
    currentSlide.value = index
  }

  const nextSlide = () => {
    const nextIndex = (currentSlide.value + 1) % totalSlides
    goToSlide(nextIndex)
  }

  const previousSlide = () => {
    const prevIndex = (currentSlide.value - 1 + totalSlides) % totalSlides
    goToSlide(prevIndex)
  }

  const startSlideshow = () => {
    if (isPlaying.value) return

    isPlaying.value = true
    isPaused.value = false

    // Start from slide 1 (projects) if we're on slide 0 (hero)
    if (currentSlide.value === 0) {
      goToSlide(1)
      
      // Set interval for auto-advance
      slideInterval = setInterval(() => {
        if (!isPaused.value) {
          nextSlide()
        }
      }, slides[1].duration * 1000)
    }
  }

  const pauseSlideshow = () => {
    isPaused.value = !isPaused.value
  }

  const stopSlideshow = () => {
    isPlaying.value = false
    isPaused.value = false

    if (slideInterval) {
      clearInterval(slideInterval)
      slideInterval = null
    }

    // Kill any running timeline
    if (timeline) {
      timeline.kill()
      timeline = null
    }

    // Return to hero with elegant animation
    if (currentSlide.value !== 0) {
      const exitTimeline = gsap.timeline({
        defaults: { ease: 'power3.inOut' }
      })

      // Fade out current slide with scale
      exitTimeline.to(['.project-grid', '.about-section'], {
        opacity: 0,
        scale: 0.98,
        pointerEvents: 'none',
        duration: 0.6,
        ease: 'power2.in'
      })

      // Reset project cards and glass cards
      exitTimeline.to(['.project-card', '.glass-card'], {
        opacity: 0,
        duration: 0.4
      }, 0)

      // Restore original state smoothly
      exitTimeline.fromTo('.hero-section, .project-carousel', {
        opacity: 0,
        scale: 0.98
      }, {
        opacity: 1,
        scale: 1,
        pointerEvents: 'auto',
        duration: 0.8,
        ease: 'power3.out'
      }, 0.6)

      exitTimeline.to('.navbar', {
        opacity: 1,
        duration: 0.7
      }, 0.6)

      exitTimeline.to('.nav-dots', {
        opacity: 1,
        duration: 0.7
      }, 0.6)

      exitTimeline.to('.slideshow-overlay', {
        opacity: 0,
        duration: 0.8
      }, 0.6)

      // Reset to hero slide
      currentSlide.value = 0
    }
  }

  onUnmounted(() => {
    if (slideInterval) clearInterval(slideInterval)
    if (timeline) timeline.kill()
  })

  return {
    currentSlide,
    isPlaying,
    isPaused,
    totalSlides,
    startSlideshow,
    pauseSlideshow,
    stopSlideshow,
    goToSlide,
    nextSlide,
    previousSlide
  }
}
