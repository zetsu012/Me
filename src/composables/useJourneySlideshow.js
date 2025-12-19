import { ref, onUnmounted } from 'vue'
import { gsap } from 'gsap'

export function useJourneySlideshow() {
  const currentSlide = ref(-1) // -1 means not started
  const isPlaying = ref(false)
  const isPaused = ref(false)
  let autoPlayTimer = null
  let timeline = null

  // Journey slides - telling your story
  const slides = [
    {
      id: 'intro',
      title: 'Hi, I\'m Ankit Chhetri',
      subtitle: 'Software Engineer with 1.5 years of experience',
      description: 'Passionate about building AI-powered tools and automating workflows',
      duration: 3500
    },
    {
      id: 'education',
      title: 'The Foundation',
      subtitle: 'B.Tech Information Technology, CGPA 8.6',
      description: 'Sikkim Manipal Institute of Technology (2020-2024)',
      duration: 3500
    },
    {
      id: 'research',
      title: 'Research & Learning',
      subtitle: 'NIT Raipur Research Intern',
      description: 'Comparative Analysis on Transformer Models using Sentiment Analysis',
      duration: 3500
    },
    {
      id: 'internship',
      title: 'First Professional Experience',
      subtitle: 'Full Stack Developer Intern @ NIC',
      description: 'Built eService applications with Angular & Django, focused on security',
      duration: 3500
    },
    {
      id: 'current',
      title: 'Current Role',
      subtitle: 'Associate Software Engineer @ WebMD',
      description: 'Developing AI-powered tools to enhance developer efficiency by 40%',
      duration: 3500
    },
    {
      id: 'projects',
      title: 'Building Innovation',
      subtitle: 'AI-Powered IDE & Agile Story Generator',
      description: 'Forked VSCode/Cline with custom AI workflow automation',
      duration: 3500
    },
    {
      id: 'skills',
      title: 'Tech Stack',
      subtitle: 'Vue 3 · React · Angular · FastAPI · Django · AWS',
      description: 'VSCode Extension Development · AI Integration · Full Stack',
      duration: 3500
    },
    {
      id: 'contact',
      title: 'Let\'s Connect',
      subtitle: 'ankitchhetri712@gmail.com · (+91) 9474835712',
      description: 'Ready to collaborate on innovative AI-powered solutions',
      duration: 3500
    }
  ]

  const totalSlides = slides.length

  const createSlideTransition = (toIndex) => {
    if (timeline) timeline.kill()

    timeline = gsap.timeline({
      defaults: { ease: 'power2.out' }
    })

    // Show journey slide container
    timeline.to('.journey-slide-container', {
      opacity: 1,
      pointerEvents: 'auto',
      duration: 0.3
    }, 0)

    // Show dark overlay
    timeline.to('.journey-overlay', {
      opacity: 1,
      duration: 0.3
    }, 0)

    // Hide homepage content
    timeline.to(['.hero-section', '.project-carousel', '.navbar', '.nav-dots'], {
      opacity: 0,
      duration: 0.3
    }, 0)

    // Animate slide content in
    timeline.fromTo('.journey-content > *', {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: 'power2.out'
    }, 0.3)

    return timeline
  }

  const goToSlide = (index) => {
    if (index < 0 || index >= totalSlides) return

    currentSlide.value = index
    createSlideTransition(index)

    // Clear existing timer
    if (autoPlayTimer) {
      clearTimeout(autoPlayTimer)
      autoPlayTimer = null
    }

    // Auto-advance if playing and not paused
    if (isPlaying.value && !isPaused.value && index < totalSlides - 1) {
      autoPlayTimer = setTimeout(() => {
        nextSlide()
      }, slides[index].duration)
    }
  }

  const nextSlide = () => {
    if (currentSlide.value < totalSlides - 1) {
      goToSlide(currentSlide.value + 1)
    } else {
      // End of slideshow
      stopSlideshow()
    }
  }

  const previousSlide = () => {
    if (currentSlide.value > 0) {
      goToSlide(currentSlide.value - 1)
    }
  }

  const startSlideshow = () => {
    if (isPlaying.value) return

    isPlaying.value = true
    isPaused.value = false
    goToSlide(0)
  }

  const pauseSlideshow = () => {
    isPaused.value = !isPaused.value

    if (isPaused.value) {
      // Pause: clear timer
      if (autoPlayTimer) {
        clearTimeout(autoPlayTimer)
        autoPlayTimer = null
      }
    } else {
      // Resume: restart timer for current slide
      if (currentSlide.value >= 0 && currentSlide.value < totalSlides - 1) {
        autoPlayTimer = setTimeout(() => {
          nextSlide()
        }, slides[currentSlide.value].duration)
      }
    }
  }

  const stopSlideshow = () => {
    isPlaying.value = false
    isPaused.value = false

    if (autoPlayTimer) {
      clearTimeout(autoPlayTimer)
      autoPlayTimer = null
    }

    if (timeline) {
      timeline.kill()
      timeline = null
    }

    // Animate back to homepage
    const exitTimeline = gsap.timeline({
      defaults: { ease: 'power2.inOut' }
    })

    // Fade out journey content
    exitTimeline.to('.journey-content > *', {
      opacity: 0,
      y: -15,
      duration: 0.25,
      stagger: 0.05
    })

    // Hide journey slide container
    exitTimeline.to('.journey-slide-container', {
      opacity: 0,
      pointerEvents: 'none',
      duration: 0.3
    }, 0.2)

    // Hide overlay
    exitTimeline.to('.journey-overlay', {
      opacity: 0,
      duration: 0.3
    }, 0.2)

    // Show homepage content
    exitTimeline.to(['.hero-section', '.project-carousel', '.navbar', '.nav-dots'], {
      opacity: 1,
      duration: 0.4
    }, 0.3)

    // Reset to initial state after animation completes
    exitTimeline.call(() => {
      currentSlide.value = -1
    })
  }

  onUnmounted(() => {
    if (autoPlayTimer) clearTimeout(autoPlayTimer)
    if (timeline) timeline.kill()
  })

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
    previousSlide
  }
}
