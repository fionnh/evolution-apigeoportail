// Test for route plugin existence 
if (document.getElementById('GProutePanel')) {
	
	//Close results details by default
	document.getElementById('GProuteResultsShowDetails').checked = false;
	
	// Open route panel
	document.getElementById('GPshowRoutePicto').addEventListener('click', function() {
	    document.getElementById('GPadvancedToolsPanel').className = 'GPadvancedToolsPanelHidden';
	    document.getElementById('GProutePanel').className = 'GPadvancedToolVisible';
	});
	
	// Close route panel
	document.getElementById('GProutePanelClose').addEventListener('click', function() {
	    document.getElementById('GProutePanel').className = 'GPadvancedToolHidden';
	    document.getElementById('GPadvancedToolsPanel').className = 'GPadvancedToolsPanelVisible';
	});
	
	// Managing stages options together
	for (var i=1;i<8;i++) {
	    
	    // Clear potential residual coordinates
	    document.getElementById('GProuteOriginCoords'+i).value = '';
	    
	    // Manage autocomplete lists appearance
	    document.getElementById('GProuteOrigin'+i).addEventListener('keyup', function(e) {
	        var charCode = e.which || e.keyCode;
	        if (charCode === 13 || charCode === 10) {
	            return;
	        }
	        var i = this.id.charAt(this.id.length-1);
	        if (document.getElementById('GProuteOrigin'+i).value.length>2) {
	            document.getElementById('GProuteAutoCompleteList'+i).style.display = 'block';
	        } else {
	            document.getElementById('GProuteAutoCompleteList'+i).style.display = 'none';
	        }
	    });
	    document.getElementById('GProuteOrigin'+i).addEventListener('blur', function(e) {
	        var i = this.id.charAt(this.id.length-1);
	        document.getElementById('GProuteAutoCompleteList'+i).style.display = 'none';
	    });
	    
	    // Click on map pointers
	    document.getElementById('GProuteOriginPointerImg'+i).addEventListener('click', function(evt) {
	        evt.preventDefault();
	        evt.stopPropagation();
	        var i = this.id.charAt(this.id.length-1);
	        for (var j=1;j<8;j++) {
	            if (i!=j) {
	                document.getElementById('GProuteOriginPointer'+j).checked = false;
	                if (document.getElementById('GProuteOriginCoords'+j).value == 'Pointer un lieu sur la carte') {
	                    document.getElementById('GProuteOriginCoords'+j).value = '';
	                    document.getElementById('GProuteOrigin'+j).className = 'GProuteOriginVisible';
	                    document.getElementById('GProuteOriginCoords'+j).className = 'GProuteOriginHidden';
	                }
	            }
	        }
	        if (document.getElementById('GProuteOriginPointer'+i).checked) {
	            document.getElementById('GProuteOriginCoords'+i).value = '';
	            for (var j=1;j<8;j++) {
	                document.getElementById('GProutePoint'+j).style.display = 'flex';
	            }
	            document.getElementById('GProuteForm').className = '';
	            document.getElementById('GProuteOriginPointer'+i).checked = false;
	            document.getElementById('GProuteOrigin'+i).className = 'GProuteOriginVisible';
	            document.getElementById('GProuteOriginCoords'+i).className = 'GProuteOriginHidden';
	        } else {
	            document.getElementById('GProuteOriginCoords'+i).value = 'Pointer un lieu sur la carte';
	            for (var j=1;j<8;j++) {
	                if (i==j) {
	                    document.getElementById('GProutePoint'+j).style.display = 'flex';
	                } else {
	                    document.getElementById('GProutePoint'+j).style.display = 'none';
	                }
	            }
	            document.getElementById('GProuteForm').className = 'GProuteFormMini';
	            document.getElementById('GProuteOriginPointer'+i).checked = true;
	            document.getElementById('GProuteOrigin'+i).className = 'GProuteOriginHidden';
	            document.getElementById('GProuteOriginCoords'+i).className = 'GProuteOriginVisible';
	        }
	    });
	    
	    // Click on input labels
	    document.getElementById('GProuteOriginLabel'+i).addEventListener('click', function() {
	        var i = this.id.charAt(this.id.length-1);
	        document.getElementById('GProuteOriginCoords'+i).value = '';
	        for (var j=1;j<8;j++) {
	            document.getElementById('GProutePoint'+j).style.display = 'flex';
	        }
	        document.getElementById('GProuteForm').className = '';
	        document.getElementById('GProuteOriginPointer'+i).checked = false;
	        document.getElementById('GProuteOrigin'+i).className = 'GProuteOriginVisible';
	        document.getElementById('GProuteOriginCoords'+i).className = 'GProuteOriginHidden';
	    });
	    
	    // Removing stages
	    if (i!=1 && i!=7) {
	        document.getElementById('GProuteStageRemove'+i).addEventListener('click', function() {
	            var i = this.id.charAt(this.id.length-1);
	            document.getElementById('GProutePoint'+i).className = 'GProuteStageFlexInputHidden';
	            document.getElementById('GProuteOrigin'+i).value = '';
	            document.getElementById('GProuteOrigin'+i).className = 'GProuteOriginVisible';
	            document.getElementById('GProuteOriginCoords'+i).value = '';
	            document.getElementById('GProuteOriginCoords'+i).className = 'GProuteOriginHidden';
	            document.getElementById('GProuteStageAdd').style.display = 'flex';
	        });
	    }
	
	}
	
	// Add stage
	document.getElementById('GProuteStageAdd').addEventListener('click', function() {
	    var lastStage = 1;
	    var nbStages = 0;
	    for (var i=2;i<7;i++) {
	        if (document.getElementById('GProutePoint'+i).className == 'GProuteStageFlexInputHidden') {
	            if (lastStage==1) {
	                lastStage = i;
	            }
	        } else {
	            nbStages++;
	        }
	        
	    }
	    if (lastStage<7) {
	        document.getElementById('GProutePoint'+lastStage).className = 'GProuteStageFlexInput';
	    }
	    if (nbStages==4) {
	        document.getElementById('GProuteStageAdd').style.display = 'none';
	    }
	});
	
	// Manage map pointing => TODO adapter à une vraie map JS
	document.getElementById('viewerDiv').addEventListener('click', function(evt) {
	    for (var i=1;i<8;i++) {
	       if (document.getElementById('GProuteOriginPointer'+i).checked) {
	           document.getElementById('GProuteOriginCoords'+i).value = evt.clientX+'.00,'+evt.clientY+'.00';
	           for (var j=1;j<8;j++) {
	                document.getElementById('GProutePoint'+j).style.display = 'flex';
	            }
	           document.getElementById('GProuteForm').className = '';
	           document.getElementById('GProuteOriginPointer'+i).checked = false;
	           return;
	       }
	    }
	});
	
	// Submit the route search
	document.forms['GProuteForm'].addEventListener('submit', function(e) {
	    
	    e.preventDefault();
	    
	    if ((document.getElementById('GProuteOrigin1').value=='' &&
	        document.getElementById('GProuteOriginCoords1').value=='') ||
	        (document.getElementById('GProuteOrigin7').value=='' &&
	        document.getElementById('GProuteOriginCoords7').value=='')) {
	        return;
	    }
	    
	    // Display results components
	    document.getElementById('GProuteForm').className = 'GProuteComponentHidden';
	    document.getElementById('GProuteResultsPanel').className = '';
	    
	    // Send stages to results panel
	    document.getElementById('GProuteResultsStages').innerHTML = '';
	    for (var i=1;i<8;i++)  {
	        if (document.getElementById('GProutePoint'+i).className == 'GProuteStageFlexInput') {
	            var resultStage = document.createElement('div');
	            resultStage.className  ='GProuteResultStage';
	            var resultStageLabel = document.createElement('div');
	            resultStageLabel.className  ='GProuteResultStageLabel';
	            resultStageLabel.innerHTML = document.getElementById('GProuteOriginLabel'+i).innerHTML+' :';
	            resultStage.appendChild(resultStageLabel);
	            var resultStageValue = document.createElement('div');
	            resultStageValue.className  ='GProuteResultStageValue';
	            var stageCoords = document.getElementById('GProuteOriginCoords'+i).value;
	            if (stageCoords!=null && stageCoords!='') {
	                resultStageValue.innerHTML = stageCoords;
	            } else {
	                resultStageValue.innerHTML = document.getElementById('GProuteOrigin'+i).value;
	            }
	            resultStage.appendChild(resultStageValue);
	            if (resultStageValue.innerHTML!='') {
	                document.getElementById('GProuteResultsStages').appendChild(resultStage);
	            }
	        }
	    }
	    
	    // Send computation mode
	    document.getElementById('GProuteResultsComputationSelect').selectedIndex = document.getElementById('GProuteComputationSelect').selectedIndex;
	    
	    // TODO lancer la requête et récupérer les résultats
	    
	    return false;
	});
	
	// Back to interface from results
	document.getElementById('GProuteResultsNew').addEventListener('click', function() {
	    document.getElementById('GProuteResultsPanel').className = 'GProuteComponentHidden';
	    document.getElementById('GProuteForm').className = '';
	});
	
	// Relaunch computation from results when changing mode (fastest/shortest)
	document.getElementById('GProuteResultsComputationSelect').addEventListener('change', function() {
	    // TODO relancer la requête et récupérer les résultats
	})

}