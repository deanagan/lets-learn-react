const items = [
  { index: 1, desc: "Beware of premature optimisation" },
  {
    index: 2,
    desc: "Fix slow renders first before fixing re-renders by determining the bottleneck with the React DevTools profiler",
  },
  { index: 3, desc: "It is best to measure first" },
];

export default function Remember() {
  return (
    <section>
      <h3>Remember!</h3>
      <ul>
        {items.map((item) => (
          <li className="fragment" key={item.index}>
            {item.desc}
          </li>
        ))}
      </ul>
    </section>
  );
}
