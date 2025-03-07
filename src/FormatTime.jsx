export default function FormatTime({ time }) {
  // console.log(time)
  const minute = Math.floor(time / 60);
  const second = Math.floor(time % 60);
  return !isNaN(time) ? (
    <span className="time">
      {minute} : {second < 10 ? "0" : ""}
      {second}
    </span>
  ) : (
    <span className="time">00 : 00</span>
  );
}
