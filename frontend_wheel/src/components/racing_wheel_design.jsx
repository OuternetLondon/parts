import { useRef, useEffect } from "react";
const RacingWheelDesign = ({ rotation, style }) => {
  const canvasRef = useRef(null);

  const drawWheel = (ctx) => {
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 20;

    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((rotation * Math.PI) / 180);

    // Draw the main rim using straight lines
    ctx.beginPath();
    const segments = 32;
    const startAngle = 0.3 * Math.PI;
    const endAngle = 2.7 * Math.PI;
    const angleRange = endAngle - startAngle;

    for (let i = 0; i <= segments; i++) {
      const angle = startAngle + (angleRange * i) / segments;
      const x = Math.cos(angle) * (radius - 20);
      const y = Math.sin(angle) * (radius - 20);

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.lineWidth = 45;
    ctx.lineCap = "butt";
    ctx.strokeStyle = style.outer_rim_color;
    ctx.stroke();

    // Draw yellow center marker
    ctx.beginPath();
    ctx.moveTo(-20, -radius + 10);
    ctx.lineTo(20, -radius + 10);
    ctx.lineTo(15, -radius + 30);
    ctx.lineTo(-15, -radius + 30);
    ctx.closePath();
    ctx.fillStyle = style.center_marker_color;
    ctx.fill();

    // Draw spokes
    const drawSpoke = (angle) => {
      ctx.save();
      ctx.rotate(angle);

      ctx.beginPath();
      ctx.moveTo(-15, -20);
      ctx.lineTo(-20, -radius + 40);
      ctx.lineTo(20, -radius + 40);
      ctx.lineTo(15, -20);
      ctx.closePath();
      ctx.fillStyle = style.spoke_color;
      ctx.fill();

      ctx.restore();
    };

    drawSpoke(0);
    drawSpoke((2 * Math.PI) / 3);
    drawSpoke((-2 * Math.PI) / 3);

    // Center hub (octagonal)
    ctx.beginPath();
    const hubSize = 40;
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      const x = Math.cos(angle) * hubSize;
      const y = Math.sin(angle) * hubSize;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.fillStyle = style.hub_color;
    ctx.fill();

    // Inner hub (hexagonal)
    ctx.beginPath();
    const innerHubSize = 30;
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const x = Math.cos(angle) * innerHubSize;
      const y = Math.sin(angle) * innerHubSize;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.strokeStyle = style.hub_color;
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 400;
    canvas.height = 400;

    // Animation loop
    let animationFrameId;
    const render = () => {
      drawWheel(ctx);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [rotation]);

  return (
    <canvas
      ref={canvasRef}
      className=""
      style={{
        width: "400px",
        height: "400px",
      }}
    />
  );
};

export default RacingWheelDesign;
