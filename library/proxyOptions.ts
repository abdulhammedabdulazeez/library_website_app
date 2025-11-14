// import common_site_config from '../../../sites/common_site_config.json';
// const { webserver_port } = common_site_config;

const port = Number((import.meta as unknown as { env: { VITE_FRAPPE_PORT: string } }).env.VITE_FRAPPE_PORT || 8000);


export default {
	'^/(app|api|assets|files|private)': {
		target: `http://127.0.0.1:${port}`,
		ws: true,
		router: function(req) {
			const site_name = req.headers.host.split(':')[0];
			return `http://${site_name}:${port}`;
		}
	}
};
