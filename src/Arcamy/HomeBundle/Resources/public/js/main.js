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
				description: 'Text',
				description: { validators: ['required'] }
		},
		initialize : function() {
			if (this.isNew()) {
				this.url = "http://localhost:8888/test-project/web/app_dev.php/api/vegetal";
			}
			else {
				this.url = "http://localhost:8888/test-project/web/app_dev.php/api/vegetal/"+this.id;
			}
		}
			
	});
	
	
	//collections
	window.Vegetables = Backbone.Collection.extend({
		model: Vegetable,
		url: "http://localhost:8888/test-project/app_dev.php/api/vegetals"
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
			"click button#submit" : "submit",
		},
		
	    initialize : function() {
            this.render();
	    },
	    render : function() {
            $(this.el).html(this.template());
			this.vegetable = new Vegetable();
			this.form = new Backbone.Form({model: this.vegetable}).render();
			$('#NewVegetableSheetForm').prepend(this.form.el);
            return this;
	    },
		submit: function() {
			if(!this.form.commit()) {
				this.vegetable.on("sync",this.confirm());
				this.vegetable.save();
				
			}
		},
		confirm: function() {
			console.log('new sheet form submitted without errors');
			$("#flash").fadeIn('fast');
		}
	});
	
	
	window.EditVegetableSheetFormView = Backbone.View.extend({
		el: $("#container"),

		template : _.template($('#templateFormEditVegetableSheet').html()),
		
		events: {
			"click button#submit" : "submit",
		},
		
	    initialize : function() {
            this.render();
	    },
	    render : function() {
            $(this.el).html(this.template());
			this.form = new Backbone.Form({model: this.model}).render();
			$('#EditVegetableSheetForm').prepend(this.form.el);
            return this;
	    },
		submit: function() {
			if(!this.form.commit()) {
				this.model.on("sync",this.confirm());
				this.model.save();
				
			}
		},
		confirm: function() {
			console.log('new sheet form submitted without errors');
			$("#flash").fadeIn('fast');
		}
	});
	
	
	
	//routes
	window.App = Backbone.Router.extend({
		
	    initialize : function() {
           this.vegetables = new Vegetables(pageData);
	    },
		
		routes: {
			"": "home",
			"vegetaux/:idVegetal": "getVegetableSheet",
			"editer/:idVegetal": "editVegetable",
			"nouvelle-fiche": "createNewVegetableSheet"
		},
		
		home: function() {
			var vegetableView = new ListVegetablesView({collection: this.vegetables});
		},
		
		getVegetableSheet: function(idVegetal) {
			this.vegetables.get(idVegetal).fetch({success: function(model){
				console.log('view vegetable sheet succeed');
				var vegetableView = new VegetableSheetView({model: model});
			}});
		},
		
		editVegetable: function(idVegetal) {
			this.vegetables.get(idVegetal).fetch({success: function(model){
				console.log('view edit form vegetable sheet succeed');
				var vegetableView = new EditVegetableSheetFormView({model: model});
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


