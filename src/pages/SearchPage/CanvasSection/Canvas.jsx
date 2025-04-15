import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";

function Canvas({ image, onBack }) {
  const fabricCanvas = useRef(null);
  const canvasElementRef = useRef(null);

  useEffect(() => {
    const initCanvas = () => {
      if (!canvasElementRef.current) return;

      const canvas = new fabric.Canvas(canvasElementRef.current, {
        preserveObjectStacking: true,
      });
      fabricCanvas.current = canvas;

      fabric.Image.fromURL(
        image,
        (img) => {
          const maxWidth = 800;
          img.scaleToWidth(maxWidth);

          const scaledWidth = img.getScaledWidth();
          const scaledHeight = img.getScaledHeight();

          canvas.setWidth(scaledWidth);
          canvas.setHeight(scaledHeight);

          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
            scaleX: img.scaleX,
            scaleY: img.scaleY,
            originX: "left",
            originY: "top",
          });
        },
        { crossOrigin: "anonymous" }
      );
    };

    setTimeout(initCanvas, 0);

    return () => {
      if (fabricCanvas.current) {
        fabricCanvas.current.dispose();
      }
    };
  }, [image]);

  useEffect(() => {
    if (fabricCanvas.current) {
      fabricCanvas.current.on("object:added", () => {
        console.log("Object added:", fabricCanvas.current.getObjects());
      });
    }
  }, []);

  const addText = () => {
    const text = new fabric.IText("Type here", {
      left: 50,
      top: 50,
      fontSize: 20,
      fill: "black",
      editable: true,
      hasControls: true,
      selectable: true,
    });
    fabricCanvas.current.add(text);
  };

  const addShape = (type) => {
    let shape;
    if (type === "circle") {
      shape = new fabric.Circle({
        radius: 30,
        fill: "red",
        left: 100,
        top: 100,
        hasControls: true,
        selectable: true,
      });
    } else if (type === "rect") {
      shape = new fabric.Rect({
        width: 80,
        height: 50,
        fill: "blue",
        left: 150,
        top: 150,
        hasControls: true,
        selectable: true,
      });
    } else if (type === "triangle") {
      shape = new fabric.Triangle({
        width: 60,
        height: 60,
        fill: "green",
        left: 200,
        top: 200,
        hasControls: true,
        selectable: true,
      });
    }
    fabricCanvas.current.add(shape);
    fabricCanvas.current.setActiveObject(shape);
  };

  const downloadImage = () => {
    const dataURL = fabricCanvas.current.toDataURL({
      format: "png",
      quality: 1,
    });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "captioned-image.png";
    link.click();
  };

  return (
    <div className="canvas-editor">
      <button onClick={onBack}>← Back to Gallery</button>
      <div className="editor-tools">
        <button onClick={addText}>Add Text</button>
        <button onClick={() => addShape("circle")}>Add Circle</button>
        <button onClick={() => addShape("rect")}>Add Rectangle</button>
        <button onClick={() => addShape("triangle")}>Add Triangle</button>
        <button onClick={downloadImage}>Download</button>
      </div>
      <canvas
        ref={canvasElementRef}
        width={800}
        height={600}
        style={{ border: "1px solid #ccc", display: "block" }}
      />
    </div>
  );
}

export default Canvas;
