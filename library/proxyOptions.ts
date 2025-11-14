type Req = {
  headers: {
    host: string;
  };
};

export const createProxy = (port: number) => ({
  "^/(app|api|assets|files|private)": {
    target: `http://127.0.0.1:${port}`,
    ws: true,
    router(req: Req) {
      const site_name = req.headers.host.split(":")[0];
      return `http://${site_name}:${port}`;
    },
  },
});
