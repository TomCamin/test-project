(function($) {


	//models
	window.Vegetable = Backbone.Model.extend({
		defaults:{
	        "title":'default',
			"desc":'default'
		}
	});
	
	
	//collections
	window.Vegetables = Backbone.Collection.extend({
		model: Vegetable,
		url: "http://localhost:8888/test-project/app_dev.php/vegetals.json"
	});
	
	
	//views
	window.ListVegetablesView = Backbone.View.extend({
		el: $("#container"),
		//template : Handlebars.compile($('#templateLink').html()),
		template : _.template($('#templateVegetables').html()),
		
		events: {
			"click a.remove" : "remove"
		},
		
	    initialize : function() {
	    	
	    	_.bindAll(this, 'render');
	    	this.collection.bind('change', this.render);
            this.collection.bind('add', this.render);
            this.collection.bind('remove', this.render);
            this.render();
	    },
	    render : function() {
	        var renderedContent = this.template({vegetables : this.collection.toJSON()});
            $(this.el).html(renderedContent);
            return this;
	    },
		remove: function(e) {
			this.collection.remove($(e.target).attr("id"));
		}
	});
	
	window.VegetableSheetView = Backbone.View.extend({
		el: $("#container"),
		//template : Handlebars.compile($('#templateLink').html()),
		template : _.template($('#templateVegetableSheet').html()),
		
		events: {
			"click a.destroy" : "destroy"
		},
		
	    initialize : function() {
            this.render();
	    },
	    render : function() {
	        var renderedContent = this.template({vegetable : this.model.toJSON()});
            $(this.el).html(renderedContent);
            return this;
	    },
		destroy: function() {
			
		}
	});
	
	
	//routes
	window.App = Backbone.Router.extend({
		
		routes: {
			"": "home",
			"vegetaux/:idVegetal": "getVegetableSheet"
		},
		
		home: function() {
			var vegetables = new Vegetables(pageData);
			var vegetableView = new ListVegetablesView({collection: vegetables});
		},
		
		getVegetableSheet: function(idVegetal) {
			var vegetables = new Vegetables();
			vegetables.fetch({success: function(collection, response){
				var vegetableView = new ListVegetablesView({collection: vegetables});
			}});
			var vegetableSheetView = new VegetableSheetView({model: vegetables.get(idVegetal)});
		}
		
	});
	
})(jQuery);

var larrosoir = new App();
Backbone.history.start();


