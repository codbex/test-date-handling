angular.module('page', ['blimpKit', 'platformView', 'platformLocale', 'EntityService'])
	.config(['EntityServiceProvider', (EntityServiceProvider) => {
		EntityServiceProvider.baseUrl = '/services/ts/test/gen/test/api/Entities/Entity51628Controller.ts';
	}])
	.controller('PageController', ($scope, $http, ViewParameters, LocaleService, EntityService) => {
		const Dialogs = new DialogHub();
		const Notifications = new NotificationHub();
		let description = 'Description';
		let propertySuccessfullyCreated = 'Entity51628 successfully created';
		let propertySuccessfullyUpdated = 'Entity51628 successfully updated';

		$scope.entity = {};
		$scope.forms = {
			details: {},
		};
		$scope.formHeaders = {
			select: 'Entity51628 Details',
			create: 'Create Entity51628',
			update: 'Update Entity51628'
		};
		$scope.action = 'select';

		LocaleService.onInit(() => {
			description = LocaleService.t('test:test-model.defaults.description');
			$scope.formHeaders.select = LocaleService.t('test:test-model.defaults.formHeadSelect', { name: '$t(test:test-model.t.ENTITY51628)' });
			$scope.formHeaders.create = LocaleService.t('test:test-model.defaults.formHeadCreate', { name: '$t(test:test-model.t.ENTITY51628)' });
			$scope.formHeaders.update = LocaleService.t('test:test-model.defaults.formHeadUpdate', { name: '$t(test:test-model.t.ENTITY51628)' });
			propertySuccessfullyCreated = LocaleService.t('test:test-model.messages.propertySuccessfullyCreated', { name: '$t(test:test-model.t.ENTITY51628)' });
			propertySuccessfullyUpdated = LocaleService.t('test:test-model.messages.propertySuccessfullyUpdated', { name: '$t(test:test-model.t.ENTITY51628)' });
		});

		let params = ViewParameters.get();
		if (Object.keys(params).length) {
			$scope.action = params.action;
			if (params.entity.Due) {
				params.entity.Due = new Date(params.entity.Due);
			}
			$scope.entity = params.entity;
			$scope.selectedMainEntityKey = params.selectedMainEntityKey;
			$scope.selectedMainEntityId = params.selectedMainEntityId;
		}

		$scope.create = () => {
			let entity = $scope.entity;
			entity[$scope.selectedMainEntityKey] = $scope.selectedMainEntityId;
			EntityService.create(entity).then((response) => {
				Dialogs.postMessage({ topic: 'test.Entities.Entity51628.entityCreated', data: response.data });
				Notifications.show({
					title: LocaleService.t('test:test-model.t.ENTITY51628'),
					description: propertySuccessfullyCreated,
					type: 'positive'
				});
				$scope.cancel();
			}, (error) => {
				const message = error.data ? error.data.message : '';
				$scope.$evalAsync(() => {
					$scope.errorMessage = LocaleService.t('test:test-model.messages.error.unableToCreate', { name: '$t(test:test-model.t.ENTITY51628)', message: message });
				});
				console.error('EntityService:', error);
			});
		};

		$scope.update = () => {
			let id = $scope.entity.Id;
			let entity = $scope.entity;
			entity[$scope.selectedMainEntityKey] = $scope.selectedMainEntityId;
			EntityService.update(id, entity).then((response) => {
				Dialogs.postMessage({ topic: 'test.Entities.Entity51628.entityUpdated', data: response.data });
				Notifications.show({
					title: LocaleService.t('test:test-model.t.ENTITY51628'),
					description: propertySuccessfullyUpdated,
					type: 'positive'
				});
				$scope.cancel();
			}, (error) => {
				const message = error.data ? error.data.message : '';
				$scope.$evalAsync(() => {
					$scope.errorMessage = LocaleService.t('test:test-model.messages.error.unableToUpdate', { name: '$t(test:test-model.t.ENTITY51628)', message: message });
				});
				console.error('EntityService:', error);
			});
		};


		$scope.alert = (message) => {
			if (message) Dialogs.showAlert({
				title: description,
				message: message,
				type: AlertTypes.Information,
				preformatted: true,
			});
		};

		$scope.cancel = () => {
			$scope.entity = {};
			$scope.action = 'select';
			Dialogs.closeWindow({ id: 'Entity51628-details' });
		};

		$scope.clearErrorMessage = () => {
			$scope.errorMessage = null;
		};
	});