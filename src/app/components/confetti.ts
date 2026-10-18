/**
 * Tiny canvas confetti with no dependencies. Each burst adds pieces to one
 * shared full-screen canvas, which removes itself once the last piece has
 * fallen. Visitors who ask for reduced motion never see it.
 */

const COLORS = ["#2a6a73", "#7cc3c8", "#e0b44c", "#e2725b", "#202321"];

interface Piece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  spin: number;
  tilt: number;
  tiltSpeed: number;
  color: string;
  life: number;
}

let canvas: HTMLCanvasElement | null = null;
let pieces: Piece[] = [];
let frame = 0;

function fit(target: HTMLCanvasElement) {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  target.width = window.innerWidth * ratio;
  target.height = window.innerHeight * ratio;
  target.getContext("2d")?.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function tick() {
  const ctx = canvas?.getContext("2d");
  if (!canvas || !ctx) return;
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  pieces = pieces.filter((piece) => piece.life > 0 && piece.y < window.innerHeight + 40);

  for (const piece of pieces) {
    piece.vx *= 0.98;
    piece.vy = piece.vy * 0.98 + 0.22;
    piece.x += piece.vx;
    piece.y += piece.vy;
    piece.rotation += piece.spin;
    piece.tilt += piece.tiltSpeed;
    piece.life -= 0.006;

    ctx.save();
    ctx.globalAlpha = Math.min(1, piece.life * 2);
    ctx.translate(piece.x, piece.y);
    ctx.rotate(piece.rotation);
    // Squashing by cos(tilt) makes each piece look like it flips as it falls.
    ctx.scale(1, Math.cos(piece.tilt));
    ctx.fillStyle = piece.color;
    ctx.fillRect(-piece.size / 2, -piece.size / 4, piece.size, piece.size / 2);
    ctx.restore();
  }

  if (pieces.length) {
    frame = requestAnimationFrame(tick);
  } else {
    frame = 0;
    canvas.remove();
    canvas = null;
  }
}

/** Throws `count` pieces from (x, y), aimed at `angle` (radians, 0 = right) and fanned across `spread`. */
export function burst(
  x: number,
  y: number,
  { count = 40, power = 8, angle = -Math.PI / 2, spread = Math.PI * 2, colors = COLORS } = {},
) {
  if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    Object.assign(canvas.style, {
      position: "fixed",
      inset: "0",
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: "78",
    });
    document.body.appendChild(canvas);
    fit(canvas);
  }

  for (let i = 0; i < count; i++) {
    const direction = angle + (Math.random() - 0.5) * spread;
    const speed = power * (0.5 + Math.random() * 0.7);
    pieces.push({
      x,
      y,
      vx: Math.cos(direction) * speed,
      vy: Math.sin(direction) * speed,
      size: 5 + Math.random() * 5,
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.3,
      tilt: Math.random() * Math.PI,
      tiltSpeed: 0.1 + Math.random() * 0.15,
      color: colors[i % colors.length],
      life: 1,
    });
  }

  if (!frame) frame = requestAnimationFrame(tick);
}
