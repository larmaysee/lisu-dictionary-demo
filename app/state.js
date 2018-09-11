dictionary.config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');
		$stateProvider
			.state("dict", {
				url: "/",
				templateUrl: 'app/components/dict/dictView.html',
				controller: 'dictCtrl',
				resolve: {
					deps: [
						'$ocLazyLoad',
						function ($ocLazyLoad) {
							return $ocLazyLoad.load([
								'app/components/dict/dictService.js',
								'app/components/dict/dictController.js',

							], {
								serie: true
							});
						}
					]
				}
			})
	}
])