const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)',
);

const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)');

if (supportsHover.matches && !prefersReducedMotion.matches) {
  const stars = ['✦', '✧', '⋆', '✶'];
  let lastSparkle = 0;

  document.addEventListener('pointermove', (event) => {
    const now = performance.now();

    // Limit how frequently stars appear.
    if (now - lastSparkle < 45) return;

    lastSparkle = now;

    const sparkle = document.createElement('span');

    sparkle.className = 'cursor-sparkle';
    sparkle.textContent = stars[Math.floor(Math.random() * stars.length)];

    sparkle.style.left = `${event.clientX}px`;
    sparkle.style.top = `${event.clientY}px`;

    sparkle.style.setProperty('--drift-x', `${Math.random() * 50 - 25}px`);

    sparkle.style.setProperty('--drift-y', `${-25 - Math.random() * 35}px`);

    sparkle.style.fontSize = `${10 + Math.random() * 10}px`;

    document.body.appendChild(sparkle);

    sparkle.addEventListener('animationend', () => sparkle.remove(), {
      once: true,
    });
  });
}
