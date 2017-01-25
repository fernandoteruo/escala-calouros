/**
 * Show sidebar
 */
function showSidebar() {
	var docProperties = PropertiesService.getDocumentProperties();
	docProperties.deleteAllProperties();
	var html = HtmlService.createHtmlOutputFromFile('sidebarHtml')
		.setTitle('Painel de acompanhamento')
		.setWidth(300);
	SpreadsheetApp.getUi().showSidebar(html);
}

