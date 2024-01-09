import { createMachine, fromPromise, assign } from "xstate";
import { ArticleContext } from "../types";

const fetchArticles = async (currentPage: number) => {
  const response = await fetch(
    `http://localhost:3001/api/articles/${currentPage}`
  );
  const articles = await response.json();
  return articles;
};

const articleMachine = createMachine(
  {
    context: {
      currentPage: 1,
      lastPage: false,
      articles: [],
      error: undefined,
    },
    id: "article",
    initial: "loading",
    states: {
      loading: {
        invoke: {
          input: ({ context }) => ({ currentPage: context.currentPage }),
          src: fromPromise(({ input: { currentPage } }) =>
            fetchArticles(currentPage)
          ),
          onDone: [
            {
              target: "success",
              guard: "articleGuard",
              actions: {
                type: "fetchArticlesSuccessAction",
              },
            },
            {
              target: "noData",
            },
          ],
          onError: [
            {
              target: "failure",
              actions: assign({
                error: ({ event }) => `Error loading data: ${event.error}`,
              }),
            },
          ],
        },
      },

      success: {
        on: {
          LOAD_MORE: {
            target: "loading",
          },
        },
      },

      failure: {
        on: {
          RETRY: {
            target: "loading",
          },
        },
      },

      noData: {
        type: "final",
      },
    },
    types: {
      context: {} as ArticleContext,
    },
  },
  {
    actions: {
      fetchArticlesSuccessAction: assign({
        articles: ({ context, event }) => context.articles.concat(event.output),
        currentPage: ({ context }) => context.currentPage + 1,
      }),
    },
    guards: {
      articleGuard: ({ context, event }) => event.output.length > 0,
    },
    delays: {},
  }
);

export default articleMachine;
