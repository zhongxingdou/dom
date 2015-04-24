// !!! don't format this file
var assertion    = require('./assertion'),
	by           = require('./by'),
	form_fill    = require('./form_fill'),
	log          = require('./log'),
	manipulation = require('./manipulation'),
	scope        = require('./scope'),
	tag_query    = require('./tag_query'),
	util         = require('./util')

var variadic    = util.variadic,
	filterBy    = util.filterBy,
	filterByTag = util.filterByTag

var Dom = {
	version: '0.0.1',
	button:   variadic( filterBy(assertion.isButton, tag_query.button)),
	link:     variadic( filterByTag('A', tag_query.link)),
	field:    variadic( filterBy(assertion.isField, tag_query.field)),
	fieldset: variadic( filterByTag('FIELDSET', tag_query.fieldset)),
	form:     variadic( filterByTag('FORM', tag_query.form)),
	hidden:   variadic( filterBy(function (element) {
					return element.tagName === 'INPUT' && element.type === 'hidden'
				}, tag_query.hidden)),
}

util.mix(Dom, util)
util.mix(Dom, assertion)
util.mix(Dom, by)
util.mix(Dom, form_fill)
util.mix(Dom, log)
util.mix(Dom, manipulation)
util.mix(Dom, scope)

var exclude = ['button','link','field','fieldset', 'form', 'hidden']
util.mix(Dom, tag_query, null, exclude)

module.exports = Dom