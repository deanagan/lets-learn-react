const what = [
  { uniqueId: 1, value: "memo is the functional equivalent of PureComponent." },
  {
    uniqueId: 2,
    value:
      "Checks for prop changes, and only re-renders if they are different.",
  },
  {
    uniqueId: 3,
    value:
      "Does not prevent the current component from re-rendering if its state changes.",
  },
  {
    uniqueId: 4,
    value:
      "By default, comparison is shallow but has an optional 2nd argument to provide custom comparison.",
  },
  {
    uniqueId: 5,
    value:
      "Only exists as a performance optimization. Do not rely on it to “prevent” a render, as this can lead to bugs.",
  },
  {
    uniqueId: 6,
    value:
      "Can be used with redux connect: export const Component = connect(mapStateToProps)(memo(Component))",
  },
];

export default function MemoHOC() {
  return (
    <section>
      <h3>React.memo</h3>
      <section>
        <ul>
          {what.map((e) => (
            <li className="fragment" key={e.uniqueId}>
              {e.value}
            </li>
          ))}
        </ul>
      </section>
      {/* <section>
       <p className="desc">{{ basicMemo.description }}</p>
       <pre className="prettyprint language-javascript srcCode">
         <template v-for="(code, i) in basicMemo.codes" :key=i>
           <code :className="{fragment: i !== 0}" data-trim :data-line-numbers=code.lineNumbers>{{ code.src }}</code>
         </template>
       </pre>
       <a className="sandboxlink" :href="basicMemo.sandboxlink">See code</a>
      </section> */}
      {/* <section>
        <p className="desc">{{ customMemoCompare.description }}</p>
        <pre className="prettyprint language-javascript srcCode">
          <template v-for="(code, i) in customMemoCompare.codes" :key=i>
            <code :className="{fragment: i !== 0}" data-trim :data-line-numbers=code.lineNumbers>{{ code.src }}</code>
          </template>
        </pre>
        <a className="sandboxlink" :href="customMemoCompare.sandboxlink">See code</a>
      </section> */}
    </section>
  );
}
