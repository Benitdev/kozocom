/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";

export default function FireWork({
  className,
  id,
}: {
  className?: string;
  id?: string;
}) {
  useEffect(() => {
    (function () {
      const canvas = document.querySelectorAll(
        id ? `#${id}` : "#canvas"
      )[0] as HTMLCanvasElement;
      const ctx = canvas.getContext("2d");
      // objects
      const listFire: any[] = [];
      const listFirework: any[] = [];
      const fireNumber = 10;
      const center = { x: canvas.width / 2, y: canvas.height / 2 };
      const range = 100;
      for (let i = 0; i < fireNumber; i++) {
        const fire = {
          x: (Math.random() * range) / 2 - range / 4 + center.x,
          y: Math.random() * range * 2 + canvas.height,
          size: Math.random() + 0.5,
          fill: "#fd1",
          vx: Math.random() * 2 - 1, // Increase horizontal velocity
          vy: -(Math.random() * 6 + 4),
          ax: Math.random() * 0.02 - 0.01,
          far: Math.random() * range + (center.y - range),
          base: {},
        };
        fire.base = {
          x: fire.x,
          y: fire.y,
          vx: fire.vx,
        };
        //
        listFire.push(fire);
      }

      function randColor() {
        const r = Math.floor(Math.random() * 256).toString();
        const g = Math.floor(Math.random() * 256).toString();
        const b = Math.floor(Math.random() * 256).toString();
        let color = "rgb($r, $g, $b)";
        color = color.replace("$r", r);
        color = color.replace("$g", g);
        color = color.replace("$b", b);
        return color;
      }

      (function loop() {
        requestAnimationFrame(loop);
        update();
        draw();
      })();

      function update() {
        for (let i = 0; i < listFire.length; i++) {
          const fire = listFire[i];
          //
          if (fire.y <= fire.far) {
            // case add firework
            const color = randColor();
            for (let i = 0; i < fireNumber * 5; i++) {
              const firework = {
                x: fire.x,
                y: fire.y,
                size: Math.random() * 3,
                fill: color,
                vx: Math.random() * 5 - 2.5,
                vy: Math.random() * -5 + 1.5,
                ay: 0.05,
                alpha: 1,
                life: Math.round((Math.random() * range) / 2) + range / 2,
                base: {},
              };
              firework.base = {
                life: firework.life,
                size: firework.size,
              };
              listFirework.push(firework);
            }
            // reset
            fire.y = fire.base.y;
            fire.x = fire.base.x;
            fire.vx = fire.base.vx;
            fire.ax = Math.random() * 0.02 - 0.01;
          }
          //
          fire.x += fire.vx;
          fire.y += fire.vy;
          fire.vx += fire.ax;
        }

        for (let i = listFirework.length - 1; i >= 0; i--) {
          const firework = listFirework[i];
          if (firework) {
            firework.x += firework.vx;
            firework.y += firework.vy;
            firework.vy += firework.ay;
            firework.alpha = firework.life / firework.base.life;
            firework.size = firework.alpha * firework.base.size;
            firework.alpha = firework.alpha > 0.6 ? 1 : firework.alpha;
            //
            firework.life--;
            if (firework.life <= 0) {
              listFirework.splice(i, 1);
            }
          }
        }
      }

      function draw() {
        if (!ctx) return;
        // clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // re-draw
        for (let i = 0; i < listFire.length; i++) {
          const fire = listFire[i];
          ctx.beginPath();
          ctx.arc(fire.x, fire.y, fire.size, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fillStyle = fire.fill;
          ctx.fill();
        }

        for (let i = 0; i < listFirework.length; i++) {
          const firework = listFirework[i];
          ctx.globalAlpha = firework.alpha;
          ctx.beginPath();
          ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fillStyle = firework.fill;
          ctx.fill();
        }
      }
    })();
  }, [id]);
  return (
    <canvas
      id={id ?? "#canvas"}
      width={500}
      height={500}
      className={className}
    ></canvas>
  );
}
