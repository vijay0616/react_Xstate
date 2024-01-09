import { useMachine } from "@xstate/react";
import { useEffect, useRef } from "react";
import articleMachine from "./Machine/articleMachine";
import Article from "./Component/ArticleComponent";
import Loading from "./Component/LoadingComponent";
import Error from "./Component/ErrorComponent";

const App = () => {
  const [current, send] = useMachine(articleMachine);
  const { articles, error } = current.context;

  const articlesRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (
      articlesRef.current &&
      articlesRef.current.getBoundingClientRect().bottom <= window.innerHeight
    ) {
      send({ type: "LOAD_MORE" });
    }
  };

  const debounce = (func: Function, wait: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      const context = this;
      const later = () => {
        timeout = null as any;
        func.apply(context, args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  useEffect(() => {
    const debouncedHandleScroll = debounce(handleScroll, 200);
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => window.removeEventListener("scroll", debouncedHandleScroll);
  }, []);

  return (
    <div ref={articlesRef}>
      {articles.map(({ node }) => (
        <Article key={node.nid} node={node} />
      ))}

      {current.matches("loading") && <Loading />}

      {current.matches("failure") && (
        <Error
          error={error ? JSON.stringify(error) : "Unknown error"}
          send={() => send({ type: "RETRY" })}
        />
      )}
    </div>
  );
};

export default App;
