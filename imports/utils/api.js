const Api = new Restivus({
  useDefaultAuth: true,
  prettyJson: true,
  defaultOptionsEndpoint: {
		action() {
			this.response.writeHead(201, {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers':
					'Origin, X-Requested-With, Content-Type, Accept, Z-Key, X-Auth-Token, X-User-Id',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
			});

			this.done();

			return {
				status: 'success',
				data: {
					message: 'We love OPTIONS'
				}
			};
		}
	},
});

export default Api;