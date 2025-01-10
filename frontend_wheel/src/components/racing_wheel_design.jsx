import { useRef, useEffect } from "react";

const RacingWheelDesign = ({ rotation, style }) => {
  const canvasRef = useRef(null);

  // Parse style properties with defaults
  const wheelStyle = {
    width: style?.width || 400,
    height: style?.height || 400,
    backgroundColor: style?.color || "#1a1a1a",
    borderColor: style?.border ? style.border.split(" ")[2] : "#000000",
    borderWidth: style?.border ? parseInt(style.border.split(" ")[0]) : 3,
    position: style?.position || "static",
    left: style?.left || "auto",
    top: style?.top || "auto",
    spokeColor: "#404040",
    markerColor: "#FFD700",
    hubColor: "#000000",
    hubBorderColor: "#333",
  };

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
    ctx.strokeStyle = wheelStyle.backgroundColor;
    ctx.stroke();

    // Draw yellow center marker
    ctx.beginPath();
    ctx.moveTo(-20, -radius + 10);
    ctx.lineTo(20, -radius + 10);
    ctx.lineTo(15, -radius + 30);
    ctx.lineTo(-15, -radius + 30);
    ctx.closePath();
    ctx.fillStyle = wheelStyle.markerColor;
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
      ctx.fillStyle = wheelStyle.spokeColor;
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
    ctx.fillStyle = wheelStyle.hubColor;
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
    ctx.strokeStyle = wheelStyle.hubBorderColor;
    ctx.lineWidth = wheelStyle.borderWidth;
    ctx.stroke();

    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size based on style
    canvas.width = wheelStyle.width;
    canvas.height = wheelStyle.height;

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
  }, [
    rotation,
    wheelStyle.width,
    wheelStyle.height,
    wheelStyle.backgroundColor,
  ]);

  return (
    <div
      style={{
        position: wheelStyle.position,
        left: wheelStyle.left,
        top: wheelStyle.top,
        width: `${wheelStyle.width}px`,
        height: `${wheelStyle.height}px`,
        border:
          style?.border ||
          `${wheelStyle.borderWidth}px solid ${wheelStyle.borderColor}`,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default RacingWheelDesign;
