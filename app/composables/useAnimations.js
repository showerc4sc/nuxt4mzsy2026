/**
 * 滚动动画组合式函数
 * 用于在元素进入视口时触发动画
 */
export const useScrollAnimation = () => {
  // 存储观察器和元素
  const observers = ref(new Map())
  
  /**
   * 为元素添加滚动动画
   * @param {Ref} elementRef - 元素引用
   * @param {String} animationClass - 动画类名
   * @param {Object} options - 观察器选项
   */
  const addScrollAnimation = (elementRef, animationClass, options = {}) => {
    // 默认选项
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options
    }
    
    // 创建观察器
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 添加动画类
          entry.target.classList.add(animationClass)
          // 动画完成后停止观察
          setTimeout(() => {
            observer.unobserve(entry.target)
          }, 1000)
        }
      })
    }, defaultOptions)
    
    // 等待元素挂载后开始观察
    onMounted(() => {
      if (elementRef.value) {
        observer.observe(elementRef.value)
        observers.value.set(elementRef.value, observer)
      }
    })
    
    // 组件卸载时清理观察器
    onUnmounted(() => {
      if (elementRef.value && observers.value.has(elementRef.value)) {
        observers.value.get(elementRef.value).disconnect()
        observers.value.delete(elementRef.value)
      }
    })
    
    return observer
  }
  
  /**
   * 为多个元素添加滚动动画
   * @param {Ref} elementsRef - 元素引用数组
   * @param {String} animationClass - 动画类名
   * @param {Object} options - 观察器选项
   * @param {Number} stagger - 延迟间隔（毫秒）
   */
  const addStaggeredAnimation = (elementsRef, animationClass, options = {}, stagger = 100) => {
    // 默认选项
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options
    }
    
    // 创建观察器
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // 延迟添加动画类
          setTimeout(() => {
            entry.target.classList.add(animationClass)
          }, index * stagger)
          
          // 动画完成后停止观察
          setTimeout(() => {
            observer.unobserve(entry.target)
          }, 1000 + (index * stagger))
        }
      })
    }, defaultOptions)
    
    // 等待元素挂载后开始观察
    onMounted(() => {
      if (elementsRef.value && elementsRef.value.length > 0) {
        elementsRef.value.forEach(element => {
          if (element) {
            observer.observe(element)
            observers.value.set(element, observer)
          }
        })
      }
    })
    
    // 组件卸载时清理观察器
    onUnmounted(() => {
      if (elementsRef.value) {
        elementsRef.value.forEach(element => {
          if (element && observers.value.has(element)) {
            observers.value.get(element).disconnect()
            observers.value.delete(element)
          }
        })
      }
    })
    
    return observer
  }
  
  /**
   * 清理所有观察器
   */
  const cleanup = () => {
    observers.value.forEach(observer => {
      observer.disconnect()
    })
    observers.value.clear()
  }
  
  return {
    addScrollAnimation,
    addStaggeredAnimation,
    cleanup
  }
}

/**
 * 鼠标跟随效果组合式函数
 * 用于创建鼠标跟随的光效或动画
 */
export const useMouseFollower = () => {
  const mouseX = ref(0)
  const mouseY = ref(0)
  const windowWidth = ref(0)
  const windowHeight = ref(0)
  
  // 更新鼠标位置
  const updateMousePosition = (event) => {
    mouseX.value = event.clientX
    mouseY.value = event.clientY
  }
  
  // 更新窗口尺寸
  const updateWindowSize = () => {
    windowWidth.value = window.innerWidth
    windowHeight.value = window.innerHeight
  }
  
  // 计算鼠标相对于窗口中心的百分比位置
  const mousePercentX = computed(() => {
    return windowWidth.value > 0 ? (mouseX.value / windowWidth.value) * 100 : 50
  })
  
  const mousePercentY = computed(() => {
    return windowHeight.value > 0 ? (mouseY.value / windowHeight.value) * 100 : 50
  })
  
  // 初始化事件监听
  onMounted(() => {
    updateWindowSize()
    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('resize', updateWindowSize)
  })
  
  // 清理事件监听
  onUnmounted(() => {
    window.removeEventListener('mousemove', updateMousePosition)
    window.removeEventListener('resize', updateWindowSize)
  })
  
  return {
    mouseX,
    mouseY,
    mousePercentX,
    mousePercentY
  }
}

/**
 * 视差滚动效果组合式函数
 * 用于创建视差滚动效果
 */
