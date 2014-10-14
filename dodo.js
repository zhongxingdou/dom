function findControl(labelText, form){
	var labels = document.getElementsByTagName("Label");
	for(var i=0,l=labels.length; i<l; i++){
		var label = labels[i];
		var text = label.innerText;
		if(text.trim() == labelText){
			var labelFor = label.getAttribute("for");
			if(labelFor){
				var control = document.getElementById(labelFor);
				if(control){
					return control;
				}else{
					var controls = document.getElementsByName(labelFor);
					return Array.prototype.slice.call(controls, 0);
				}
			}
		}
	}
}

function fillIn(controlLabel, text){
	var aField = findControl(controlLabel);
	if(aField){
		aField.value = text;
	}
}

function choose(controlLabel){
	var aField = findControl(controlLabel);
	if(aField){
		aField.checked = true;
	}
}

function check(controlLabel){
	if(arguments.length > 1){
		var controlLabels = Array.prototype.slice.call(arguments, 0);
		controlLabels.forEach(function(item){
			check(item);
		});
	}else{
		var aField = findControl(controlLabel);
		if(aField){
			aField.checked = true;
		}
	}
}

function uncheck(controlLabel){
	if(arguments.length > 1){
		var controlLabels = Array.prototype.slice.call(arguments, 0);
		controlLabels.forEach(function(item){
			uncheck(item);
		});
	}else{
		var aField = findControl(controlLabel);
		if(aField){
			aField.checked = false;
		}
	}
}

function clearChecked(controlsLabel){
	_toArray(findControl(controlsLabel)).forEach(function(checkbox){
		checkbox.checked = false;
	});
}

function select(controlLabel, selectOptions){
	if(!_isArray(selectOptions)){
		selectOptions=[selectOptions];
	}

	var aField = findControl(controlLabel);
	if(aField){
		var ableOptions = aField.options;
		selectOptions.forEach(function(selectOption){
			for(var i=0,l=ableOptions.length; i<l; i++){
				var option = ableOptions[i];
				if(option.text == selectOption){
					option.selected = true;
					break;
				}
			}
		});
	}
}

function submit(FirstLegendText){
	var legends = document.getElementsByTagName("Legend");
	for(var i=0,l=legends.length; i<l; i++){
		if(legends[i].innerText.trim() === FirstLegendText){
			return legends[i].form.submit();
		}
	}
}

function findControlLabel(controlId){
	var labels = document.getElementsByTagName("Label");
	for(var i=0,l=labels.length; i<l; i++){
		var aLabel = labels[i];
		if(aLabel.getAttribute("for") === controlId){
			return aLabel.innerText;
		}
	}
}

function getChoosedOf(labelText){
	var radios = findControl(labelText);
	for(var i=0,l=radios.length; i<l; i++){
		var aRadio = radios[i];
		if(aRadio.checked){
			return findControlLabel(aRadio.id);
		}
	}
}

function getSelectedOf(labelText){
	var select = findControl(labelText);
	if(select){
		var options = select.options;
		if(select.multiple){
			var selected = [];
			for(var i=0,l=options.length; i<l; i++){
				var aOption = options[i];
				if(aOption.selected){
					selected.push(Option.text);
				}
			}
			return selected;
		}else{
			for(var i=0,l=options.length; i<l; i++){
				var aOption = options[i];
				if(aOption.selected){
					return aOption.text;
				}
			}
		}
	}
}

function getCheckedOf(labelText){
	var checkboxes = findControl(labelText);
	var checked = [];
	for(var i=0,l=checkboxes.length; i<l; i++){
		var aCheckbox = checkboxes[i];
		if(aCheckbox.checked){
			checked.push(findControlLabel(aCheckbox.id));
		}
	}
	return checked;
}

function _isArray(o){
	return Array.prototype.isPrototypeOf(o);
}

function _toArray(o){
	return Array.prototype.slice.call(o, 0);
}

function getValueByLabel(labelText){
	var control = findControl(labelText);
	if(_isArray(control)){
		var controls = control;
		var values = [];
		for(var i=0,l=controls.length; i<l; i++){
			values.push(controls[i].value);
		}
		return values;
	}else{
		return control.value;
	}
}

function getValueByName(name){
	var controls = document.getElementsByName(name);
	if(controls.length>0){
		var type = controls[0].type;
		if(type === "radio"){
			for(var i=0,l=controls.length; i<l; i++){
				var aRadio = controls[i];
				if(aRadio.checked){
					return aRadio.value;
				}
			}
		}else if(type === "checkbox"){
			var values = [];
			for(var i=0,l=controls.length; i<l; i++){
				var aCheckbox = controls[i];
				if(aCheckbox.checked){
					values.push(aCheckbox.value);
				}
			}
			return values;
		}else{
			return controls[0].value;
		}
	}
}

function show(element){
	element.style.display = "auto";
}

function hide(element){
	element.style.display = "none";
}

function disable(element){
	element.disabled = true;
}

function enable(element){
	element.disabled = false;
}

var _alias = {};
function alias(element, name){
	_alias.name = element;
}

function clearAlias(name){
	delete _alias.name;
}