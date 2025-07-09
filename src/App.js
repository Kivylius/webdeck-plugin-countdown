import React, { useEffect } from "react";

export const manifest = {
  version: 1,
  bespoke: true, // we’ll paint the key ourselves
};

export const init = ({ drawKey, getConfig }) => {
  const render = () => {
    const { targetDate, label } = getConfig() || {};
    const today = new Date();
    const goal = targetDate ? new Date(`${targetDate}T00:00:00`) : null;

    // Fallback if config is empty
    const diffDays = goal
      ? Math.max(0, Math.ceil((goal - today) / (1000 * 60 * 60 * 24)))
      : 0;

    drawKey(({ ctx, canvas }) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Big number
      ctx.font = "28px sans-serif";
      ctx.fillText(diffDays, canvas.width / 2, canvas.height / 2 - 6);

      // Small label
      ctx.font = "10px sans-serif";
      ctx.fillText(label || "days", canvas.width / 2, canvas.height / 2 + 16);
    });
  };

  // draw immediately and then once a day just after midnight
  render();
  const now = new Date();
  const next = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    5
  );
  const timer = setTimeout(() => {
    render();
    setInterval(render, 86_400_000); // every 24 h
  }, next - now);

  // add a listener to re-render on config changes
  window.addEventListener("webdeck-plugin-countdown:update", render);

  // destructor
  return () => {
    clearTimeout(timer);
    window.removeEventListener("webdeck-plugin-countdown:update", render);
  };
};

const App = ({ config = {}, setConfig }) => {
  const { targetDate = "", label = "" } = config;

  // live preview in sidebar while editing
  useEffect(() => {
    if (!targetDate) return;
    const event = new CustomEvent("webdeck-plugin-countdown:update"); // hot-reload helper
    window.dispatchEvent(event);
  }, [targetDate, label]);

  return (
    <div
      style={{
        padding: 12,
        fontFamily: "sans-serif",
        backgroundColor: "#f0f0f0",
        color: "#000",
      }}
    >
      <h3>Countdown Plugin</h3>

      <div className="setting">
        <label htmlFor="targetDate">Target date:&nbsp;</label>
        <input
          type="date"
          id="targetDate"
          name="targetDate"
          value={targetDate}
          onChange={(e) => setConfig({ ...config, targetDate: e.target.value })}
        />
      </div>

      <div className="setting" style={{ marginTop: 8 }}>
        <label htmlFor="label">Label:&nbsp;</label>
        <input
          type="text"
          id="label"
          name="label"
          placeholder="Days left"
          value={label}
          onChange={(e) => setConfig({ ...config, label: e.target.value })}
        />
      </div>
    </div>
  );
};

export default App;
