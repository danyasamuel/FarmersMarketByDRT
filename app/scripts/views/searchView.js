// SearchView.js
// ----------
define([
	'jquery', 'backbone', 'selectize', 'text!templates/search.html', 'text!templates/carousel.html','text!locale/search.json', 'text!locale/es_mx/search.json',
	'text!templates/resultsSubTemplate.html',
	'collections/farmersMarketCollection','text!mockdata/market.json',
], function($, Backbone, Selectize, template, CarouselTemplate, content, contentES, ResultsSubTemplate, FarmersMarket, MockData) {
	'use strict';

	// Creates a new Backbone View class object
	var SearchView = Backbone.View.extend({

		// The Model associated with this view
		model: '',

		// View constructor
		initialize: function(options) {

			// Set language attribute to support localization
			this.language = (options && options.language) || 'en_us';

		},

		// View Event Handlers
		events: {
			'click button[id="btnSearch"]': 'getResults'
		},

		// Renders the view's template to the UI
		render: function() {

			// Setting the view's template property using the Underscore template method
			this.template = _.template(template, {
				content: JSON.parse((this.language == 'en_us') ? content : contentES)
			});


			// Dynamically updates the UI with the view's template
			this.$el.html(this.template);

			this.carouselTemplate = _.template(CarouselTemplate, {});
			this.$el.find('#myCarousel').html(this.carouselTemplate)

			// Maintains chainability
			return this;

		},
		getResults:function(){
			//Load the farmers Market collection
            this.farmersMarket = new FarmersMarket();
            //this.farmersMarket.url = 'testurl';
            this.farmersMarket.parse(JSON.parse(MockData));

            //Display the results 
            this.$el.find('#resultsContainer').html('');

            this.resultsTemplate = _.template(ResultsSubTemplate,{
            	collection:this.farmersMarket.toJSON()
            });

            this.$el.find('#resultsContainer').html(this.resultsTemplate)

        }

	});

	// Returns the View class
	return SearchView;
});