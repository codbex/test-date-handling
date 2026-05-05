angular.module('page', ['blimpKit', 'platformView', 'platformLocale']).controller('PageController', ($scope, ViewParameters, LocaleService) => {
	const Dialogs = new DialogHub();
	let description = 'Description';
	$scope.entity = {};
	$scope.forms = {
		details: {},
	};

	LocaleService.onInit(() => {
		description = LocaleService.t('test:test-model.defaults.description');
	});

	let params = ViewParameters.get();
	if (Object.keys(params).length) {
		if (params?.entity?.DueFrom) {
			params.entity.DueFrom = new Date(params.entity.DueFrom);
		}
		if (params?.entity?.DueTo) {
			params.entity.DueTo = new Date(params.entity.DueTo);
		}
		$scope.entity = params.entity ?? {};
		$scope.selectedMainEntityKey = params.selectedMainEntityKey;
		$scope.selectedMainEntityId = params.selectedMainEntityId;
	}

	$scope.filter = () => {
		let entity = $scope.entity;
		const filter = {
			$filter: {
				conditions: [],
				sorts: [],
				limit: 20,
				offset: 0
			}
		};
		if (entity.Id !== undefined) {
			const condition = { propertyName: 'Id', operator: 'EQ', value: entity.Id };
			filter.$filter.conditions.push(condition);
		}
		if (entity.DueFrom) {
			const condition = { propertyName: 'Due', operator: 'GE', value: entity.DueFrom };
			filter.$filter.conditions.push(condition);
		}
		if (entity.DueTo) {
			const condition = { propertyName: 'Due', operator: 'LE', value: entity.DueTo };
			filter.$filter.conditions.push(condition);
		}
		if (entity.Property3) {
			const condition = { propertyName: 'Property3', operator: 'LIKE', value: `%${entity.Property3}%` };
			filter.$filter.conditions.push(condition);
		}
		if (entity.Property4) {
			const condition = { propertyName: 'Property4', operator: 'LIKE', value: `%${entity.Property4}%` };
			filter.$filter.conditions.push(condition);
		}
		Dialogs.postMessage({ topic: 'test.Entities.Entity51628.entitySearch', data: {
			entity: entity,
			filter: filter
		}});
		$scope.cancel();
	};

	$scope.resetFilter = () => {
		$scope.entity = {};
		$scope.filter();
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
		Dialogs.closeWindow({ id: 'Entity51628-filter' });
	};

	$scope.clearErrorMessage = () => {
		$scope.errorMessage = null;
	};

});