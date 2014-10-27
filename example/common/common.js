(function($window, $jquery) {

    /**
     * @module Recipes
     * @link https://github.com/Wildhoney/Recipes
     * @version $id$
     */
    $window.RecipesInterface = function RecipesInterface() {};

    /**
     * @property prototype
     * @type {Object}
     */
    $window.RecipesInterface.prototype = {

        /**
         * @constant API_URL
         * @type {String}
         */
        API_URL: 'http://learn-api.herokuapp.com/recipes',

        /**
         * @method addRecipe
         * @param name {String}
         * @param description {String}
         * @param ingredients {Array}
         * @return {void}
         */
        addRecipe: function addRecipe(name, description, ingredients) {

        },

        /**
         * @method deleteRecipe
         * @param recipeModel {Object}
         * @return {void}
         */
        deleteRecipe: function deleteRecipe(recipeModel) {

        },

        /**
         * @method getRecipes
         * @return {Array}
         */
        getRecipes: function getRecipes() {

            $jquery.ajax({ url: this.APP_URL, dataType: 'json', success: function success(collection) {


            }.bind(this)});

        }

    };

})(window, window.jQuery);