export const useParallax = () => {
  const scrollY = ref(0)
  
  // 更新滚动位置
  const updateScrollPosition = () => {
    scrollY.value = window.scrollY
  }
  
  // 计算视差偏移量
  const getParallaxOffset = (speed = 0.5) => {
    return computed(() => scrollY.value * speed)
  }
  
  // 初始化事件监听
  onMounted(() => {
    updateScrollPosition()
    window.addEventListener('scroll', updateScrollPosition, { passive: true })
  })
  
  // 清理事件监听
  onUnmounted(() => {
    window.removeEventListener('scroll', updateScrollPosition)
  })
  
  return {
    scrollY,
    getParallaxOffset
  }
}

/**
 * 数字递增动画组合式函数
 * 用于创建数字从0递增到目标值的动画效果
 */
export const useNumberAnimation = () => {
  /**
   * 为元素添加数字递增动画
   * @param {HTMLElement} element - 要添加动画的元素
   * @param {Number} targetValue - 目标数值
   * @param {Number} duration - 动画持续时间（毫秒）
   * @param {String} suffix - 数值后缀（如"+"、"%"等）
   */
  const animateNumber = (element, targetValue, duration = 2000, suffix = '') => {
    if (!element) return;
    
    const startTime = Date.now();
    const startValue = 0;
    
    const updateNumber = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // 使用缓动函数
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);
      
      // 更新元素内容
      element.textContent = currentValue + suffix;
      
      // 继续动画直到完成
      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      }
    };
    
    // 开始动画
    requestAnimationFrame(updateNumber);
  };
  
  /**
   * 为多个数字元素添加递增动画
   * @param {NodeList} elements - 数字元素列表
   * @param {Array} targetValues - 目标数值数组
   * @param {Array} suffixes - 数值后缀数组
   * @param {Number} stagger - 延迟间隔（毫秒）
   */
  const animateNumbers = (elements, targetValues, suffixes = [], stagger = 200) => {
    if (!elements || elements.length === 0) return;
    
    elements.forEach((element, index) => {
      const targetValue = targetValues[index] || 50;
      const suffix = suffixes[index] || '';
      
      // 延迟启动动画
      setTimeout(() => {
        animateNumber(element, targetValue, 2000, suffix);
      }, index * stagger);
    });
  };
  
  return {
    animateNumber,
    animateNumbers
  };
}

/**
 * 高级动画效果组合式函数
 * 用于创建更复杂的动画效果
 */
