export default function FormatTime({ time }) {
  const minute = Math.floor(time / 60);
  const second = Math.floor(time % 60);
  return <span className="time">{minute} : {second < 10 ? "0" : ""}{second}</span>
}
