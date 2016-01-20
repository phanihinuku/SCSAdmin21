jQuery.sap.declare("com.utils.formatter");

com.utils.formatter = {
		countModel:function(val){
			
			if(val!=null){
				return val.length;
//				var oModel = sap.ui.getCore().getModel('UCS');
//				if(oModel!=null){
//					var dt = oModel.getData();
//					if(dt!=null&&dt.length>0){
//						return dt.length;
//					}
//				}else{
//					return "0";
//				}
			}else{
				return "0";
			}
		},
	countTableSel:function(val){
			
			if(val!=null){
				if(sap.ui.getCore().byId('addContactsTableSel')!=null){
					return sap.ui.getCore().byId('addContactsTableSel').getSelectedItems().length;
				}else{
					return "0";
				}
//				return val.length;
//				var oModel = sap.ui.getCore().getModel('UCS');
//				if(oModel!=null){
//					var dt = oModel.getData();
//					if(dt!=null&&dt.length>0){
//						return dt.length;
//					}
//				}else{
//					return "0";
//				}
			}else{
				return "0";
			}
		},
	icongen: function(val) {
		if (val != null) {
			var ret="cancel";
			// switch (val) {
			// 		case 'CMP':
			// 		ret= "begin";
			// 			break;
			// 		case 'FLD':
			// 			ret= "status-error";
			// 			break;
			// 		case 'NEW':
			// 			ret= "outbox";
			// 			break;
			// 		case 'CNC':
			// 		ret= "sys-cancel";
			// 			break;
			// 		default:
			// 	}
			
			return "sap-icon://"+ret;	
				
			}

		}

	};