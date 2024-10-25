import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

import { useErrorStore } from "@/contexts/error";

const uri = process.env.NEXT_PUBLIC_API_BASE_URL_EARTH + "/graphql";

const getAuthorization = (accessToken?: string) => {
  if (!accessToken) return {};
  return { authorization: `Bearer ${accessToken}` };
};

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (!!graphQLErrors?.length) {
    const doesIncludeAuthenticationError = graphQLErrors.some((err) => err.extensions?.code === "UNAUTHENTICATED");
    if (doesIncludeAuthenticationError) {
      useErrorStore.setState({ messages: ["Session expired"], shouldRedirect: true });
      return;
    }

    const errors = graphQLErrors.reduce((errors, err) => {
      if (!!err.message) return [...errors, err.message];
      return errors;
    }, [] as string[]);

    const isInternalServerError = graphQLErrors.some((err) => {
      const isInternalServerError = err.extensions?.code === "INTERNAL_SERVER_ERROR";
      return isInternalServerError;
    });
    if (isInternalServerError) {
      useErrorStore.setState({ messages: errors });
      return;
    }

    useErrorStore.setState({ messages: errors });
    return;
  }

  if (networkError && networkError.message === "Failed to fetch") {
    useErrorStore.setState({ messages: ["Oops... there was a problem"], shouldRedirect: true });
    return;
  }

  if (networkError) {
    useErrorStore.setState({ messages: ["Oops... there was a problem"] });
    return;
  }
});

export const GraphqlService = (accessToken?: string) => {
  const httpLink = createHttpLink({ uri });

  const authLink = setContext((_, { headers }) => {
    return { headers: { ...headers, ...getAuthorization(accessToken) } };
  });

  if (!!accessToken) {
    const apollo = new ApolloClient({
      link: errorLink.concat(authLink.concat(httpLink)),
      cache: new InMemoryCache(),
    });

    return apollo;
  }

  const apollo = new ApolloClient({
    link: errorLink.concat(authLink.concat(httpLink)),
    cache: new InMemoryCache(),
  });

  return apollo;
};
