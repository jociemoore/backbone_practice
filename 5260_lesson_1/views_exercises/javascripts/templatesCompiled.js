(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['app'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h1>Favorite Colors</h1>\n<ul id=\"favorites\"></ul>\n<button id=\"newPerson\">New Person</button>";
},"useData":true});
templates['listItem'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "		<li>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<h2>"
    + container.escapeExpression(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h2>\n<ul>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.colors : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>";
},"useData":true});
templates['modal'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"modal-container\">	\n	<form method=\"post\" action=\"#\">\n		<fieldset>\n			<label>\n				Name:\n				<input type=\"text\" name=\"name\" required>\n			</label>\n			<label>\n				Color #1:\n				<input type=\"text\" name=\"color1\" required>\n			</label>\n			<label>\n				Color #2:\n				<input type=\"text\" name=\"color2\" required>\n			</label>\n			<label>\n				Color #3:\n				<input type=\"text\" name=\"color3\" required>\n			</label>\n		</fieldset>\n		<fieldset>\n			<button id=\"addBtn\" type=\"submit\">Add</button>\n			<button id=\"cancelBtn\">Cancel</button>\n		</fieldset>\n	</form>\n</div>";
},"useData":true});
})();