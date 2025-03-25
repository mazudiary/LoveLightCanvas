// script.js

// Common settings for heart animation
const settings = {
  particles: {
      length: 10000,
      duration: 4,
      velocity: 80,
      effect: -1.3,
      size: 8,
  },
};

// Heart text fade-in
document.addEventListener('DOMContentLoaded', () => {
  const heartText = document.getElementById('heart-text');
  setTimeout(() => {
      heartText.style.opacity = '1';
  }, 5000);
});

const words = [
  { word: 'love', phrase: 'You are my everything.' },
  { word: 'adore', phrase: 'You fill my heart with joy.' },
  { word: 'cherish', phrase: 'You are my greatest treasure.' },
  { word: 'miss', phrase: 'You are always on my mind.' },
  { word: 'need', phrase: 'You complete me.' },
  { word: 'want', phrase: 'You are my deepest desire.' },
  { word: 'treasure', phrase: 'You are worth more than gold.' },
  { word: 'crave', phrase: 'You are my sweetest longing.' },
  { word: 'desire', phrase: 'You set my heart ablaze.' },
  { word: 'yearn', phrase: 'You are my endless wish.' },
  { word: 'worship', phrase: 'You are my sacred love.' },
  { word: 'fancy', phrase: 'You captivate my every thought.' },
  { word: 'covet', phrase: 'You are my heart’s prize.' },
  { word: 'embrace', phrase: 'You are my warmest hug.' },
  { word: 'dream', phrase: 'You are my sweetest fantasy.' },
  { word: 'long', phrase: 'You are my soul’s call.' },
  { word: 'admire', phrase: 'You are my shining star.' },
  { word: 'devote', phrase: 'You have all of me.' },
  { word: 'enchant', phrase: 'You weave magic in my life.' },
  { word: 'swoon for', phrase: 'You make my heart race.' },
  { word: 'moonbeam', phrase: 'You light up my darkest nights.' },
  { word: 'glow', phrase: 'You make my heart shine.' },
  { word: 'breathe', phrase: 'You are my every breath.' },
  { word: 'stargaze', phrase: 'You are the wonder in my sky.' },
  { word: 'anchor in', phrase: 'You keep me steady.' },
  { word: 'blossom for', phrase: 'You make me bloom with love.' },
  { word: 'melt into', phrase: 'You make me soft and warm.' },
  { word: 'drift into', phrase: 'You pull me into love like a gentle tide.' },
  { word: 'nestle in', phrase: 'You are my safe place.' },
  { word: 'tingle for', phrase: 'You send shivers through me.' },
  { word: 'wander to', phrase: 'No matter where I go, my heart finds you.' },
  { word: 'engrave', phrase: 'You are carved into my soul.' },
  { word: 'flutter for', phrase: 'You make my heart dance like butterfly wings.' },
  { word: 'drown in', phrase: 'Your love is an ocean I never want to leave.' },
  { word: 'hum', phrase: 'You are the melody in my heart.' },
  { word: 'unravel for', phrase: 'You make me feel vulnerable in the best way.' },
  { word: 'sip', phrase: 'Like the sweetest drink, I savor you.' },
  { word: 'ignite for', phrase: 'You set my soul on fire.' },
  { word: 'linger in', phrase: 'Even apart, my love stays with you.' },
  { word: 'echo', phrase: 'Your love is a sound that never fades.' },
  { word: 'drizzle for', phrase: 'Like gentle rain, my love never stops.' },
  { word: 'twinkle for', phrase: 'You make my soul sparkle.' },
  { word: 'flicker for', phrase: 'You are the flame that keeps me warm.' },
  { word: 'glide into', phrase: 'Loving you feels effortless.' },
  { word: 'dew', phrase: 'You refresh my soul like morning mist.' },
  { word: 'thread into', phrase: 'Our souls are woven together.' },
  { word: 'ember', phrase: 'Even in quiet, my love for you glows.' },
  { word: 'tangle with', phrase: 'Our hearts are beautifully intertwined.' },
  { word: 'whisper', phrase: 'Your name is my heart’s softest sound.' }
];

// RequestAnimationFrame polyfill
function requestAnimationFramePolyfill() {
  var b = 0;
  var c = ["ms", "moz", "webkit", "o"];
  for (var a = 0; a < c.length && !window.requestAnimationFrame; ++a) {
      window.requestAnimationFrame = window[c[a] + "RequestAnimationFrame"];
      window.cancelAnimationFrame = window[c[a] + "CancelAnimationFrame"] || window[c[a] + "CancelRequestAnimationFrame"];
  }
  if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function(h, e) {
          var d = new Date().getTime();
          var f = Math.max(0, 16 - (d - b));
          var g = window.setTimeout(function() { h(d + f); }, f);
          b = d + f;
          return g;
      };
  }
  if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function(d) { clearTimeout(d); };
  }
}

