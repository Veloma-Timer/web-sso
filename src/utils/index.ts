interface IQuery {
  fingerprint: string;
  org: string;
}

export const parseQuery = (url = window.location.href): IQuery => {
  const query = {} as IQuery;
  const regex = /\?.*/;

  const matches = url.match(regex);

  if (matches) {
    const params = matches[0].substring(1).split("&");
    params.forEach((param) => {
      const [key, value] = param.split("=");
      query[key] = value;
    });
  }

  return query;
};
