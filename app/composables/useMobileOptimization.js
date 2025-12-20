/**
 * 移动设备动画优化组合式函数
 * 用于检测设备类型并优化动画性能
 */
export const useMobileOptimization = () => {
  // 检测是否为移动设备
  const isMobile = ref(false)
  const isTablet = ref(false)
  const isDesktop = ref(true)
  const devicePerformance = ref('high') // 'low', 'medium', 'high'
  
  // 检测设备类型和性能
  const detectDevice = () => {
    if (process.client) {
      // 检测用户代理
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
      
      // 检测屏幕尺寸
      const screenWidth = window.innerWidth
      const screenHeight = window.innerHeight
      
      // 检测设备性能
      const hardwareConcurrency = navigator.hardwareConcurrency || 4
      const deviceMemory = navigator.deviceMemory || 4
      
      // 判断设备类型
      if (isMobileDevice || screenWidth < 768) {
        isMobile.value = true
        isTablet.value = false
        isDesktop.value = false
      } else if (screenWidth < 1024) {
        isMobile.value = false
        isTablet.value = true
        isDesktop.value = false
      } else {
        isMobile.value = false
        isTablet.value = false
        isDesktop.value = true
      }
      
      // 判断设备性能
      if (hardwareConcurrency <= 2 || deviceMemory <= 2) {
        devicePerformance.value = 'low'
      } else if (hardwareConcurrency <= 4 || deviceMemory <= 4) {
        devicePerformance.value = 'medium'
      } else {
        devicePerformance.value = 'high'
      }
    }
  }
  
  // 根据设备类型获取动画配置
  const getAnimationConfig = (defaultConfig = {}) => {
    const baseConfig = {
      // 默认配置
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      duration: 1000,
      easing: 'ease-out',
      ...defaultConfig
    }
    
    // 移动设备优化
    if (isMobile.value) {
      return {
        ...baseConfig,
        // 降低阈值，使动画更早触发
        threshold: Math.max(0.05, baseConfig.threshold - 0.05),
        // 减少动画持续时间
        duration: Math.min(600, baseConfig.duration),
        // 使用更简单的缓动函数
        easing: 'ease-out',
        // 禁用一些高消耗的动画
        disableParallax: devicePerformance.value === 'low',
        disableParticles: devicePerformance.value !== 'high',
        disableGlitch: true,
        // 减少动画数量
        reducedAnimations: devicePerformance.value === 'low'
      }
    }
    
    // 平板设备优化
    if (isTablet.value) {
      return {
        ...baseConfig,
        threshold: Math.max(0.08, baseConfig.threshold - 0.02),
        duration: Math.min(800, baseConfig.duration),
        disableParallax: devicePerformance.value === 'low',
        disableParticles: devicePerformance.value === 'low',
        disableGlitch: false,
        reducedAnimations: false
      }
    }
    
    // 桌面设备使用默认配置
    return baseConfig
  }
  
  // 优化的滚动动画函数
  const addOptimizedScrollAnimation = (element, animationClass, options = {}) => {
    const config = getAnimationConfig(options)
    
    // 如果设备性能低，禁用复杂动画
    if (config.reducedAnimations) {
      // 使用更简单的动画类
      const simpleAnimationClass = animationClass.replace('animate-', 'animate-simple-')
      if (document.querySelector(`.${simpleAnimationClass}`)) {
        animationClass = simpleAnimationClass
      }
    }
    
    // 创建观察器
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 添加动画类
          entry.target.classList.add(animationClass)
          
          // 动画完成后停止观察
          const animationDuration = config.duration || 1000
          setTimeout(() => {
            observer.unobserve(entry.target)
          }, animationDuration)
        }
      })
    }, {
      threshold: config.threshold,
      rootMargin: config.rootMargin
    })
    
    // 开始观察
    if (element) {
      observer.observe(element)
    }
    
    // 返回清理函数
    return () => {
      observer.disconnect()
    }
  }
  
  // 优化的视差滚动函数
  const addOptimizedParallax = (element, speed = 0.5, options = {}) => {
    const config = getAnimationConfig(options)
    
    // 如果禁用视差，直接返回
    if (config.disableParallax) {
      return () => {}
    }
    
    // 降低视差强度
    const optimizedSpeed = isMobile.value ? speed * 0.5 : speed
    
    let ticking = false
    
    const updateParallax = () => {
      const scrolled = window.pageYOffset
      const yPos = -(scrolled * optimizedSpeed)
      
      element.style.transform = `translateY(${yPos}px)`
      ticking = false
    }
    
    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax)
        ticking = true
      }
    }
    
    // 添加滚动监听
    window.addEventListener('scroll', requestTick, { passive: true })
    
    // 返回清理函数
    return () => {
      window.removeEventListener('scroll', requestTick)
    }
  }
  
  // 优化的粒子效果函数
  const addOptimizedParticles = (container, options = {}) => {
    const config = getAnimationConfig(options)
    
    // 如果禁用粒子，直接返回
    if (config.disableParticles) {
      return () => {}
    }
    
    // 减少粒子数量
    const count = isMobile.value ? Math.floor((options.count || 20) * 0.4) : options.count || 20
    
    // 创建粒子容器
    const particleContainer = document.createElement('div')
    particleContainer.className = 'particle-container'
    particleContainer.style.position = 'absolute'
    particleContainer.style.top = '0'
    particleContainer.style.left = '0'
    particleContainer.style.width = '100%'
    particleContainer.style.height = '100%'
    particleContainer.style.overflow = 'hidden'
    particleContainer.style.pointerEvents = 'none'
    particleContainer.style.zIndex = '1'
    
    // 添加到容器
    container.style.position = 'relative'
    container.appendChild(particleContainer)
    
    // 创建粒子
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'
      particle.style.width = `${options.size || 4}px`
      particle.style.height = `${options.size || 4}px`
      particle.style.backgroundColor = options.color || 'rgba(34, 197, 94, 0.6)'
      particle.style.borderRadius = '50%'
      particle.style.position = 'absolute'
      
      // 随机位置
      const randomX = Math.random() * 100
      const randomY = Math.random() * 100
      particle.style.left = `${randomX}%`
      particle.style.top = `${randomY}%`
      
      // 随机延迟
      const delay = Math.random() * (options.duration || 3000)
      particle.style.animationDelay = `${delay}ms`
      
      // 添加动画
      particle.style.animation = `particle-float ${options.duration || 3000}ms ease-out forwards`
      
      // 添加到容器
      particleContainer.appendChild(particle)
    }
    
    // 返回清理函数
    return () => {
      if (container.contains(particleContainer)) {
        container.removeChild(particleContainer)
      }
    }
  }
  
  // 优化的磁吸效果函数
  const addOptimizedMagneticEffect = (element, strength = 0.3, maxDistance = 100) => {
    // 在移动设备上禁用磁吸效果
    if (isMobile.value) {
      return () => {}
    }
    
    // 降低磁吸强度
    const optimizedStrength = isTablet.value ? strength * 0.7 : strength
    
    const updateMagneticEffect = (event) => {
      const mouseX = event.clientX
      const mouseY = event.clientY
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const deltaX = mouseX - centerX
      const deltaY = mouseY - centerY
      
      // 计算距离
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      
      // 如果在最大影响距离内
      if (distance < maxDistance) {
        // 计算磁吸力（距离越近，力越大）
        const force = (1 - distance / maxDistance) * optimizedStrength
        
        // 应用变换
        const translateX = deltaX * force
        const translateY = deltaY * force
        const rotateX = (deltaY / maxDistance) * 5 * force
        const rotateY = (deltaX / maxDistance) * 5 * force
        
        element.style.transform = `translate(${translateX}px, ${translateY}px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(${1 + force * 0.05})`
      } else {
        // 恢复原始状态
        element.style.transform = ''
      }
    }
    
    // 添加鼠标移动监听
    window.addEventListener('mousemove', updateMagneticEffect, { passive: true })
    
    // 返回清理函数
    return () => {
      window.removeEventListener('mousemove', updateMagneticEffect)
    }
  }
  
  // 优化的3D翻转效果函数
  const addOptimizedFlip3D = (element, axis = 'y', duration = 1500) => {
    const config = getAnimationConfig()
    
    // 在低性能设备上禁用3D翻转
    if (config.reducedAnimations) {
      return
    }
    
    // 减少动画持续时间
    const optimizedDuration = Math.min(duration, config.duration)
    
    // 设置3D变换样式
    element.style.transformStyle = 'preserve-3d'
    element.style.backfaceVisibility = 'hidden'
    
    // 根据轴设置翻转动画
    const axisMap = {
      'x': 'rotateX',
      'y': 'rotateY',
      'z': 'rotateZ'
    }
    
    const transform = axisMap[axis] || 'rotateY'
    
    // 应用动画
    element.style.animation = `flip-3d ${optimizedDuration}ms ease-out forwards`
  }
  
  // 初始化设备检测
  onMounted(() => {
    detectDevice()
    
    // 监听窗口大小变化
    window.addEventListener('resize', detectDevice)
  })
  
  onUnmounted(() => {
    window.removeEventListener('resize', detectDevice)
  })
  
  return {
    isMobile: readonly(isMobile),
    isTablet: readonly(isTablet),
    isDesktop: readonly(isDesktop),
    devicePerformance: readonly(devicePerformance),
    detectDevice,
    getAnimationConfig,
    addOptimizedScrollAnimation,
    addOptimizedParallax,
    addOptimizedParticles,
    addOptimizedMagneticEffect,
    addOptimizedFlip3D
  }
}