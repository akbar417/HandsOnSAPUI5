sap.ui.define([
	               'sap/ui/core/mvc/Controller',
	              'sap/ui/model/json/JSONModel'
	       ], function(Controller, JSONModel) {
	       

	       return Controller.extend("addrisk.AddRisk", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf addrisk.AddRisk
*/
//	onInit: function() {
//
//	},
	onInit: function() {
		
		var i18nModel = new sap.ui.model.resource.ResourceModel({ bundleUrl : "i18n/messageBundle.properties" }); 
		this.getView().setModel(i18nModel, "i18n");
	    var	oModel = new sap.ui.model.json.JSONModel({
	    	ConstraintItems:[]
	    });
	    this.getView().setModel(oModel);
	},

	
	

handleValueHelp : function (oController) {
        this.currentRow = oController.getSource().getParent();
          // create value help dialog
          if (!this._valueHelpDialog) {
            this._valueHelpDialog = sap.ui.xmlfragment(
                     "addrisk.fragments.MeasurementDialog", this
            );
            this.getView().addDependent(this._valueHelpDialog);
          }

/* var unitValue = oUnitEvent.getSource();
  this._valueHelpDialog.open(unitValue);*/

          // open value help dialog
          this._valueHelpDialog.open();
        },
 
 onDialogCloseButton: function (oEvent) {
	 	var item=sap.ui.core.Fragment.byId("conv_factor", "idMeasurementTable1").getSelectedItem();
        var UOM = item.getCells()[0].getText();
        this.currentRow.getCells()[0].setValue(UOM);
        this._valueHelpDialog.close();
    },
handleClose: function(oEvent) {
       this._valueHelpDialog.close();
        },

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf addrisk.AddRisk
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf addrisk.AddRisk
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf addrisk.AddRisk
*/
//	onExit: function() {
//
//	}
        
        
   onAddConstraintItem: function(){
      var model = this.getView().getModel();
      var constraintTableData = model.getData().ConstraintItems;
      var tempData = {measurement:"", value:"", UOMeasurement:""};
      constraintTableData.push(tempData);
      model.refresh();
 },
 onConstraintItemDelete: function(oEvent){
	 var itemIndex = oEvent.getParameter("listItem").getBindingContext().getPath().split("/")[2];
	 var model = this.getView().getModel();
     var constraintTableData = model.getData().ConstraintItems;
     constraintTableData.splice(itemIndex, 1);
     model.refresh();
 }

	       });
});