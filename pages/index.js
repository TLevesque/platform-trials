import Link from "next/link";

import "../styles/index.scss";

export default () => (
  <div className="example">
    <ul>
      <li>
        <Link href="/a" as="/a">
          <a>a</a>
        </Link>
      </li>
      <li>
        <Link href="/b" as="/b">
          <a>b</a>
        </Link>
      </li>
      <li>
        <Link href={{ pathname: "/posts", query: { id: "2" } }} as="/posts/2">
          <a>post</a>
        </Link>
      </li>
    </ul>
    <img src="/static/iphone.png" />
  </div>
);