// DOM ready
document.addEventListener('DOMContentLoaded', function() {
  let isHeartActive = true;
  const canvas = document.getElementById('pinkboard');
  const heartText = document.getElementById('heart-text');
  const message = document.getElementById('message');
  const phrase = document.getElementById('phrase');
  const audio = document.getElementById('bgmusic');

  // Heart animation
  var Point = (function() {
      function Point(x, y) {
          this.x = (typeof x !== 'undefined') ? x : 0;
          this.y = (typeof y !== 'undefined') ? y : 0;
      }
      Point.prototype.clone = function() {
          return new Point(this.x, this.y);
      };
      Point.prototype.length = function(length) {
          if (typeof length == 'undefined') return Math.sqrt(this.x * this.x + this.y * this.y);
          this.normalize();
          this.x *= length;
          this.y *= length;
          return this;
      };
      Point.prototype.normalize = function() {
          var length = this.length();
          this.x /= length;
          this.y /= length;
          return this;
      };
      return Point;
  })();

  var Particle = (function() {
      function Particle() {
          this.position = new Point();
          this.velocity = new Point();
          this.acceleration = new Point();
          this.age = 0;
      }
      Particle.prototype.initialize = function(x, y, dx, dy) {
          this.position.x = x;
          this.position.y = y;
          this.velocity.x = dx;
          this.velocity.y = dy;
          this.acceleration.x = dx * settings.particles.effect;
          this.acceleration.y = dy * settings.particles.effect;
          this.age = 0;
      };
      Particle.prototype.update = function(deltaTime) {
          this.position.x += this.velocity.x * deltaTime;
          this.position.y += this.velocity.y * deltaTime;
          this.velocity.x += this.acceleration.x * deltaTime;
          this.velocity.y += this.acceleration.y * deltaTime;
          this.age += deltaTime;
      };
      Particle.prototype.draw = function(context, image) {
          function ease(t) {
              return (--t) * t * t + 1;
          }
          var size = image.width * ease(this.age / settings.particles.duration);
          context.globalAlpha = 1 - this.age / settings.particles.duration;
          context.drawImage(image, this.position.x - size / 2, this.position.y - size / 2, size, size);
      };
      return Particle;
  })();

  var ParticlePool = (function() {
      var particles, firstActive = 0, firstFree = 0, duration = settings.particles.duration;

      function ParticlePool(length) {
          particles = new Array(length);
          for (var i = 0; i < particles.length; i++) particles[i] = new Particle();
      }
      ParticlePool.prototype.add = function(x, y, dx, dy) {
          particles[firstFree].initialize(x, y, dx, dy);
          firstFree++;
          if (firstFree == particles.length) firstFree = 0;
          if (firstActive == firstFree) firstActive++;
          if (firstActive == particles.length) firstActive = 0;
      };
      ParticlePool.prototype.update = function(deltaTime) {
          var i;
          if (firstActive < firstFree) {
              for (i = firstActive; i < firstFree; i++) particles[i].update(deltaTime);
          }
          if (firstFree < firstActive) {
              for (i = firstActive; i < particles.length; i++) particles[i].update(deltaTime);
              for (i = 0; i < firstFree; i++) particles[i].update(deltaTime);
          }
          while (particles[firstActive].age >= duration && firstActive != firstFree) {
              firstActive++;
              if (firstActive == particles.length) firstActive = 0;
          }
      };
      ParticlePool.prototype.draw = function(context, image) {
          if (firstActive < firstFree) {
              for (i = firstActive; i < firstFree; i++) particles[i].draw(context, image);
          }
          if (firstFree < firstActive) {
              for (i = firstActive; i < particles.length; i++) particles[i].draw(context, image);
              for (i = 0; i < firstFree; i++) particles[i].draw(context, image);
          }
      };
      return ParticlePool;
  })();

  var context = canvas.getContext('2d'),
      heartParticles = new ParticlePool(settings.particles.length),
      particleRate = settings.particles.length / settings.particles.duration,
      time;

  function pointOnHeart(t) {
      return new Point(
          160 * Math.pow(Math.sin(t), 3),
          130 * Math.cos(t) - 50 * Math.cos(2 * t) - 20 * Math.cos(3 * t) - 10 * Math.cos(4 * t) + 25
      );
  }

  var heartImage = (function() {
      var canvas = document.createElement('canvas'),
          context = canvas.getContext('2d');
      canvas.width = settings.particles.size;
      canvas.height = settings.particles.size;
      function to(t) {
          var point = pointOnHeart(t);
          point.x = settings.particles.size / 2 + point.x * settings.particles.size / 350;
          point.y = settings.particles.size / 2 - point.y * settings.particles.size / 350;
          return point;
      }
      context.beginPath();
      var t = -Math.PI;
      var point = to(t);
      context.moveTo(point.x, point.y);
      while (t < Math.PI) {
          t += 0.01;
          point = to(t);
          context.lineTo(point.x, point.y);
      }
      context.closePath();
      context.fillStyle = '#f50b02';
      context.fill();
      var image = new Image();
      image.src = canvas.toDataURL();
      return image;
  })();

  function renderHeart() {
      if (!isHeartActive) return;
      requestAnimationFrame(renderHeart);
      var newTime = new Date().getTime() / 1000,
          deltaTime = newTime - (time || newTime);
      time = newTime;
      context.clearRect(0, 0, canvas.width, canvas.height);
      var amount = particleRate * deltaTime;
      for (var i = 0; i < amount; i++) {
          var pos = pointOnHeart(Math.PI - 2 * Math.PI * Math.random());
          var dir = pos.clone().length(settings.particles.velocity);
          heartParticles.add(canvas.width / 2 + pos.x, canvas.height / 2 - pos.y, dir.x, -dir.y);
      }
      heartParticles.update(deltaTime);
      heartParticles.draw(context, heartImage);
  }

  function onResizeHeart() {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
  }
  window.onresize = onResizeHeart;

  // Three.js animation setup
  let scene, camera, renderer, threeParticles = [];
  let wordIndex = 0;
  const backgroundGeometry = new THREE.CircleGeometry(0.05, 6);
  const clickGeometry = new THREE.CircleGeometry(0.1, 6);
  const burstGeometry = new THREE.CircleGeometry(0.08, 6); // New geometry for burst particles
  const colors = [0xff69b4, 0xff1493, 0xffa07a, 0xffb6c1];
  const backgroundMaterials = colors.map(color => new THREE.MeshPhongMaterial({ color }));
  const clickMaterial = new THREE.MeshPhongMaterial({ color: 0xff1493 });
  const burstMaterial = new THREE.MeshPhongMaterial({ color: 0xff69b4, emissive: 0xff1493 });

  function initThreeJS() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = Math.min(window.innerWidth, window.innerHeight) / 100;

      renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.top = '0';
      renderer.domElement.style.left = '0';
      canvas.parentNode.replaceChild(renderer.domElement, canvas);

      const light = new THREE.PointLight(0xff69b4, 2, 50);
      light.position.set(0, 5, 5);
      scene.add(light);

      createThreeParticles();
      animateThreeJS();
      changeWordAndBurst();
  }

  function createThreeParticles() {
      const particleCount = window.innerWidth < 768 ? 150 : 300; // Increased particle count
      for (let i = 0; i < particleCount; i++) {
          let particle = new THREE.Mesh(
              backgroundGeometry,
              backgroundMaterials[Math.floor(Math.random() * backgroundMaterials.length)]
          );
          const scale = Math.min(window.innerWidth, window.innerHeight) / 100;
          particle.position.set(
              (Math.random() - 0.5) * 10 * scale,
              (Math.random() - 0.5) * 10 * scale,
              (Math.random() - 0.5) * 10 * scale
          );
          particle.velocity = new THREE.Vector3(
              (Math.random() - 0.5) * 0.01,
              Math.random() * 0.02,
              (Math.random() - 0.5) * 0.01
          );
          scene.add(particle);
          threeParticles.push(particle);
      }
  }

  function createBurstParticles(x, y, count = 20) {
      const scale = Math.min(window.innerWidth, window.innerHeight) / 100;
      for (let i = 0; i < count; i++) {
          let particle = new THREE.Mesh(burstGeometry, burstMaterial);
          particle.position.set(x, y, 0);
          particle.velocity = new THREE.Vector3(
              (Math.random() - 0.5) * 0.1,
              (Math.random() - 0.5) * 0.1,
              (Math.random() - 0.5) * 0.05
          );
          particle.life = 2; // Life in seconds
          scene.add(particle);
          threeParticles.push(particle);
      }
  }

  function createCSSParticles(x, y, count = 10) {
      const container = document.createElement('div');
      container.className = 'particle-container';
      document.body.appendChild(container);
      for (let i = 0; i < count; i++) {
          const particle = document.createElement('div');
          particle.className = 'css-particle';
          particle.style.left = `${x}px`;
          particle.style.top = `${y}px`;
          const angle = Math.random() * 2 * Math.PI;
          const distance = Math.random() * 100 + 50;
          particle.style.setProperty('--x', `${Math.cos(angle) * distance}px`);
          particle.style.setProperty('--y', `${Math.sin(angle) * distance}px`);
          container.appendChild(particle);
          setTimeout(() => particle.remove(), 3000); // Remove after animation
      }
  }

  function animateThreeJS() {
      if (isHeartActive) return;
      requestAnimationFrame(animateThreeJS);
      threeParticles.forEach(p => {
          p.position.add(p.velocity);
          const scale = Math.min(window.innerWidth, window.innerHeight) / 100;
          if (p.position.y > 5 * scale) p.position.y = -5 * scale;
          if (p.life) {
              p.life -= 0.016; // Approx 60 FPS
              p.scale.multiplyScalar(0.98);
              if (p.life <= 0) {
                  scene.remove(p);
                  threeParticles = threeParticles.filter(part => part !== p);
              }
          }
      });
      renderer.render(scene, camera);
  }

  function playMusic() {
      console.log('Attempting to play music');
      audio.play().then(() => {
          console.log('Music playing');
      }).catch((error) => {
          console.error('Error playing music:', error);
      });
  }

  function changeWordAndBurst() {
      const wordElement = document.getElementById("word");
      const phraseElement = document.getElementById("phrase");
      setInterval(() => {
          wordElement.style.opacity = "0";
          wordElement.style.transform = "translateY(-20px) scale(0.5)";
          phraseElement.style.opacity = "0";
          setTimeout(() => {
              wordIndex = (wordIndex + 1) % words.length;
              wordElement.textContent = words[wordIndex].word;
              phraseElement.textContent = words[wordIndex].phrase;
              wordElement.style.opacity = "1";
              wordElement.style.transform = "translateY(0) scale(1.2)";
              phraseElement.style.opacity = "1";
              setTimeout(() => {
                  wordElement.style.transform = "translateY(0) scale(1)";
                  const wordRect = wordElement.getBoundingClientRect();
                  const phraseRect = phraseElement.getBoundingClientRect();
                  const scale = Math.min(window.innerWidth, window.innerHeight) / 100;
                  const wordX = (wordRect.left + wordRect.width / 2) / window.innerWidth * 10 * scale - 5 * scale;
                  const wordY = -(wordRect.top + wordRect.height / 2) / window.innerHeight * 10 * scale + 5 * scale;
                  const phraseX = (phraseRect.left + phraseRect.width / 2) / window.innerWidth * 10 * scale - 5 * scale;
                  const phraseY = -(phraseRect.top + phraseRect.height / 2) / window.innerHeight * 10 * scale + 5 * scale;
                  createBurstParticles(wordX, wordY, 15); // Burst around word
                  createBurstParticles(phraseX, phraseY, 15); // Burst around phrase
                  createCSSParticles(wordRect.left + wordRect.width / 2, wordRect.top + wordRect.height / 2, 10);
                  createCSSParticles(phraseRect.left + phraseRect.width / 2, phraseRect.top + phraseRect.height / 2, 10);
              }, 500);
          }, 500);
      }, 2000);
  }

  // Initial setup
  setTimeout(function() {
      onResizeHeart();
      renderHeart();
      heartText.classList.add('visible');
  }, 10);

  // Click event to transition
  canvas.addEventListener('click', function() {
      if (!isHeartActive) return;
      isHeartActive = false;
      document.body.style.background = 'black';
      heartText.style.display = 'none';
      message.style.display = 'block';
      phrase.style.display = 'block';
      initThreeJS();
      playMusic();

      window.addEventListener('click', (event) => {
          if (isHeartActive) return;
          const scale = Math.min(window.innerWidth, window.innerHeight) / 100;
          for (let i = 0; i < 5; i++) {
              let particle = new THREE.Mesh(clickGeometry, clickMaterial);
              let x = (event.clientX / window.innerWidth) * 10 * scale - 5 * scale + (Math.random() - 0.5) * 0.5;
              let y = -(event.clientY / window.innerHeight) * 10 * scale + 5 * scale + (Math.random() - 0.5) * 0.5;
              let z = (Math.random() - 0.5) * 0.5;
              particle.position.set(x, y, z);
              particle.velocity = new THREE.Vector3(
                  (Math.random() - 0.5) * 0.05,
                  Math.random() * 0.05,
                  (Math.random() - 0.5) * 0.05
              );
              particle.life = 2;
              scene.add(particle);
              threeParticles.push(particle);
          }
          createCSSParticles(event.clientX, event.clientY, 5);
          playMusic();
      });

      window.addEventListener('resize', () => {
          if (isHeartActive) return;
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.position.z = Math.min(window.innerWidth, window.innerHeight) / 100;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
          threeParticles.forEach(p => scene.remove(p));
          threeParticles = [];
          createThreeParticles();
      });
  });

  requestAnimationFramePolyfill();
});