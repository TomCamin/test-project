(function($) {


	//models
	window.Vegetable = Backbone.Model.extend({
		defaults:{
	        "name":'',
			"description":'',
			"type":''
		},
		schema: {
		        name: 'Text',
				name: { validators: ['required'] },
		        type: {type: 'Select', options: [{val:1, label: "Arbre"}, {val:2, label: "Plante"}]},
				description: 'Text'
		},
		initialize : function() {
			this.url = "http://localhost:8888/test-project/web/app_dev.php/vegetals/"+this.id+".json";
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
            this.render();
	    },
	    render : function() {
	        var renderedContent = this.template({vegetables : this.collection.toJSON()});
            $(this.el).html(renderedContent);
            return this;
	    },
		remove: function(e) {
			var currentID = $(e.target).attr("id");
			console.log("suppression de  la fiche "+currentID);
			this.collection.get(currentID).destroy({success: function() {
				$("tr#row"+currentID).fadeOut('fast');
			}});
			
		}
	});
	
	window.VegetableSheetView = Backbone.View.extend({
		el: $("#container"),
	
		template : _.template($('#templateVegetableSheet').html()),
		
	    initialize : function() {
            this.render();
	    },
	    render : function() {
	        var renderedContent = this.template({vegetable : this.model.toJSON()});
            $(this.el).html(renderedContent);
            return this;
	    },
	});
	
	window.NewVegetableSheetFormView = Backbone.View.extend({
		el: $("#container"),

		template : _.template($('#templateFormVegetableSheet').html()),
		
		events: {
			"click button#submit" : "submit"
		},
		
	    initialize : function() {
            this.render();
	    },
	    render : function() {
            $(this.el).html(this.template());
			var vegetable = new Vegetable();
			this.form = new Backbone.Form({model: vegetable}).render();
			$('#NewVegetableSheetForm').prepend(this.form.el);
            return this;
	    },
		submit: function() {
			console.log('new sheet form submitted');
			if(!this.form.commit()) {
				console.log('ok');
			}
			
		}
	});
	
	
	
	//routes
	window.App = Backbone.Router.extend({
		
		routes: {
			"": "home",
			"vegetaux/:idVegetal": "getVegetableSheet",
			"nouvelle-fiche": "createNewVegetableSheet"
		},
		
		home: function() {
			var vegetables = new Vegetables(pageData);
			var vegetableView = new ListVegetablesView({collection: vegetables});
		},
		
		getVegetableSheet: function(idVegetal) {
			var vegetable = new Vegetable({id: idVegetal});
			vegetable.fetch({success: function(){
				console.log('view vegetable sheet succeed');
				var vegetableView = new VegetableSheetView({model: vegetable});
			}});
		},
		createNewVegetableSheet: function() {
			console.log('routed to "formulaire nouvelle fiche"');
			var formView = new NewVegetableSheetFormView();
		}
		
	});
	
})(jQuery);

var larrosoir = new App();
Backbone.history.start();


