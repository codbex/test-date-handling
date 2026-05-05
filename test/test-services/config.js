const viewData = {
    id: 'test-widget',
    label: 'test Widget',
    path: '/services/web/test/test-services/index.html',
    lazyLoad: true,
    autoFocusTab: false,
    perspectiveId: 'PurchaseInvoice',
    size: 'small'
};
if (typeof exports !== 'undefined') {
    exports.getView = () => viewData;
}