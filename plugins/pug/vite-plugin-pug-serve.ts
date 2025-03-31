import fs from 'fs';
import type { LocalsObject, Options } from 'pug';
import { compileFile } from 'pug';
import type { Plugin, ViteDevServer } from 'vite';
import { send } from 'vite';

type PugSettings = {
  options: Options;
  locals: LocalsObject;
};

const transformPugToHtml = async (server: ViteDevServer, path: string, options: Options, locals: LocalsObject) => {
  try {
    const compiled = compileFile(path, options)(locals);
    return server.transformIndexHtml(path, compiled);
  } catch (error) {
    console.log(error);
    return await server.transformIndexHtml(path, 'Pug Compile Error');
  }
};

export const vitePluginPugServe = ({ options, locals }: PugSettings): Plugin => {
  return {
    name: 'vite-plugin-pug-serve',
    enforce: 'pre',
    apply: 'serve',
    handleHotUpdate(context) {
      context.server.ws.send({
        type: 'full-reload',
      });
      return [];
    },
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const root = server.config.root;
        let fullReqPath = root + req.url;

        if (fullReqPath.endsWith('/')) {
          fullReqPath += 'index.html';
        }

        if (fullReqPath.endsWith('.html')) {
          if (fs.existsSync(fullReqPath)) {
            next();
            return;
          }

          const pugPath = `${fullReqPath.slice(0, Math.max(0, fullReqPath.lastIndexOf('.'))) || fullReqPath}.pug`;

          if (!fs.existsSync(pugPath)) {
            send(req, res, '404 Not Found', 'html', {});
            return;
          }

          const html = await transformPugToHtml(server, pugPath, options, locals);
          send(req, res, html, 'html', {});
        } else {
          next();
        }
      });
    },
  };
};