export const useAdvancedAnimations = () => {
  /**
   * 文字逐字显示动画
   * @param {HTMLElement} element - 要添加动画的元素
   * @param {String} text - 要显示的文字
   * @param {Number} speed - 每个字符的显示速度（毫秒）
   */
  const typewriterEffect = (element, text, speed = 100) => {
    if (!element) return;
    
    element.textContent = '';
    let index = 0;
    
    const typeChar = () => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(typeChar, speed);
      }
    };
    
    typeChar();
  };
  
  /**
   * 波浪动画效果
   * @param {NodeList} elements - 要添加动画的元素列表
   * @param {Number} delay - 延迟间隔（毫秒）
   * @param {String} animationClass - 动画类名
   */
  const waveAnimation = (elements, delay = 100, animationClass = 'animate-stagger-fade') => {
    if (!elements || elements.length === 0) return;
    
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add(animationClass);
      }, index * delay);
    });
  };
  
  /**
   * 交错动画效果
   * @param {NodeList} elements - 要添加动画的元素列表
   * @param {String} animationClass - 动画类名
   * @param {Object} options - 配置选项
   */
  const staggerAnimation = (elements, animationClass, options = {}) => {
    const {
      delay = 100,
      threshold = 0.1,
      reverse = false
    } = options;
    
    if (!elements || elements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const index = Array.from(elements).indexOf(element);
          
          if (reverse) {
            setTimeout(() => {
              element.classList.add(animationClass);
            }, (elements.length - index - 1) * delay);
          } else {
            setTimeout(() => {
              element.classList.add(animationClass);
            }, index * delay);
          }
          
          observer.unobserve(element);
        }
      });
    }, { threshold });
    
    elements.forEach(element => {
      observer.observe(element);
    });
  };
  
  /**
   * 视差滚动效果（改进版）
   * @param {HTMLElement} element - 要添加效果的元素
   * @param {Number} speed - 滚动速度
   * @param {String} direction - 滚动方向 ('x', 'y', 'both')
   */
  const parallaxScroll = (element, speed = 0.5, direction = 'y') => {
    if (!element) return;
    
    const updateParallax = () => {
      const rect = element.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      
      if (direction === 'y' || direction === 'both') {
        const yPos = -(rect.top * speed);
        element.style.transform = `translateY(${yPos}px)`;
      }
      
      if (direction === 'x' || direction === 'both') {
        const xPos = -(rect.left * speed);
        element.style.transform = `translateX(${xPos}px)`;
      }
    };
    
    // 初始更新
    updateParallax();
    
    // 添加滚动监听
    window.addEventListener('scroll', updateParallax, { passive: true });
    
    // 返回清理函数
    return () => {
      window.removeEventListener('scroll', updateParallax);
    };
  };
  
  /**
   * 鼠标跟随效果（改进版）
   * @param {HTMLElement} element - 要添加效果的元素
   * @param {Number} speed - 跟随速度
   * @param {Number} maxDistance - 最大跟随距离
   */
  const mouseFollow = (element, speed = 0.1, maxDistance = 50) => {
    if (!element) return;
    
    const updateMouseFollow = (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = mouseX - centerX;
      const deltaY = mouseY - centerY;
      
      // 限制最大距离
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const limitedDistance = Math.min(distance, maxDistance);
      const ratio = limitedDistance / distance;
      
      const finalDeltaX = deltaX * ratio * speed;
      const finalDeltaY = deltaY * ratio * speed;
      
      element.style.transform = `translate(${finalDeltaX}px, ${finalDeltaY}px)`;
    };
    
    // 添加鼠标移动监听
    window.addEventListener('mousemove', updateMouseFollow, { passive: true });
    
    // 返回清理函数
    return () => {
      window.removeEventListener('mousemove', updateMouseFollow);
    };
  };
  
  /**
   * 滚动进度指示器
   * @param {HTMLElement} element - 进度条元素
   */
  const scrollProgress = (element) => {
    if (!element) return;
    
    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      element.style.width = `${scrollPercent}%`;
    };
    
    // 初始更新
    updateProgress();
    
    // 添加滚动监听
    window.addEventListener('scroll', updateProgress, { passive: true });
    
    // 返回清理函数
    return () => {
      window.removeEventListener('scroll', updateProgress);
    };
  };
  
  /**
   * 3D翻转动画效果
   * @param {HTMLElement} element - 要添加动画的元素
   * @param {String} axis - 翻转轴 ('x', 'y', 'z')
   * @param {Number} duration - 动画持续时间（毫秒）
   */
  const flip3D = (element, axis = 'y', duration = 1500) => {
    if (!element) return;
    
    // 设置3D变换样式
    element.style.transformStyle = 'preserve-3d';
    element.style.backfaceVisibility = 'hidden';
    
    // 根据轴设置翻转动画
    const axisMap = {
      'x': 'rotateX',
      'y': 'rotateY',
      'z': 'rotateZ'
    };
    
    const transform = axisMap[axis] || 'rotateY';
    
    // 应用动画
    element.style.animation = `flip-3d ${duration}ms ease-out forwards`;
    
    // 创建关键帧
    const styleSheet = document.styleSheets[0];
    const keyframes = `
      @keyframes flip-3d {
        0% {
          transform: perspective(1000px) ${transform}(0deg);
          opacity: 0.8;
        }
        50% {
          transform: perspective(1000px) ${transform}(90deg);
          opacity: 0.5;
        }
        100% {
          transform: perspective(1000px) ${transform}(0deg);
          opacity: 1;
        }
      }
    `;
    
    // 添加关键帧到样式表
    try {
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    } catch (e) {
      console.error('Failed to insert keyframes:', e);
    }
  };
  
  /**
   * 磁吸效果
   * @param {HTMLElement} element - 要添加效果的元素
   * @param {Number} strength - 磁吸强度
   * @param {Number} maxDistance - 最大影响距离
   */
  const magneticEffect = (element, strength = 0.3, maxDistance = 100) => {
    if (!element) return;
    
    const updateMagneticEffect = (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = mouseX - centerX;
      const deltaY = mouseY - centerY;
      
      // 计算距离
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // 如果在最大影响距离内
      if (distance < maxDistance) {
        // 计算磁吸力（距离越近，力越大）
        const force = (1 - distance / maxDistance) * strength;
        
        // 应用变换
        const translateX = deltaX * force;
        const translateY = deltaY * force;
        const rotateX = (deltaY / maxDistance) * 5 * force;
        const rotateY = (deltaX / maxDistance) * 5 * force;
        
        element.style.transform = `translate(${translateX}px, ${translateY}px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(${1 + force * 0.05})`;
      } else {
        // 恢复原始状态
        element.style.transform = '';
      }
    };
    
    // 添加鼠标移动监听
    window.addEventListener('mousemove', updateMagneticEffect, { passive: true });
    
    // 返回清理函数
    return () => {
      window.removeEventListener('mousemove', updateMagneticEffect);
    };
  };
  
  /**
   * 视差层叠效果
   * @param {NodeList} elements - 要添加效果的元素列表
   * @param {Array} depths - 每个元素的深度值数组
   * @param {Number} speed - 滚动速度
   */
  const parallaxLayers = (elements, depths = [], speed = 0.5) => {
    if (!elements || elements.length === 0) return;
    
    const updateParallaxLayers = () => {
      const scrolled = window.pageYOffset;
      
      elements.forEach((element, index) => {
        if (!element) return;
        
        const depth = depths[index] || (index + 1) * 10;
        const yPos = -(scrolled * speed * (depth / 10));
        
        element.style.transform = `translateZ(${depth}px) translateY(${yPos}px)`;
        element.style.zIndex = depth;
      });
    };
    
    // 初始更新
    updateParallaxLayers();
    
    // 添加滚动监听
    window.addEventListener('scroll', updateParallaxLayers, { passive: true });
    
    // 返回清理函数
    return () => {
      window.removeEventListener('scroll', updateParallaxLayers);
    };
  };
  
  /**
   * 粒子效果
   * @param {HTMLElement} container - 容器元素
   * @param {Number} count - 粒子数量
   * @param {Object} options - 粒子选项
   */
  const particleEffect = (container, count = 20, options = {}) => {
    if (!container) return;
    
    const {
      size = 4,
      color = 'rgba(34, 197, 94, 0.6)',
      duration = 3000,
      spread = 100
    } = options;
    
    // 创建粒子容器
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.position = 'absolute';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.overflow = 'hidden';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '1';
    
    // 添加到容器
    container.style.position = 'relative';
    container.appendChild(particleContainer);
    
    // 创建粒子
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.backgroundColor = color;
      particle.style.borderRadius = '50%';
      particle.style.position = 'absolute';
      
      // 随机位置
      const randomX = Math.random() * 100;
      const randomY = Math.random() * 100;
      particle.style.left = `${randomX}%`;
      particle.style.top = `${randomY}%`;
      
      // 随机延迟
      const delay = Math.random() * duration;
      particle.style.animationDelay = `${delay}ms`;
      
      // 添加动画
      particle.style.animation = `particle-float ${duration}ms ease-out forwards`;
      
      // 添加到容器
      particleContainer.appendChild(particle);
    }
    
    // 返回清理函数
    return () => {
      if (container.contains(particleContainer)) {
        container.removeChild(particleContainer);
      }
    };
  };
  
  /**
   * 故障效果
   * @param {HTMLElement} element - 要添加效果的元素
   * @param {String} text - 要显示的文字
   * @param {Number} intensity - 故障强度 (0-1)
   */
  const glitchEffect = (element, text, intensity = 0.5) => {
    if (!element) return;
    
    // 设置原始文本
    element.textContent = text;
    element.setAttribute('data-text', text);
    element.className += ' glitch-effect';
    
    // 随机触发故障效果
    const triggerGlitch = () => {
      if (Math.random() < intensity) {
        element.classList.add('animate-glitch-effect');
        
        // 随机持续时间
        const duration = 100 + Math.random() * 400;
        setTimeout(() => {
          element.classList.remove('animate-glitch-effect');
        }, duration);
      }
    };
    
    // 定期触发
    const interval = setInterval(triggerGlitch, 2000 + Math.random() * 3000);
    
    // 返回清理函数
    return () => {
      clearInterval(interval);
      element.classList.remove('glitch-effect', 'animate-glitch-effect');
    };
  };
  
  return {
    typewriterEffect,
    waveAnimation,
    staggerAnimation,
    parallaxScroll,
    mouseFollow,
    scrollProgress,
    flip3D,
    magneticEffect,
    parallaxLayers,
    particleEffect,
    glitchEffect
  };
}